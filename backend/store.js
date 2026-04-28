// Valid statuses and their allowed transitions
const VALID_STATUSES = ["pending", "picked_up", "out_for_delivery", "delivered"];

const TRANSITIONS = {
    pending: ["picked_up"],
    picked_up: ["out_for_delivery"],
    out_for_delivery: ["delivered"],
    delivered: [], // terminal state
};

const orders = {}; // { orderId: { status, updatedAt } }

function getOrder(orderId) {
    return orders[orderId] || null;
}

function updateOrder(orderId, newStatus) {
    const existing = orders[orderId];

    // If order exists, validate transition
    if (existing) {
        const allowed = TRANSITIONS[existing.status];
        if (!allowed.includes(newStatus)) {
            return {
                error: `Invalid transition: '${existing.status}' → '${newStatus}'. Allowed: [${allowed.join(", ") || "none"}]`,
            };
        }
    } else {
        // New order must start at 'pending'
        if (newStatus !== "pending") {
            return { error: "New orders must start with status 'pending'" };
        }
    }

    orders[orderId] = { status: newStatus, updatedAt: new Date().toISOString() };
    return { success: true };
}

function isValidStatus(status) {
    return VALID_STATUSES.includes(status);
}

module.exports = { getOrder, updateOrder, isValidStatus, VALID_STATUSES };