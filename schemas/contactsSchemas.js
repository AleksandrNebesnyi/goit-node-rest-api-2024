import Joi from "joi";

export const createContactSchema = Joi.object({

name:Joi.string().min(2).max(30).required(),
email: Joi.string().email({allowFullyQualified:true,minDomainSegments:1}).required(),
phone:Joi.string().required(),
})

export const updateContactSchema = Joi.object({
    name:Joi.string().min(2).max(30).optional(),
    email: Joi.string().email({allowFullyQualified:true,minDomainSegments:1}).optional(),
    phone:Joi.string().optional(),
})


// id: Date.now().toString(), // Унікальний ID для нового контакту
// name,
// email,
// phone,