import Joi from 'joi';
import { Schema,model } from 'mongoose';
import  handleMongooseError  from '../middlewares/handleMongooseError.js';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegexp,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      },
},{versionKey: false, timestamps: true});


userSchema.post("save", handleMongooseError);

export const User = model ('user', userSchema);

export const registerSchema = Joi.object (
{
    
    email:Joi.string().required().pattern( emailRegexp),
    password:Joi.string().min(4).required(),
}
);

export const loginSchema = Joi.object (
    {       
        email:Joi.string().required().pattern( emailRegexp),
        password:Joi.string().min(4).required(),
    }
    );


export const subscriptionShema= Joi.object({
  subscription:Joi.string().valid('starter', 'pro', 'business').required(),
})