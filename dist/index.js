"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./auth/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/auth", router_1.default);
app.use((err, req, res) => {
    res.status(400).json({
        error: {
            message: err.message || "something went wrong",
        },
    });
});
app.get("/", (req, res) => {
    res.json("Hello world");
});
app.listen(PORT, () => {
    console.log("Server running on port" + PORT);
});
