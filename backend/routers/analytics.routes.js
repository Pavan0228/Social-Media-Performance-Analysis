import {Router} from 'express';
import { Analytics, Analytics_API } from '../controller/analytics.controller.js';
const analyticsRouter = Router();

analyticsRouter.route("/test").post(Analytics_API);
analyticsRouter.route("/").post(Analytics);

export {analyticsRouter};
