//Bom as bases de Dados nao relacionais como o mongo DB nao trabalham com tabelas ,mas sim com modules ou coletions

//Nesta pagina serao feitas todas configuracoes necessarias para um user

const mongoose =require("mongoose") //importacao do Mongose DB
const {Schema} =mongoose

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    profileImage:String,
    bio:String
},{
    //Configuracaoes de Modules(Upate)

    timestamps:true
})

//Difinicao do Module do Mongoose(Modulo do Usuario)


const User = mongoose.model("User",userSchema);

//Exportar o Modulo do Usuario

module.exports=User;