import { Router } from "express";
import UserRouter from "../../modules/users/users.routes";
import AuthRouter from "../../modules/auth/auth.routes";
import ProjectsRouter from "../../modules/projects/projects.routes";
import TasksRouter from "../../modules/tasks/tasks.routes";
import CommentsRouter from "../../modules/comments/comments.routes";
import SpecialtiesRouter from "../../modules/specialties/specialties.routes";
import PatientsRouter from "../../modules/patients/patients.routes";
import DoctorsRouter from "../../modules/doctors/doctors.routes";

const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/projects', ProjectsRouter);
router.use('/tasks', TasksRouter);
router.use('/comments', CommentsRouter);
router.use('/specialties', SpecialtiesRouter);
router.use('/patients', PatientsRouter);
router.use('/doctors', DoctorsRouter);

export default router;