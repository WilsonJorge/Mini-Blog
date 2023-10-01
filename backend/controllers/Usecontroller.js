const User = require("../models/User");

const bcrypt =require("bcryptjs");

const jwt =require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const mongoose = require("mongoose");
const jwtSecret =process.env.JWT_SECRET;


//generate user token

const generateToken =(id)=>{
    return jwt.sign({id},jwtSecret,{
        expiresIn:"7d"
    });
};

//Register user and sign in

const register = async(req,res) =>{
    const {name,email,password} = req.body

    //Verificar se existe um determinado usuario
    const user =await User.findOne({email})

    if(user){
        res.status(422).json({erros:["Por Favor ,utilize outro email"]})
        return
    }

    //Gerar Senha

    const salt =await bcrypt.genSalt()

    const passwordHash =await bcrypt.hash(password,salt)

    //Crear Usuario

    const newUser =await User.create({
        name,
        email,
        password:passwordHash
    })

    //Se o usuarior for craiado com sucesso,retorna token


    if (!newUser){
        res
         .status(422)
         .json({erros:["Houve um erro, por favor tente mais tarde."]})

         return;
    }
    res.status(201).json({
        _id:newUser._id,
        token: generateToken(newUser._id),
    });
};

//Login do Usuario

const login =async (req,res) =>{
    const {email,password}= req.body

    const user =await User.findOne({email})

    //Verificar se existe o usuario

    if(!user){
        res.status(404).json({erros:["Usuario nao encontrado"]})
        return
    }

    //Verificar a password
    if(!(await bcrypt.compare(password,user.password))){
        res.status(422).json({erros:["Senha Invalida"]})
        return
    }

    //Retornar o usuario e Token
    res.status(201).json({
        _id:user._id,
        profileImage:user.profileImage,
        token: generateToken(user._id),

    })
};

//Get current logged in user

const getCurrentUser =async =(req,res) =>{
    const user =req.user;

    res.status(200).json(user);
};
//Update an user
const update =async(req,res)=>{

 const {name,password,bio} =req.body
 let profileImage = null

 if(req.file){
    profileImage = req.file.filename
 }
  const reqUser = req.user

  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password")

  if(name){
    user.name= name
  }

  if(password){
    //GENERATE PASSWORD HASH
    
    const salt = await bcrypt.getSalt();
    const passwordHash =await bcrypt.hash(password,salt);

    user.password= passwordHash

    if(profileImage){
        user.profileImage = profileImage
    }

    if(bio)
    {
        user.bio=bio
    }

    await user.save();

    res.status(200).json(user);

  }
}

//Get user by id 

const getUserById =async(req,res)=>{
    const {id}= req.params

   try {
         const user =await User.findByID(mongoose.Types.ObjectId(id).select("-password"));

         //check if user exists

    if(!user){
        res.status(404).json({erros:["Usuario nao encontrado"]});
        return;
    }
    res.status(200).json(user);
    
   } catch (error) {
      res.status(404).json({erros:["Usuario nao encontrado"]});
   }

    
};


//Exportar um objecto
module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
}