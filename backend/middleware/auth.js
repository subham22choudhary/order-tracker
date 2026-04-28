const VALID_TOKEN = "rider-secret-token-123";

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or malformed Authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (token !== VALID_TOKEN) {
        return res.status(401).json({ error: "Invalid token" });
    }

    next();
}

module.exports = authMiddleware;