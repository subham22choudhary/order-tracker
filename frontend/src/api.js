const BASE_URL = "http://localhost:4000/api";

export async function updateOrderStatus(orderId, status, token) {
    const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update status");
    return data;
}

export async function getOrderStatus(orderId) {
    const res = await fetch(`${BASE_URL}/orders/${orderId}/status`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Order not found");
    return data;
}