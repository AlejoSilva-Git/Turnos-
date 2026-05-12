import { ObjectId } from "mongodb";
import { PatientsRepository } from "./patients.repository";
import { Patient } from "./patients.model";
import { CreatePatientDto, UpdatePatientDto } from "./patients.schema";

export class PatientsService {
    private readonly repository = new PatientsRepository();

    async create(data: CreatePatientDto, userId: string): Promise<Patient> {
        const existing = await this.repository.findByUserId(userId);
        if (existing) {
            throw new Error("El usuario ya tiene un perfil de paciente");
        }

        const existingDni = await this.repository.findByDni(data.dni);
        if (existingDni) {
            throw new Error("Ya existe un paciente con ese DNI");
        }

        const now = new Date();
        const patient: Patient = {
            userId: new ObjectId(userId),
            ...data,
            birthDate: new Date(data.birthDate),
            isActive: true,
            createdAt: now,
            updatedAt: now,
        };

        return await this.repository.create(patient);
    }

    async findAll(): Promise<Patient[]> {
        return await this.repository.findAll();
    }

    async findById(id: string): Promise<Patient> {
        const patient = await this.repository.findById(id);
        if (!patient) throw new Error("Paciente no encontrado");
        return patient;
    }

    async findMyProfile(userId: string): Promise<Patient | null> {
        return await this.repository.findByUserId(userId);
    }

    async update(id: string, data: UpdatePatientDto): Promise<void> {
        await this.findById(id);
        const { birthDate, ...rest } = data;
        const updateData: Partial<Patient> = { ...rest };
        if (birthDate) {
            updateData.birthDate = new Date(birthDate);
        }
        await this.repository.update(id, updateData);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.repository.delete(id);
    }
}