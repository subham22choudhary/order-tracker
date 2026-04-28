const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = app; 