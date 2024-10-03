import WebSocket from 'ws';
import { OPENAI_API_KEY, OPENAI_WEBSOCKET_URL, SYSTEM_MESSAGE, VOICE, MONITORED_EVENTS } from './config.js';

export function handleMediaStream(connection, req) {
    console.log('New client connected to media stream');

    const openAiWs = new WebSocket(OPENAI_WEBSOCKET_URL, {
        headers: {
            "api-key": OPENAI_API_KEY,
            "OpenAI-Beta": "realtime=v1"
        }
    });

    let activeStreamId = null;

    const initializeSession = () => {
        const sessionConfig = {
            type: 'session.update',
            session: {
                turn_detection: { type: 'server_vad' },
                input_audio_format: 'g711_ulaw',
                output_audio_format: 'g711_ulaw',
                voice: VOICE,
                instructions: SYSTEM_MESSAGE,
                modalities: ["text", "audio"],
                temperature: 0.8,
            }
        };

        console.log('Initializing OpenAI session:', JSON.stringify(sessionConfig));
        openAiWs.send(JSON.stringify(sessionConfig));
    };

    openAiWs.on('open', () => {
        console.log('OpenAI Realtime API connection established');
        setTimeout(initializeSession, 250);
    });

    openAiWs.on('message', (data) => {
        try {
            const aiResponse = JSON.parse(data);

            if (MONITORED_EVENTS.includes(aiResponse.type)) {
                console.log(`Received event: ${aiResponse.type}`, aiResponse);
            }

            if (aiResponse.type === 'session.updated') {
                console.log('Session updated successfully:', aiResponse);
            }

            if (aiResponse.type === 'response.audio.delta' && aiResponse.delta) {
                const audioPacket = {
                    event: 'media',
                    streamSid: activeStreamId,
                    media: { payload: Buffer.from(aiResponse.delta, 'base64').toString('base64') }
                };
                connection.send(JSON.stringify(audioPacket));
            }
        } catch (error) {
            console.error('Error processing OpenAI message:', error, 'Raw message:', data);
        }
    });

    connection.on('message', (message) => {
        try {
            const clientData = JSON.parse(message);

            switch (clientData.event) {
                case 'media':
                    if (openAiWs.readyState === WebSocket.OPEN) {
                        const audioInput = {
                            type: 'input_audio_buffer.append',
                            audio: clientData.media.payload
                        };

                        openAiWs.send(JSON.stringify(audioInput));
                    }
                    break;
                case 'start':
                    activeStreamId = clientData.start.streamSid;
                    console.log('New audio stream initiated', activeStreamId);
                    break;
                default:
                    console.log('Unhandled event received:', clientData.event);
                    break;
            }
        } catch (error) {
            console.error('Error parsing client message:', error, 'Message:', message);
        }
    });

    connection.on('close', () => {
        if (openAiWs.readyState === WebSocket.OPEN) openAiWs.close();
        console.log('Client disconnected from media stream');
    });

    openAiWs.on('close', () => {
        console.log('OpenAI Realtime API connection closed');
    });

    openAiWs.on('error', (error) => {
        console.error('OpenAI WebSocket error:', error);
    });
}