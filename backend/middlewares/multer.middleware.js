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
    const fileTypes = /mp4|mpeg|quicktime|m4a|webm/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimeType = /video\/*/.test(file.mimetype);

    if (extname && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only video files are allowed"));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 100 }, // Increased to 100MB
});


export const uploadPhoto = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});