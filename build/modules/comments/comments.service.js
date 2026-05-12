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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const mongodb_1 = require("mongodb");
const comments_repository_1 = require("./comments.repository");
class CommentsService {
    constructor() {
        this.repository = new comments_repository_1.CommentsRepository();
    }
    create(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const comment = {
                taskId: new mongodb_1.ObjectId(data.taskId),
                authorId: new mongodb_1.ObjectId(userId),
                message: data.message,
                isActive: true,
                createdAt: now,
                updatedAt: now,
            };
            return yield this.repository.create(comment);
        });
    }
    findByTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findByTask(taskId);
        });
    }
    delete(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.repository.findById(commentId);
            if (!comment) {
                throw new Error("El comentario no existe");
            }
            yield this.repository.delete(commentId);
        });
    }
}
exports.CommentsService = CommentsService;
