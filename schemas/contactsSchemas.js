import Joi from 'joi';

import { Schema, model } from 'mongoose';

import handleMongooseError from '../helpers/handleMongooseError.js';

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      min: [3, 'Too short name'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

export const Contact = model('contact', contactSchema);

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      allowFullyQualified: true,
      minDomainSegments: 1,
    })
    .required(),
  phone: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      allowFullyQualified: true,
      minDomainSegments: 1,
    })
    .optional(),
  phone: Joi.string().optional(),
});
// Схема валидации обновления статуса контакта
export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
// enum: ["sale", "stock", "promocode"], один из многих
// match: codeRegexp регулярное выражегие
