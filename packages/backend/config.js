import "dotenv/config.js";

export const server = {
    protocol: process.env.PROTOCOL,
    host: process.env.HOST,
    port: process.env.PORT,
    cors: {
        allowedDomains: process.env.CORS_ALLOWED_DOMAINS || ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: process.env.CORS_CREDENTIALS || true
    },
};