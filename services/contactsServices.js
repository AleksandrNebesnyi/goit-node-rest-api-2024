import { Contact } from '../schemas/contactsSchemas.js';

// Повертає масив контактів
const listContacts = async req => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = favorite ? { owner, favorite } : { owner };
  return await Contact.find(
    query,
    '-createdAt -updatedAt',
    { skip, limit }
  ).populate('owner', 'name email');
};

// Повертає контакт за ID
const getContactById = async req => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  console.log(contactId);
  console.log(userId);
  // const contacts = await Contact.findOne({_id: id});
  return await Contact.findOne({
    _id: contactId,
    owner: userId,
  });
};

// Додає новий контакт
const addContact = async req => {
  const { body: requestBody } = req;
  const { _id: userId } = req.user;
  return await Contact.create({
    ...requestBody,
    owner: userId,
  });
};

// Оновлює контакт за ID

const updateContactById = async (contactId, req) => {
  const { body } = req;
  const { _id: userId } = req.user;
  const updateContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    body,
    { new: true }
  ).populate('owner', 'email subscription');
  return updateContact;
};

// Оновлює поле favorit за ID

const updateFavorittById = async (contactId, req) => {
  const { body } = req;
  const { _id: userId } = req.user;
  const updateContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    body,
    { new: true }
  ).populate('owner', 'email subscription');
  return updateContact;
};

// Видаляє контакт за ID
const removeContact = async (contactId, req) => {
  const { _id: userId } = req.user;
  return await Contact.findByIdAndDelete({
    _id: contactId,
    owner: userId,
  });
};

export default {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  updateFavorittById,
  removeContact,
};
