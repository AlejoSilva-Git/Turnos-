"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const signToken = (payload) => {
    //       const options: SignOptions = {
    //     expiresIn: env.jwtExpiration as SignOptions["expiresIn"],
    //   };
    //  return jwt.sign({ id, role }, env.jwtSecret, options);
    return jsonwebtoken_1.default.sign(payload, env_1.env.jwtSecret, {
        expiresIn: '1h', // 1m 15m h d
    });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
};
exports.verifyToken = verifyToken;
