import express from 'express';
import startup from './configs/startup.js';
import enviroments from './enviroments.js';

const api = express();

await startup(api);

api.listen(enviroments.PORT, async () => {
  console.log(`🌍 Application running in port ${enviroments.PORT}`);
});

export default api;
