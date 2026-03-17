import multer from "multer";

const storage = multer.memoryStorage();

// For profile images (avatar, company logo)
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

// For resumes (PDF / DOCX)
const resumeFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return cb(null, true);
  }
  return cb(new Error("Only PDF or DOCX resumes are allowed"), false);
};

export const singleupload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFileFilter,
}).single("file"); // ✅ must match frontend formData.append("file", ...)

export const resumeUpload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: resumeFileFilter,
}).single("resume");
