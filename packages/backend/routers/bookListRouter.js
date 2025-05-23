import { Router } from "express";
import catchErrors from "../middlewares/catchErrors.js";
const bookListRouter = Router();

import { bookListController } from "../controllers/bookListController.js";

bookListRouter.get("/lists", catchErrors(bookListController.index));

export { bookListRouter };
