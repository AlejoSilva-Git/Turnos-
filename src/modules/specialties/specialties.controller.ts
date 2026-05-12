import { Request, Response, NextFunction } from "express";
import { SpecialtiesService } from "./specialties.service";
import { createSpecialtySchema, updateSpecialtySchema } from "./specialties.schema";

type SpecialtyParams = { id: string };

export class SpecialtiesController {
    private readonly service = new SpecialtiesService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createSpecialtySchema.parse(req.body);
            const specialty = await this.service.create(data);
            res.status(201).json(specialty);
        } catch (error) {
            next(error);
        }
    };

    findAll = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const specialties = await this.service.findAll();
            res.status(200).json(specialties);
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: Request<SpecialtyParams>, res: Response, next: NextFunction) => {
        try {
            const specialty = await this.service.findById(req.params.id);
            res.status(200).json(specialty);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request<SpecialtyParams>, res: Response, next: NextFunction) => {
        try {
            const data = updateSpecialtySchema.parse(req.body);
            await this.service.update(req.params.id, data);
            res.status(200).json({ message: "Especialidad actualizada" });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request<SpecialtyParams>, res: Response, next: NextFunction) => {
        try {
            await this.service.delete(req.params.id);
            res.status(200).json({ message: "Especialidad eliminada" });
        } catch (error) {
            next(error);
        }
    };
}