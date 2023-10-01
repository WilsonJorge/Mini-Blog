const mongoose = require("mongoose"); //Importacao da Base de Dados

//conexao 

const dbUser = process.env.DB_USER;

 dbPassword =process.env.DB_PASS;

const conn=async () =>{
    try {
         const dbConn =await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ielahyq.mongodb.net/retryWrites=true&w=majority`);
         console.log("conectou ao Banco");
         return dbConn;
    } catch (error) {
        console.log(error);
    }
}
conn();

module.exports = conn;