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
exports.CommentsController = void 0;
const comments_service_1 = require("./comments.service");
const comments_schema_1 = require("./comments.schema");
class CommentsController {
    constructor() {
        this.commentsService = new comments_service_1.CommentsService();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const data = comments_schema_1.createCommentSchema.parse(req.body);
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                if (!userId) {
                    return res.status(401).json({
                        message: "Usuario no autenticado",
                    });
                }
                const comment = yield this.commentsService.create(data, userId);
                return res.status(201).json(comment);
            }
            catch (error) {
                next(error);
            }
        });
        this.findByTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = req.params.taskId;
                const comments = yield this.commentsService.findByTask(taskId);
                return res.status(200).json(comments);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.commentsService.delete(id);
                return res.status(200).json({
                    message: "Comentario eliminado correctamente",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CommentsController = CommentsController;
