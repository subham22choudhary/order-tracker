import { useState } from "react";
import { updateOrderStatus } from "../api";

const STATUSES = ["pending", "picked_up", "out_for_delivery", "delivered"];

const STATUS_LABELS = {
    pending: "Pending",
    picked_up: "Picked Up",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
};

export default function RiderPanel() {
    const [orderId, setOrderId] = useState("");
    const [token, setToken] = useState("rider-secret-token-123");
    const [currentStatus, setCurrentStatus] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSetStatus(status) {
        if (!orderId.trim()) return setError("Please enter an Order ID");
        if (!token.trim()) return setError("Please enter your token");

        setLoading(true);
        setError("");
        try {
            const data = await updateOrderStatus(orderId.trim(), status, token.trim());
            setCurrentStatus(data.status);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="panel">
            <h2>🛵 Rider Panel</h2>

            <label>Order ID</label>
            <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. order-101"
            />

            <label>Bearer Token</label>
            <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="rider-secret-token-123"
            />

            <div className="status-buttons">
                {STATUSES.map((s) => (
                    <button
                        key={s}
                        onClick={() => handleSetStatus(s)}
                        disabled={loading}
                        className={currentStatus === s ? "active" : ""}
                    >
                        {STATUS_LABELS[s]}
                    </button>
                ))}
            </div>

            {currentStatus && (
                <p className="status-display">
                    ✅ Status set to: <strong>{STATUS_LABELS[currentStatus]}</strong>
                </p>
            )}

            {error && <p className="error">⚠️ {error}</p>}
        </div>
    );
}