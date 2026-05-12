import { Router } from "express";
import { AppointmentsController } from "./appointments.controller";
import { createAppointmentSchema, updateAppointmentSchema, completeAppointmentSchema } from "./appointments.schema";
import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new AppointmentsController();

/**
 * @openapi
 * /appointments:
 *   post:
 *     summary: Crear un nuevo turno
 *     description: Reserva un turno médico
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - date
 *               - reason
 *             properties:
 *               doctorId:
 *                 type: string
 *                 example: 67a3f2b1c8d4e5f6a7b8c9d0
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-02-15T10:00:00Z
 *               reason:
 *                 type: string
 *                 example: Dolor de cabeza persistente
 *               notes:
 *                 type: string
 *                 example: El paciente refiere dolor desde hace 3 días
 *     responses:
 *       201:
 *         description: Turno creado exitosamente
 *       401:
 *         description: No autorizado
 */
router.post("/", authMiddleware, validate(createAppointmentSchema), controller.create);

/**
 * @openapi
 * /appointments:
 *   get:
 *     summary: Obtener todos los turnos
 *     description: Lista todos los turnos del sistema
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos
 */
router.get("/", authMiddleware, controller.findAll);

/**
 * @openapi
 * /appointments/me:
 *   get:
 *     summary: Mis turnos
 *     description: Obtiene los turnos del paciente autenticado
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mis turnos
 */
router.get("/me", authMiddleware, controller.getMyAppointments);

/**
 * @openapi
 * /appointments/slots/{doctorId}/{date}:
 *   get:
 *     summary: Horarios disponibles
 *     description: Obtiene los horarios disponibles de un médico en una fecha específica
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: 2025-02-15
 *     responses:
 *       200:
 *         description: Lista de horarios disponibles
 */
router.get("/slots/:doctorId/:date", authMiddleware, controller.getAvailableSlots);

/**
 * @openapi
 * /appointments/{id}:
 *   get:
 *     summary: Obtener turno por ID
 *     description: Obtiene los detalles de un turno específico
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del turno
 *       404:
 *         description: Turno no encontrado
 */
router.get("/:id", authMiddleware, controller.findById);

/**
 * @openapi
 * /appointments/{id}:
 *   put:
 *     summary: Actualizar turno
 *     description: Actualiza el estado o notas de un turno
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled, completed, no_show]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Turno actualizado
 */
router.put("/:id", authMiddleware, validate(updateAppointmentSchema), controller.update);

/**
 * @openapi
 * /appointments/{id}/complete:
 *   patch:
 *     summary: Completar turno
 *     description: Marca un turno como completado y añade receta
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prescription:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Turno completado
 */
router.patch("/:id/complete", authMiddleware, validate(completeAppointmentSchema), controller.complete);

export default router;