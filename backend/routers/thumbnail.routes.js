import { Router } from "express";
import { uploadPhoto } from "../middlewares/multer.middleware.js";
import thumbnailController from "../controller/thumbnail.controller.js";

const router = Router();

router.post("/analyze", uploadPhoto.single("photo"), (req, res) =>
    thumbnailController.analyzeThumbnail(req, res)
);
export default router;
