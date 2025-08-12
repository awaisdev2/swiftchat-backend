import { Joi } from "express-validation";

export const createMessageValidator = {
  params: Joi.object({
    channelId: Joi.string().required(),
  }),
  body: Joi.object({
    content: Joi.string().required(),
    attachments: Joi.array()
      .items(
        Joi.object({
          original_name: Joi.string().required(),
          file_type: Joi.string().required(),
          url: Joi.string().uri().required(),
        })
      )
      .optional(),
  }),
};

export const updateMessageValidator = {
  params: Joi.object({
    channelId: Joi.string().required(),
    messageId: Joi.string().required(),
  }),
  body: Joi.object({
    content: Joi.string().required(),
    attachments: Joi.array()
      .items(
        Joi.object({
          original_name: Joi.string().required(),
          file_type: Joi.string().required(),
          url: Joi.string().uri().required(),
        })
      )
      .optional(),
  }),
};
