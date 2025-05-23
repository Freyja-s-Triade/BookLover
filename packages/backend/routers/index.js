import { Router } from "express";
import { bookListRouter } from "./bookListRouter.js";

export const router = Router();

//test
/*
router.get('/', (req, res) => {
    res.status(200).json({message: 'Le serveur est lancé!'}); /test
});
*/

router.use(bookListRouter);
