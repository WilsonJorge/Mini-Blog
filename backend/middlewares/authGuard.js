const User =require("../models/Users")
const jwt =require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const authGaurd = async(req,res,next) =>{

     const authGaurd = req.headers["authorization"];

     const token =authHeader && authHeader.split("")[1];

     //verificar se a  palavra tem um token

     if(!token) return res.status(401).json({errors:["Acesso negado!"]})

     // verificar se o token e valido
     try{
           
        const verifield = jwt.verify(token,jwtSecret)

        req.user = await User.findById(verifield.id).select("-password")

        next();
     }catch(error){
        res.status(401).json({errors:["Token Invalido"]})
     }
};

module.exports=authGaurd