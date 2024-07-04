

import { Contact} from "../schemas/contactsSchemas.js";


  // Повертає масив контактів
export async function listContacts() {
 return await Contact.find({}, "-createdAt -updatedAt");   
  };

  // Повертає контакт за ID
export async function getContactById(contactId) {
    // const contacts = await Contact.findOn({_id: id});
    return await Contact.findById(contactId)
  };

  // Додає новий контакт
export async function addContact(requestBody) {   
    return await Contact.create(requestBody)
  }
  
  // Оновлює контакт за ID

  export async function updateContactById (contactId,body) {
    const updateContact = await Contact.findByIdAndUpdate(contactId,body,{new:true});
    return updateContact;
  }
    
  // Оновлює поле favorit за ID

  export async function updateFavorittById (contactId,body) {
    const updateContact = await Contact.findByIdAndUpdate(contactId,body,{new:true});
    return updateContact;
  }


  // Видаляє контакт за ID
  export async function removeContact(contactId) {
    return await Contact.findByIdAndDelete(contactId);
  };

 