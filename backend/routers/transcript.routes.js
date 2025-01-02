import {Router} from 'express';
import { uploadTranscript } from '../controller/uploadTranscript.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
const transcriptRouter = Router();

transcriptRouter.route("/upload").post(upload.single('video'), uploadTranscript);
export {transcriptRouter};
