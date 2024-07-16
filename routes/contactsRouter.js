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
import validateBody from "../middlewares/validateBody.js";
import  isValidId  from "../middlewares/isValidId.js";
import {createContactSchema, updateContactSchema, schemaUpdateContactStatus } from "../schemas/contactsSchemas.js";
import authenticate from "../middlewares/authenticate.js";



const contactsRouter = express.Router();

contactsRouter.get("/",authenticate,ctrlWrapper(getAllContacts));

contactsRouter.get("/:id",authenticate,isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id",authenticate,isValidId, ctrlWrapper(deleteContact));

contactsRouter.post("/",authenticate,validateBody( createContactSchema) ,ctrlWrapper(createContact));

contactsRouter.put("/:id", authenticate,isValidId,validateBody(updateContactSchema),ctrlWrapper(updateContact));

contactsRouter.patch("/:id/favorite",authenticate ,isValidId,validateBody(schemaUpdateContactStatus),ctrlWrapper(uupdateFavorite));

export default contactsRouter;
