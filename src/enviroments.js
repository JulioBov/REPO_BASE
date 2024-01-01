import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  PORT: process.env.PORT,

  // Database Configs
  MONGO_BASE_NAME: process.env.MONGO_BASE_NAME,
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  CONNECTION_STRING_PG: process.env.CONNECTION_STRING_PG,
  /////////////////////////////////////////////////

  // # AWS
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  BUCKET_NAME: process.env.BUCKET_NAME,
  /////////////////////////////////////////////////
};
