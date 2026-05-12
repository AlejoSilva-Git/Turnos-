import { Request, Response, NextFunction } from "express";
import { DoctorsService } from "./doctors.service";
import { createDoctorSchema, updateDoctorSchema } from "./doctors.schema";

export class DoctorsController {
    private readonly service = new DoctorsService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.sub;
            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado" });
            }

            const data = createDoctorSchema.parse(req.body);
            const doctor = await this.service.create(data, userId);
            res.status(201).json(doctor);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const doctors = await this.service.findAll();
            res.status(200).json(doctors);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const doctor = await this.service.findById(req.params.id);
            res.status(200).json(doctor);
        } catch (error) {
            next(error);
        }
    };

    findBySpecialty = async (req: Request<{ specialtyId: string }>, res: Response, next: NextFunction) => {
        try {
            const doctors = await this.service.findBySpecialty(req.params.specialtyId);
            res.status(200).json(doctors);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const data = updateDoctorSchema.parse(req.body);
            await this.service.update(req.params.id, data);
            res.status(200).json({ message: "Doctor actualizado" });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            await this.service.delete(req.params.id);
            res.status(200).json({ message: "Doctor eliminado" });
        } catch (error) {
            next(error);
        }
    };
}