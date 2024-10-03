import { handleMediaStream } from './websocketHandler.js';

export function setupRoutes(app) {
    app.get('/', async (request, reply) => {
        reply.send({ status: 'Kno2gether AI Assistant Server is operational' });
    });

    app.all('/incoming-call', async (request, reply) => {
        const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
                              <Response>
                                  <Say>Connecting you to the Kno2gether AI Assistant. Please hold.</Say>
                                  <Pause length="1"/>
                                  <Say>Agent is online now! You may begin your conversation now.</Say>
                                  <Connect>
                                      <Stream url="wss://${request.headers.host}/media-stream" />
                                  </Connect>
                              </Response>`;

        reply.type('text/xml').send(twimlResponse);
    });

    app.register(async (fastify) => {
        fastify.get('/media-stream', { websocket: true }, handleMediaStream);
    });
}