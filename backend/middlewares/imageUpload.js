const multer = require("multer") // Metodo para upload de imagens(multer)

const path =require("path")

//Metodo para ver onde a imagem sera salva

const imageStore =multer.diskStorage({
    destination: (req,file,cb)=>{
        let folder = ""

        if(req.baseUrl.includes("users")){
            folder ="users"

        }else if(req.baseUrl.includes("photos")){
            folder="photos"
        }
        cb(null,`uploads/${folder}/`)
    },
    filename:(req,file,cb) =>{
           cb(null,Date.now() + path.extname(file.originalname))
    }

})

const imageUpload =multer({
    storage: imageStore,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){

            return cb(new Error("Por Favor,envie apenas png ou jpg!"))
        }
           cb(undefined,true)
    }
})

module.exports ={imageUpload};