
import fs from 'fs/promises';
import path from 'path';

// Шлях до файлу contacts.json
const contactsPath= path.resolve('db', 'contacts.json');


// Функція для зчитування даних з файлу

async function readContacts() {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contacts);
  }

  // Функція для запису даних у файл
async function writeContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
  }


  // Повертає масив контактів
export async function listContacts() {
    return await readContacts();
  }

  // Повертає контакт за ID
export async function getContactById(contactId) {
    const contacts = await readContacts();
    return contacts.find(contact => contact.id === contactId) || null;
  }
  // Додає новий контакт
export async function addContact(name, email, phone) {
    const contacts = await readContacts();
    const newContact = {
      id: Date.now().toString(), // Унікальний ID для нового контакту
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  }
  
  // Оновлює контакт за ID

  export async function updateContactById (contactId,data) {
    const contacts = await readContacts();
    const index = contacts.findIndex(contact=>contact.id===contactId);
  
    if(index===-1){
        return null
    }
    contacts[index]={id:contactId, ...data}

    await writeContacts(contacts);
    return contacts[index];
  }

  // Видаляє контакт за ID
  export async function removeContact(contactId) {
    const contacts = await readContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await writeContacts(contacts);
    return removedContact;
  }

 