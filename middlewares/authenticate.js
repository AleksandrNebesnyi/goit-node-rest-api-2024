import jwt from 'jsonwebtoken';
import { User } from '../schemas/usersSchemas.js';
import HttpError from '../helpers/HttpError.js';



const authenticate = async (req,res,next)=>{
    const {SECRET_KEY} = process.env;
    const { verify} = jwt

    const {authorization = ""} = req.headers;
    
    const [bearer, token] = authorization.split(" ");
   
    if(bearer !=="Bearer"){
        next(HttpError(401));
    }
    try {
     
        const{id} = verify(token,SECRET_KEY);
       
        const user = await User.findById(id);
        if(!user || !user.token || user.token !==token ){
            next(HttpError(401)); 
        }

        req.user=user;
      
        next();

    } catch  {
        next(HttpError(401));
    }
}

export default authenticate;