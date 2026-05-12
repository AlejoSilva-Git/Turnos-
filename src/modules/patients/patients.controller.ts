import { Request, Response, NextFunction } from "express";
import { PatientsService } from "./patients.service";
import { createPatientSchema, updatePatientSchema } from "./patients.schema";

export class PatientsController {
    private readonly service = new PatientsService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.sub;
            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado" });
            }

            const data = createPatientSchema.parse(req.body);
            const patient = await this.service.create(data, userId);
            res.status(201).json(patient);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const patients = await this.service.findAll();
            res.status(200).json(patients);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const patient = await this.service.findById(id);
            res.status(200).json(patient);
        } catch (error) {
            next(error);
        }
    };

    getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user?.sub;
            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado" });
            }

            const profile = await this.service.findMyProfile(userId);
            if (!profile) {
                return res.status(404).json({ message: "Perfil de paciente no encontrado" });
            }
            res.status(200).json(profile);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = updatePatientSchema.parse(req.body);
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.service.update(id, data);
            res.status(200).json({ message: "Perfil actualizado" });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.service.delete(id);
            res.status(200).json({ message: "Paciente eliminado" });
        } catch (error) {
            next(error);
        }
    };
}