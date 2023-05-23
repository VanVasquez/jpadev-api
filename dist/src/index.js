"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const middleware_1 = require("./middleware");
const routers_1 = __importDefault(require("./routers"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(middleware_1.credentials);
app.use((0, cors_1.default)({ origin: middleware_1.allowedOrigins }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/v1', routers_1.default);
const PORT = process.env.PORT || "8080";
database_1.database.on('connected', () => {
    app.listen(PORT, () => {
        console.log(`Starting on server ${PORT}`);
    });
});
