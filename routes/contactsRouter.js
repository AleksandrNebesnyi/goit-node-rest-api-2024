import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  uupdateFavorite,
} from "../controllers/contactsControllers.js";
import  ctrlWrapper  from "../helpers/ctrlWrapper.js";
import validateBody from "../services/middlewares/validateBody.js";
import { isValidId } from "../services/middlewares/isValidId.js";
import {createContactSchema}  from "../schemas/contactsSchemas.js";
import { updateContactSchema } from "../schemas/contactsSchemas.js";
import { schemaUpdateContactStatus } from "../schemas/contactsSchemas.js";


const contactsRouter = express.Router();

contactsRouter.get("/",ctrlWrapper(getAllContacts));

contactsRouter.get("/:id",isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id",isValidId, ctrlWrapper(deleteContact));

contactsRouter.post("/",validateBody( createContactSchema) ,ctrlWrapper(createContact));

contactsRouter.put("/:id", isValidId,validateBody(updateContactSchema),ctrlWrapper(updateContact));

contactsRouter.patch("/:id/favorite", isValidId,validateBody(schemaUpdateContactStatus),ctrlWrapper(uupdateFavorite));
export default contactsRouter;
