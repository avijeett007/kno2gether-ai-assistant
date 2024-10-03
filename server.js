import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyFormBody from '@fastify/formbody';
import fastifyWs from '@fastify/websocket';
import { setupRoutes } from './routes.js';
import { SERVER_PORT } from './config.js';

dotenv.config();

const app = Fastify();
app.register(fastifyFormBody);
app.register(fastifyWs);

setupRoutes(app);

app.listen({ port: SERVER_PORT }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Kno2gether AI Assistant Server is running on port ${SERVER_PORT}`);
});