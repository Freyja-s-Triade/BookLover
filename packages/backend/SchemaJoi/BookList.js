import Joi from "joi";

export const paramsSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const bodySchema = Joi.object({
  name: Joi.string(),
  position: Joi.number().integer().positive(),
  id: Joi.number().integer().positive(),
})
  .min(1)
  .required();
