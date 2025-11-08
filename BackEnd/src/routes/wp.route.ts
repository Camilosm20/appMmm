import { Router } from "express";
import WPService from "../services/wpService";
import Controller from "../controllers/controller";

const router = Router();

const wpService = new WPService();
const ctrl = new Controller(wpService);

router.get('/getAll', (req, res) => ctrl.getAll(req, res));

export default router;