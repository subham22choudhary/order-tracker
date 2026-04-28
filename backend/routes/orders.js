const express = require("express");
const router = express.Router();
const { getOrder, updateOrder, isValidStatus } = require("../store");
const authMiddleware = require("../middleware/auth");

// POST /api/orders/:orderId/status  (Rider updates status)
router.post("/:orderId/status", authMiddleware, (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || orderId.trim() === "") {
        return res.status(400).json({ error: "orderId is required" });
    }

    if (!status) {
        return res.status(400).json({ error: "status is required in request body" });
    }

    if (!isValidStatus(status)) {
        return res.status(400).json({
            error: `Invalid status '${status}'.`,
            validStatuses: ["pending", "picked_up", "out_for_delivery", "delivered"],
        });
    }

    const result = updateOrder(orderId, status);

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    const order = getOrder(orderId);
    return res.status(200).json({ orderId, ...order });
});

// GET /api/orders/:orderId/status  (Customer checks status)
router.get("/:orderId/status", (req, res) => {
    const { orderId } = req.params;
    const order = getOrder(orderId);

    if (!order) {
        return res.status(404).json({ error: `Order '${orderId}' not found` });
    }

    return res.status(200).json({ orderId, ...order });
});

module.exports = router;