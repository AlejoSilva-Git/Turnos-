"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = void 0;
const zod_1 = require("zod");
exports.createCommentSchema = zod_1.z.object({
    taskId: zod_1.z.string().min(1, "taskId es obligatorio"),
    message: zod_1.z
        .string()
        .min(1, "El comentario no puede estar vacío")
        .max(1000, "El comentario es muy largo"),
});
