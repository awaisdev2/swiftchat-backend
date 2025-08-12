import { Joi } from "express-validation";

export const createChannelValidator = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};
