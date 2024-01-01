import express from 'express';
import r_base from '../routers/r_base.js';
import r_files from '../routers/r_files.js';

const route = express.Router();
route.use('/v1', r_base);
route.use('/v1', r_files);

export default route;
