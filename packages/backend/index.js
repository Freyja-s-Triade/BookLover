import express from "express";
import cors from "cors";
import { server } from "./config.js";
import { router } from "./routers/index.js";
import { notFound } from "./middlewares/errorMiddleware.js";
import { handlerError } from "./middlewares/errorMiddleware.js";

// Use express
const app = express();

// Cross origin requests policy
app.use(cors({
  origin: server.cors.allowedDomains, // Allow cross-origin requests
  credentials: server.cors.credentials // Allow cross-origin cookies to be sent
}));

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers
app.use(router);

// Errors Middlewares
app.use(notFound);
app.use(handlerError);

// Server
const { protocol, port, host } = server;
app.listen(port, host, () => {
  console.log(`🚀 Server listening on ${protocol}://${host}:${port}`);
});
