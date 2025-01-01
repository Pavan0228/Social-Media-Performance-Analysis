import {Router} from 'express';
import { uploadTranscript } from '../controller/uploadTranscript.controller.js';
const transcriptRouter = Router();

transcriptRouter.route("/upload").post(uploadTranscript)

export {transcriptRouter};
