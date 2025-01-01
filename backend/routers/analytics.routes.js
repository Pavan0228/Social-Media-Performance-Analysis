import {Router} from 'express';
import { Analytics } from '../controller/analytics.controller.js';
const analyticsRouter = Router();

analyticsRouter.route("/").post(Analytics);

export {analyticsRouter};
