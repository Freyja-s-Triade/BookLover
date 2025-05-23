import { Router } from "express";
import catchErrors from "../middlewares/catchErrors.js";
const bookListRouter = Router();

import { bookListController } from "../controllers/bookListController.js";

bookListRouter.route("/lists").get(catchErrors(bookListController.index));

bookListRouter
  .route("/lists/:id")
  .get(catchErrors(bookListController.showList));

export { bookListRouter };
