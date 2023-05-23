"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_1 = __importDefault(require("../database"));
const utils_1 = require("../utils");
const userSchema = new database_1.default.Schema({
    email: { type: mongoose_1.SchemaTypes.String, required: true, unique: true },
    password: { type: mongoose_1.SchemaTypes.String },
    last_name: { type: mongoose_1.SchemaTypes.String },
    first_name: { type: mongoose_1.SchemaTypes.String },
}, {
    timestamps: true,
    collection: 'User'
});
userSchema.pre('save', function (next) {
    const encryptPass = (0, utils_1.hashPassword)(this.password);
    this.password = encryptPass;
    next();
});
exports.default = database_1.default.model('User', userSchema);
