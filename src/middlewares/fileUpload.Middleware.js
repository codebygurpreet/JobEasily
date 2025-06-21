import multer from 'multer';
import Path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const ext = Path.extname(file.originalname).toLowerCase();

        if (ext === '.pdf') {
            cb(null, Path.resolve('src', 'public', 'uploads'));
        } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
            cb(null, Path.resolve('src', 'public', 'images'));
        } else {
            cb(new Error('Unsupported file type'), null);
        }
    },
    
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

export default upload