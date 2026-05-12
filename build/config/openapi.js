"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
exports.openApiSpec = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Projects",
            version: "1.0.0",
            description: "Documentación de endpoints de la API",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Servidor local",
            },
            {
                url: "https://collaborate-ook5.onrender.com/api/v1",
                description: "Servidor Producción",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Ingresa el token JWT en formato Bearer",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [path_1.default.join(__dirname, "../modules/**/*.routes.{ts,js}")],
});
