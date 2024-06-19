import contactsService from "../services/index.js";
import HttpError from "../helpers/HttpError.js";




export const getAllContacts = async (req, res) => {
    const contacts = await contactsService.listContacts();   
    res.status(200).json({ contacts, status: 'success' });

};

export const getOneContact = async(req, res) => {
    const {id}= req.params;
    const contact = await contactsService.getContactById(id);
    if(!contact){
        throw HttpError (404, 'Not found ')
    }
    res.status(200).json({contact,status: 'success'})
};

export const deleteContact = async (req, res) => {
    const {id}= req.params;
    const deletedContact = await contactsService.removeContact(id);
    if(!deleteContact ) {
        throw HttpError (404, 'Not found ')
    }
    res.status(200).json({deletedContact,status: 'success'})

};

export const createContact = async (req, res) => {
    const {name,email,phone} = req.body;

   
    const newContact= await contactsService.addContact(name,email,phone);
    if(!newContact){
        throw HttpError (400);
    }

    res.status(201).json({ newContact,status: 'success'})
};

export const updateContact = async(req, res) => {
    const {id}=req.params;
   
    if(!req.body){
        throw HttpError(400, 'Body must have at least one field');
    }
    const result= await contactsService.updateContactById(id,req.body);
    if(!result) {
        throw HttpError(400);
    }
    res.status(200).json({  result,status: 'success'})
    
};
