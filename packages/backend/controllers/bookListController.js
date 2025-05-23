import { List } from "../models/index.js";

export const bookListController = {
  async index(_req, res) {
    const lists = await List.findAll();

    res.json(lists);
  },
  //   Voir les livres(titre et année de publication) d'une liste
  async showList(req, res) {
    const { id } = req.params;
    const list = await List.findByPk(id, {
      include: [
        { association: "books", attributes: ["title", "year_published"] },
      ],
    });
    if (!list) {
      return next();
    }
    return res.json(list);
  },
};
