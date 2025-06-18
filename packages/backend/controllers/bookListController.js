import { Op } from "sequelize";
import { List } from "../models/index.js";
import sanitizeHtml from "sanitize-html";

export const bookListController = {
  async index(_req, res) {
    const lists = await List.findAll();

    res.json(lists);
  },

  // Requête pour insérer une nouvelle liste
  async store(req, res) {
    const { name, position } = req.body;
    if (!name || !position) {
      return res
        .status(400)
        .json({ message: "Le nom et la position sont requis" });
    }
    const newList = await List.create({ name, position });
    res.status(201).json(newList);
  },

  // Requête pour une liste
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

  // Requête pour modifier nom ou position d'une liste
  async update(req, res, next) {
    const { id } = req.params;
    const { name, position } = req.body;
    // if (!name || !position) {
    //   return res
    //     .status(400)
    //     .json({ message: "Le nom et/ou la position sont requis" });
    // }
    const listToUpdate = await List.findByPk(id, {
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

    if (!listToUpdate) {
      return res.status(404).json({ message: "Liste introuvable" });
    }

    const existingListWithSamePosition = await List.findOne({
      where: {
        position,
        id: { [Op.ne]: id },
      },
    });

    if (existingListWithSamePosition) {
      return res
        .status(409)
        .json({ message: "Cette position est déjà utilisée" });
    }

    const updatedList = await listToUpdate.update({
      name: typeof name === "string" ? sanitizeHtml(name) : listToUpdate.name,
      position: position !== undefined ? position : listToUpdate.position,
    });
    res.status(200).json(updatedList);
  },

  // Requête pour supprimer une liste
  async destroy(req, res, next) {
    const { id } = req.params;

    const list = await List.findByPk(id);
    if (!list) {
      return next();
    }
    await list.destroy();
    res.status(204).end();
  },
};
