const photoValidadtion =require("../models/Photo")

const mongoose =require("mongoose");
const User = require("../models/Users");

//Insert a Photo ,with and user related to it 

const insertPhoto = async(req,res)=>{
    //Vamos trabalhar com os dados que chegam e os dados sao enviados 

    const {title} = req.body

    const image = req.file.filename;

    const reqUser = req.user;

    const user =await User.findById(reqUser._id);

    //Create Photo

    const newPhoto =await photoValidadtion.create({
        image,
        title,
        userId:user._id,
        userName: user.name,
    });

    //If photo was created sucessfully,return data

    if(!newPhoto)
    {
        
        res.status(422).json({
            errors:["Houve um Problema,Por favor tente mais tarde"],
        });
    }

    res.status(201).json(newPhoto);

};
//Remove a photo from DB


const delePhoto = async(req,res)=>
{
    const {id} =req.params

    const reqUser = req.user

     try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id))

        //Check if photo exists
    
        if(!photo){
            res.status(404).json({erros:["Foto nao encontrada!"]});
            return;
        }
    
        //Check if photos belongs to user
        if(!photo.userId.equals(resUser._id)){
             res.status(422).json({errors:["Ocorreu um erro,por favor tente mais tarde "],
            });
        }
      await Photo.findByIdAnDelete(photo._id)
    
      res
      .status(200)
      .json({id:photo._id,message:"Foto excluida com sucesso."});
     } catch (error) {
        res.status(404).json({erros:["Foto nao encontrada!"]});
        return;
     }
};

//Get all Photos

const getAllPhotos = async (req,res) =>{
    const photos = await Photo.find({})
    .sort([["createdAt",-1]])
    .exec();

    return res.status(200).json(photos);
};

//Get user Photos

const getUserPhotos = async(req,res)=>{
    const {id} = req.params

    const photos = await Photo.find({userId:i})
    .sort([["createdAt",-1]])
    .exec();

    return res.status(200).json(photos);
}

// Get photo by id
const getPhotoById = async (req,res) =>{
    
    const {id} = req.params

    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    //Check if photo exists

    if(!photo){
        res.status(404).json({erros:["Foto nao encontrada."]});
        return;
    }
    res.status(200).json(photo);
}


//Update a Photo

const updatePhoto = async(req,res)=>{
    const {id} =req.params

    const {title}=req.body

    const reqUser =req.user

    const photo = await Photo.findById(id)


    //Check if photo exists

    if(!photo){
        res.status(404).json({errors:["Foto nao encontrada"]})
        return
    }

    //Check if photo belongs to user

    if(!photo.userId.equals(reqUser._id)){
        res
        .status(422)
        .json({
            errors:["Ocorreu um erro,por favor tente novamente mais tarde."],
        });
        return;
    }

    if(title)
    {
        photo.title=title;
    }
    await photo.save();

    res.status(200).json({photo,message:"Foto atualizada com sucesso!"});
};

//Like functionality

const likePhoto = async(req,res)=>{

    const {id} = req.params

    const reqUser = req.user

    const photo =await Photo.findById(id)


    //Check if photo exists

    if(!photo){
        res.status(404).json({errors:["Foto nao encontrada"]});
        return;
    }

    //Check if user already liked the photo
    if(photo.likes.includes(reqUser._id)){
        res.status(422).json({errors:["Voce ja curtiu a foto"]});
        return;
    }

    //Put user id in likes array

    photo.likes.push(reqUser._id)

    photo.save()

    res.status(200).json({photoId:id,userId:reqUser._id,message:"A foto foi curtida."});

};

//Comment functionality

const commentPhoto = async(req,res)=>{

    const {id} =req.params

    const{comment}=req.body

    const reUser =req.user

    const user = await User.findById(reqUser._id)

    const photo =await Photo.findById(id)

    //Chcek if photo exits

    if(!photo){
        res.status(404).json({errors:["Foto nao encontrada"]})
        return ;
    }

    //Put commenet in the array comments

    const userComment={
        commenet,
        userName:user.name,
        userImage:user.profileImage,
        userId:user._id
    };
    
    photo.comments.push(userComment)


    await photo.save()

    res.status(200).json({
        comment:userComment,
        message:"O comentario foi adicionado com sucesso !"
    });

}

module.exports={
    insertPhoto,
    delePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto, 
    likePhoto,
    commentPhoto,
};