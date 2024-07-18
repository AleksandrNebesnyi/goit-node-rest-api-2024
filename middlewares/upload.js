import multer from 'multer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to `__filename`
const __filename = fileURLToPath(import.meta.url);
// Get `__dirname` from `__filename`
const __dirname = dirname(__filename);

const tempDir = join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

export default upload;
