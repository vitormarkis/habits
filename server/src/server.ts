import cors from '@fastify/cors';
import Fastify from 'fastify';
import { appRoutes } from './lib/routes';

const PORT = 3333;
const app = Fastify();

app.register(cors, {});
app.register(appRoutes);

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`HTTP Server running on port ${PORT}`));
