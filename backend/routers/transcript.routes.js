import {Router} from 'express';
import { uploadTranscript } from '../controller/uploadTranscript.controller.js';
import { upload, uploadPhoto } from '../middlewares/multer.middleware.js';
import thumbnailController from '../controller/thumbnail.controller.js';
const transcriptRouter = Router();

transcriptRouter.route("/upload").post(upload.single('video'), uploadTranscript);

transcriptRouter.post(
    '/analyze',
    uploadPhoto.single('photo'),
    (req, res) => thumbnailController.analyzeThumbnail(req, res) 
);

export {transcriptRouter};
