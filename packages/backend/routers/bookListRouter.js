import { Router } from "express";
import catchErrors from "../middlewares/catchErrors.js";
import { validateReq } from "../middlewares/validateSchemaJoi.js";
import { paramsSchema, bodySchema } from "../SchemaJoi/BookList.js";
const bookListRouter = Router();

import { bookListController } from "../controllers/bookListController.js";

bookListRouter
  .route("/lists")
  .get(catchErrors(bookListController.index))
  .post(validateReq(bodySchema), catchErrors(bookListController.store));

bookListRouter
  .route("/lists/:id")
  .get(validateReq(paramsSchema), catchErrors(bookListController.showList))
  .patch(
    validateReq(paramsSchema),
    validateReq(bodySchema),
    catchErrors(bookListController.update)
  );

export { bookListRouter };
