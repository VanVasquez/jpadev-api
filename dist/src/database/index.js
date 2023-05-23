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
exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HOST = process.env.DATABASE_HOST;
const NAME = process.env.DATABASE_NAME;
const USERNAME = process.env.DATABASE_USERNAME;
const PASSWORD = process.env.DATABASE_PASSWORD;
const MongoDb = mongoose_1.default.set('strictQuery', true);
MongoDb.set('strictQuery', true);
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield MongoDb.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${HOST}/${NAME}?retryWrites=true&w=majority`);
            console.log('connected to', MongoDb.connection.name);
        }
        catch (error) {
            console.error(error);
            setTimeout(connectDb, 5000);
        }
    });
}
connectDb();
exports.database = MongoDb.connection;
exports.default = MongoDb;
