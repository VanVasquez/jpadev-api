"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../model/Users"));
const utils_1 = require("../utils");
const jwt_1 = require("../utils/jwt");
exports.default = {
    LoginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const fetchedUser = yield Users_1.default.findOne({ email });
        if (!fetchedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (!(0, utils_1.comparePassword)(password, fetchedUser.password)) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        const accessToken = (0, jwt_1.generateAccessToken)(fetchedUser);
        const refreshToken = (0, jwt_1.generateRefreshToken)(fetchedUser);
        return res
            .status(200)
            .cookie('jwt', refreshToken, {
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
            .json({
            message: "Login successful",
            accessToken,
        });
    }),
    CreateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const fetchedUser = yield Users_1.default.findOne({ email });
            if (fetchedUser) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }
            const newUser = new Users_1.default(req.body);
            yield newUser.save();
            return res.status(201).json({
                message: "User created successfully"
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    })
};
