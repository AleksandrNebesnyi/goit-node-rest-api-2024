import contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts(req);
  res.status(200).json({ contacts, status: 'success' });
};

const getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById(req);
  if (!contact) {
    throw HttpError(404, 'Not found ');
  }
  res.status(200).json({ contact, status: 'success' });
};

const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req);
  if (!newContact) {
    throw HttpError(400);
  }

  res.status(201).json({ newContact, status: 'success' });
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    throw HttpError(
      400,
      'Body must have at least one field'
    );
  }
  const result = await contactsService.updateContactById(
    id,
    req
  );
  if (!result) {
    throw HttpError(400);
  }
  res.status(200).json({ result, status: 'success' });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    throw HttpError(400, 'Body must have field favorit');
  }
  const result = await contactsService.updateFavorittById(
    id,
    req
  );
  if (!result) {
    throw HttpError(400);
  }
  res.status(200).json({ result, status: 'success' });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact =
    await contactsService.removeContact(id, req);
  if (!deleteContact) {
    throw HttpError(404, 'Not found ');
  }
  res
    .status(200)
    .json({ deletedContact, status: 'success' });
};

export default {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  updateFavorite,
  deleteContact,
};
