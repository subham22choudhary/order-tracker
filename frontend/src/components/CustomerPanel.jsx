import { useState, useEffect, useRef } from "react";
import { getOrderStatus } from "../api";

const STATUS_STEPS = ["pending", "picked_up", "out_for_delivery", "delivered"];

const STATUS_LABELS = {
    pending: "Pending",
    picked_up: "Picked Up",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
};

export default function CustomerPanel() {
    const [orderId, setOrderId] = useState("");
    const [tracking, setTracking] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState("");
    const intervalRef = useRef(null);

    async function fetchStatus(id) {
        try {
            const data = await getOrderStatus(id);
            setOrderData(data);
            setError("");
        } catch (err) {
            setError(err.message);
            setOrderData(null);
        }
    }

    function startTracking() {
        if (!orderId.trim()) return setError("Please enter an Order ID");
        setTracking(true);
        setError("");
        fetchStatus(orderId.trim());

        intervalRef.current = setInterval(() => {
            fetchStatus(orderId.trim());
        }, 4000);
    }

    function stopTracking() {
        setTracking(false);
        setOrderData(null);
        clearInterval(intervalRef.current);
    }

    useEffect(() => () => clearInterval(intervalRef.current), []);

    const currentStep = orderData
        ? STATUS_STEPS.indexOf(orderData.status)
        : -1;

    return (
        <div className="panel">
            <h2>Customer Tracking</h2>

            <label>Order ID</label>
            <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. order-101"
                disabled={tracking}
            />

            {!tracking ? (
                <button onClick={startTracking} className="track-btn">
                    Track Order
                </button>
            ) : (
                <button onClick={stopTracking} className="stop-btn">
                    Stop Tracking
                </button>
            )}

            {tracking && !error && (
                <p className="polling-note">Polling every 4 seconds...</p>
            )}

            {orderData && (
                <div className="tracker">
                    <div className="steps">
                        {STATUS_STEPS.map((s, i) => (
                            <div key={s} className={`step ${i <= currentStep ? "done" : ""}`}>
                                <div className="dot" />
                                <span>{STATUS_LABELS[s]}</span>
                            </div>
                        ))}
                    </div>
                    <p className="updated">
                        Last updated: {new Date(orderData.updatedAt).toLocaleTimeString()}
                    </p>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
}