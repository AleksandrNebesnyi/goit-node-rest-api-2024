
import HttpError from "../helpers/HttpError.js";
import { register,login,current,logout,updateSubscription} from "../services/authServices.js";



export const registerUser = async (req, res) => {    
    const user = await register(req.body);   
    res.status(201).json({
        email:user.email,
        subscription:user.subscription,
    })
   

};

export const loginUser = async (req, res) => {    
    const user = await login(req.body);    
    res.status(200).json({
       token:user.token,
       user:{
        email:user.email,
        subscription:user.subscription,
       }
    })
   

};

export const currentUser = async (req, res) => {
    const {email} = req.user; 
    const user = await current(email);    
    res.status(200).json({
       email:user.email,
       subscription:user.subscription,
    })
};


export const logoutUser = async (req, res) => {
    await logout(req.user);    
    res.status(204).json({
    message: "Logout success"
    });
};


export const changeSubscription = async (req,res)=>{
const {subscription}=req.body;
 const user =  await updateSubscription (req.user,subscription);
    res.status(200).json({
        email:user.email,
        subscription:user.subscription,

    })

};


