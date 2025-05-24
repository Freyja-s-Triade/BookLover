import { List } from "../models/index.js";

export const bookListController = {
  async index(_req, res) {
    const lists = await List.findAll();

    res.json(lists);
  },

  async showList(req, res) {
    const { id } = req.params;
    const list = await List.findByPk(id, {
      include: [
        {
          association: "books",
          attributes: ["title"],
          include: [
            {
              association: "author",
              attributes: ["lastname", "firstname"],
            },
            {
              association: "genre",
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    if (!list) {
      return next();
    }
    return res.json(list);
  },
};
