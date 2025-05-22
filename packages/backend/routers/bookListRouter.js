import { Router } from 'express';
const bookListRouter = Router();

import { bookListController } from '../controllers/bookListController.js';

bookListRouter.get('/lists', bookListController.index);

export { bookListRouter };