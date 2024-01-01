import express from 'express';
import upload from '../configs/multer.js';
import { saveFile } from '../controllers/c_files.js';
const api = express.Router();

api.post('/file', upload.single('file'), saveFile);

export default api;