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
exports.AppointmentsController = void 0;
const appointments_service_1 = require("./appointments.service");
const appointments_schema_1 = require("./appointments.schema");
class AppointmentsController {
    constructor() {
        this.service = new appointments_service_1.AppointmentsService();
        this.getParamId = (req) => {
            const id = req.params.id;
            return Array.isArray(id) ? id[0] : id;
        };
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                if (!userId) {
                    return res.status(401).json({ message: "Usuario no autenticado" });
                }
                const data = appointments_schema_1.createAppointmentSchema.parse(req.body);
                const appointment = yield this.service.create(data, userId);
                res.status(201).json(appointment);
            }
            catch (error) {
                next(error);
            }
        });
        this.findAll = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield this.service.findAll();
                res.status(200).json(appointments);
            }
            catch (error) {
                next(error);
            }
        });
        this.findById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield this.service.findById(this.getParamId(req));
                res.status(200).json(appointment);
            }
            catch (error) {
                next(error);
            }
        });
        this.getMyAppointments = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                if (!userId) {
                    return res.status(401).json({ message: "Usuario no autenticado" });
                }
                const appointments = yield this.service.getMyAppointments(userId);
                res.status(200).json(appointments);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAvailableSlots = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doctorId = Array.isArray(req.params.doctorId)
                    ? req.params.doctorId[0]
                    : req.params.doctorId;
                const date = Array.isArray(req.params.date)
                    ? req.params.date[0]
                    : req.params.date;
                const slots = yield this.service.getAvailableSlots(doctorId, date);
                res.status(200).json({ slots });
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                const data = appointments_schema_1.updateAppointmentSchema.parse(req.body);
                yield this.service.update(this.getParamId(req), data, userId);
                res.status(200).json({ message: "Turno actualizado" });
            }
            catch (error) {
                next(error);
            }
        });
        this.complete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = appointments_schema_1.completeAppointmentSchema.parse(req.body);
                yield this.service.completeAppointment(this.getParamId(req), data);
                res.status(200).json({ message: "Turno completado exitosamente" });
            }
            catch (error) {
                next(error);
            }
        });
        this.cancel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                if (!userId) {
                    return res.status(401).json({ message: "Usuario no autenticado" });
                }
                yield this.service.cancel(this.getParamId(req), userId);
                res.status(200).json({ message: "Turno cancelado exitosamente" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AppointmentsController = AppointmentsController;
