import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../schemas/usersSchemas.js";
import HttpError from "../helpers/HttpError.js";

const {sign} = jwt;
const {hash}=bcrypt;

 // Register User
 export async function register(requestBody) {
    const {email, password} = requestBody;
    const user=await User.findOne({email});
    if (user){
        throw new HttpError(409, "Email in use");
     }  
    const hashPassword = await hash(password, 10);
    return  await User.create({...requestBody, password: hashPassword});
    
    
     };


      // Login User
 export async function login(requestBody) {

    const {email, password} = requestBody;
    const {SECRET_KEY}=process.env;
   
    

    const user=await User.findOne({email});
    if (!user){
        throw new HttpError(401, "Email or password is wrong")
     }  
     const passwordCompare = await bcrypt.compare(password, user.password);
     if(!passwordCompare) {
        throw new HttpError(401, "Email or password invalid");
    }
    const payload = {
        id: user._id,
    }
   
    const token = sign(payload, SECRET_KEY, {expiresIn: "23h"});
    return await User.findByIdAndUpdate(user._id, {token}, {new:true});
     };



     export async function current(email){      
        const user=await User.findOne({email});
       
        if (!user){
            throw new HttpError(401);
         }
         return user;
     };

     export async function logout(currentUser){
        const {_id,email}=currentUser;       

        const user=await User.findOne({email});

        if (!user){
            throw new HttpError(401);
         }

        await User.findByIdAndUpdate(_id,{token:''});
        
     };

     export async function  updateSubscription (currentUser,subscription){
      const {_id,email}=currentUser;       

      const user=await User.findOne({email});
      
      if (!user){
          throw new HttpError(401);
       }

      return await User.findByIdAndUpdate(_id,{subscription},{new:true});
      
   }