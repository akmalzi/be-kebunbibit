import path from "path";
import multer from "multer";
import crypto from "crypto";
import responseError from "../errors/responseError.js";

function storage(folder, fileName) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), "public", "images", `${folder}`));
    },
    filename: (req, file, cb) => {
      cb(null, `${fileName}${path.extname(file.originalname)}`);
    },
  });
  return storage;
}
function uploadFile(folder, fileType) {
  const fileName = crypto.randomBytes(8).toString("hex");
  const upload = multer({
    storage: storage(folder, fileName),
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = [".jpeg", ".jpg", ".png"];
      const extension = path.extname(file.originalname).toLowerCase();
      if (allowedMimeTypes.includes(extension)) {
        req.newPhotoName = `${fileName}${extension}`;
        return cb(null, true);
      } else {
        cb(
          new responseError(
            "Tipe file hanya boleh .jpeg, .jpg, .png",
            400,
            false
          )
        );
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 2, // 2MB max file size
    },
  }).single(fileType);

  return upload;
}

export const fileUpload = {
  uploadFile,
};
