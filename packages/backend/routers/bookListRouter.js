import { Router } from "express";
import catchErrors from "../middlewares/catchErrors.js";
import { validateParams } from "../middlewares/validateSchemaJoi.js";
import { paramsSchema } from "../SchemaJoi/BookList.js";
const bookListRouter = Router();

import { bookListController } from "../controllers/bookListController.js";

bookListRouter.route("/lists").get(catchErrors(bookListController.index));

bookListRouter
  .route("/lists/:id")
  .get(validateParams(paramsSchema), catchErrors(bookListController.showList));

export { bookListRouter };
