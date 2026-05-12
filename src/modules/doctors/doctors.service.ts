import { ObjectId } from "mongodb";
import { DoctorsRepository } from "./doctors.repository";
import { SpecialtiesRepository } from "../specialties/specialties.repository";
import { Doctor } from "./doctors.model";
import { CreateDoctorDto, UpdateDoctorDto } from "./doctors.schema";

export class DoctorsService {
    private readonly repository = new DoctorsRepository();
    private readonly specialtyRepo = new SpecialtiesRepository();

    async create(data: CreateDoctorDto, userId: string): Promise<Doctor> {
        const specialty = await this.specialtyRepo.findById(data.specialtyId);
        if (!specialty) {
            throw new Error("Especialidad no encontrada");
        }

        const existingLicense = await this.repository.findByLicense(data.licenseNumber);
        if (existingLicense) {
            throw new Error("Ya existe un médico con esa matrícula");
        }

        const now = new Date();
        const doctor: Doctor = {
            userId: new ObjectId(userId),
            ...data,
            specialtyId: new ObjectId(data.specialtyId),
            isActive: true,
            createdAt: now,
            updatedAt: now,
        };

        return await this.repository.create(doctor);
    }

    async findAll(): Promise<Doctor[]> {
        return await this.repository.findAll();
    }

    async findById(id: string): Promise<Doctor> {
        const doctor = await this.repository.findById(id);
        if (!doctor) throw new Error("Médico no encontrado");
        return doctor;
    }

    async findBySpecialty(specialtyId: string): Promise<Doctor[]> {
        return await this.repository.findBySpecialty(specialtyId);
    }

    async update(id: string, data: UpdateDoctorDto): Promise<void> {
        await this.findById(id);

        const updateData: Partial<Doctor> = {
            ...data,
            specialtyId: data.specialtyId ? new ObjectId(data.specialtyId) : undefined,
        };

        await this.repository.update(id, updateData);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.repository.delete(id);
    }
}