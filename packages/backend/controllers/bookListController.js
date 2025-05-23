import { List } from '../models/index.js';

export const bookListController = {
    async index(_req, res) {
        const lists = await List.findAll();

        res.json(lists);
    }
}