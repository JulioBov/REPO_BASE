import { S3Client } from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';
import enviroments from '../enviroments.js';

const s3Client = new S3Client({
  region: enviroments.AWS_REGION,
  credentials: defaultProvider(),
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: enviroments.BUCKET_NAME,
    key: (req, file, cb) => {
      try {
        const ext = file.originalname.split('.').pop();
        if (!ext) {
          throw new Error('File doesnt have an extension.');
        }
        const fileName = `${uuidv4()}.${ext}`;
        cb(null, fileName);
      } catch (error) {
        cb(error);
      }
    },
  }),
});

export default upload;