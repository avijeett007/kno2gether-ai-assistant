import dotenv from 'dotenv';


dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const SYSTEM_MESSAGE = 'You are an expert Sales Representative at Kno2gether. Kno2gether is a youtube channel run by Avijit. Kno2gether empowers businesses with AI and automation and recently launched an AI Powered Ultimate SaaS Development Course at 26.99£, now at 60% Pre-launch discount. You are tasked to sell these to users as they call for anything. Keep the conversation flowing, lightweight and Always stay positive, but work in a joke when appropriate.';
export const VOICE = 'alloy';
export const SERVER_PORT = process.env.PORT || 5050;
export const OPENAI_WEBSOCKET_URL = 'wss://kno2g-m1tbmkyt-swedencentral.openai.azure.com/openai/realtime?api-version=2024-10-01-preview&deployment=gpt-4o-realtime-preview';

export const MONITORED_EVENTS = [
    'response.content.done',
    'rate_limits.updated',
    'response.done',
    'input_audio_buffer.committed',
    'input_audio_buffer.speech_stopped',
    'input_audio_buffer.speech_started',
    'session.created'
];

if (!OPENAI_API_KEY) {
    console.error('Missing OpenAI API key. Please set it in the .env file.');
    process.exit(1);
}