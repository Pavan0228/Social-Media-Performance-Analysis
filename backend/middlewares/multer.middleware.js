import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Folder where files are stored
    },
    filename: function (req, file, cb) {
        // Append timestamp to filename to avoid overwriting
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
        cb(null, true); // Accept file
    } else {
        cb(new Error("Only images are allowed")); // Reject file
    }
};

export const upload = multer({
    storage,
    fileFilter, // Apply the file filter
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});
