"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(data) {
    return jsonwebtoken_1.default.sign({
        "UserInfo": {
            "email": data.email,
            "last_name": data.last_name
        },
    }, process.env.ACCESS_TOKEN_SECRET_KEY || '', { expiresIn: '1h' });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(data) {
    return jsonwebtoken_1.default.sign({
        "email": data.email,
    }, process.env.REFRESH_TOKEN_SECRET_KEY || '', { expiresIn: '7d' });
}
exports.generateRefreshToken = generateRefreshToken;
