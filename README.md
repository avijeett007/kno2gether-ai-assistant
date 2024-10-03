# Kno2gether AI Assistant

This project is an AI-powered assistant for Kno2gether, integrating Twilio for voice calls and OpenAI's GPT model for intelligent conversations. It's designed to showcase AI automation in business processes and promote Kno2gether's YouTube channel and SaaS Development Course.

## Features

- Real-time voice interaction using Twilio
- AI-powered responses using OpenAI's GPT model
- WebSocket integration for seamless audio streaming
- Configurable system messages and voice settings

## Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- Twilio account and phone number
- OpenAI API key with access to the Realtime API

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/kno2gether-ai-assistant.git
   cd kno2gether-ai-assistant
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the project root and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Configuration

Modify the `config.js` file to adjust settings such as:
- System message for the AI
- Voice selection
- Server port
- OpenAI WebSocket URL

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Configure your Twilio phone number to point to your server's `/incoming-call` endpoint.

3. Call the Twilio number to interact with the AI assistant.

## Project Structure

- `server.js`: Main entry point for the Fastify server
- `config.js`: Configuration settings and constants
- `routes.js`: HTTP route definitions
- `websocketHandler.js`: WebSocket logic for real-time communication

## Code Walkthrough

For a detailed explanation of how this project works, check out our YouTube video:

[![Kno2gether AI Assistant Code Walkthrough](http://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](http://www.youtube.com/watch?v=YOUR_VIDEO_ID "Kno2gether AI Assistant Code Walkthrough")

In this video, Avijit from Kno2gether walks through the code, explaining the integration of Twilio, OpenAI, and the overall architecture of the AI assistant.

## Contributing

We welcome contributions to improve the Kno2gether AI Assistant. Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About Kno2gether

Kno2gether is a YouTube channel run by Avijit, focused on empowering businesses with AI and automation. Check out our [AI Powered Ultimate SaaS Development Course](https://www.youtube.com/c/Kno2gether) for more in-depth tutorials and insights.

## Support

For any questions or support, please [open an issue](https://github.com/yourusername/kno2gether-ai-assistant/issues) or contact us through our [YouTube channel](https://www.youtube.com/c/Kno2gether).