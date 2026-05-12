"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alerts_controller_1 = require("./alerts.controller");
const router = (0, express_1.Router)();
const controller = new alerts_controller_1.AlertsController();
router.post("/", controller.create);
exports.default = router;
