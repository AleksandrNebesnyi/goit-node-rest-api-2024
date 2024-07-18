import express from 'express';
import contactsControllers from '../controllers/contactsControllers.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} from '../schemas/contactsSchemas.js';
import authenticate from '../middlewares/authenticate.js';

const contactsRouter = express.Router();

contactsRouter.get(
  '/',
  authenticate,
  ctrlWrapper(contactsControllers.getAllContacts)
);

contactsRouter.get(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(contactsControllers.getOneContact)
);

contactsRouter.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(contactsControllers.deleteContact)
);

contactsRouter.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(contactsControllers.createContact)
);

contactsRouter.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(contactsControllers.updateContact)
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(updateContactStatusSchema),
  ctrlWrapper(contactsControllers.updateFavorite)
);

export default contactsRouter;
