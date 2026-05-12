import { Request, Response, NextFunction } from "express";
import { AppointmentsService } from "./appointments.service";
import { createAppointmentSchema, updateAppointmentSchema, completeAppointmentSchema } from "./appointments.schema";

export class AppointmentsController {
    private readonly service = new AppointmentsService();

    private getParamId = (req: Request): string => {
        const id = req.params.id;
        return Array.isArray(id) ? id[0] : id;
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.sub;
            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado" });
            }

            const data = createAppointmentSchema.parse(req.body);
            const appointment = await this.service.create(data, userId);
            res.status(201).json(appointment);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const appointments = await this.service.findAll();
            res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const appointment = await this.service.findById(this.getParamId(req));
            res.status(200).json(appointment);
        } catch (error) {
            next(error);
        }
    };

    getMyAppointments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.sub;
            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado" });
            }

            const appointments = await this.service.getMyAppointments(userId);
            res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    };

    getAvailableSlots = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doctorId = Array.isArray(req.params.doctorId)
                ? req.params.doctorId[0]
                : req.params.doctorId;
            const date = Array.isArray(req.params.date)
                ? req.params.date[0]
                : req.params.date;

            const slots = await this.service.getAvailableSlots(doctorId, date);
            res.status(200).json({ slots });
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.sub;
            const data = updateAppointmentSchema.parse(req.body);
            await this.service.update(this.getParamId(req), data, userId);
            res.status(200).json({ message: "Turno actualizado" });
        } catch (error) {
            next(error);
        }
    };

    complete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = completeAppointmentSchema.parse(req.body);
            await this.service.completeAppointment(this.getParamId(req), data);
            res.status(200).json({ message: "Turno completado exitosamente" });
        } catch (error) {
            next(error);
        }
    };

    cancel = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.sub;
            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado" });
            }
            await this.service.cancel(this.getParamId(req), userId);
            res.status(200).json({ message: "Turno cancelado exitosamente" });
        } catch (error) {
            next(error);
        }
    };
}
