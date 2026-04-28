const { getOrder, updateOrder, isValidStatus } = require("./store");


describe("isValidStatus", () => {
    test("returns true for valid statuses", () => {
        expect(isValidStatus("pending")).toBe(true);
        expect(isValidStatus("delivered")).toBe(true);
    });

    test("returns false for invalid statuses", () => {
        expect(isValidStatus("flying")).toBe(false);
        expect(isValidStatus("")).toBe(false);
    });
});



describe("updateOrder", () => {
    test("creates a new order with status pending", () => {
        const result = updateOrder("order-001", "pending");
        expect(result.success).toBe(true);
        expect(getOrder("order-001").status).toBe("pending");
    });

    test("rejects new order not starting with pending", () => {
        const result = updateOrder("order-new", "delivered");
        expect(result.error).toBeDefined();
    });

    test("allows valid transition pending → picked_up", () => {
        updateOrder("order-002", "pending");
        const result = updateOrder("order-002", "picked_up");
        expect(result.success).toBe(true);
    });


    test("rejects invalid transition delivered → pending", () => {
        updateOrder("order-003", "pending");
        updateOrder("order-003", "picked_up");
        updateOrder("order-003", "out_for_delivery");
        updateOrder("order-003", "delivered");
        const result = updateOrder("order-003", "pending");
        expect(result.error).toBeDefined();
    });
});