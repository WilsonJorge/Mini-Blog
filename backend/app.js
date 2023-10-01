//Metodo que ira chamar a funcao Dontenv

require("dotenv").config()

const express = require("express");
const path = require("path");
const cors = require("cors");

const port =process.env.PORT;

const app = express();

//Congig JSON and form data response

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//sOLVE Cors

app.use(cors({credentials: true,origin : "http://localhost:3000"}));

//Upload de Imagens

app.use("/upload",express.static(path.join(__dirname,"/uploads")));

//Conexao de Base de Dados
require("./config/db.js");


//Routas

const router = require("./routes/Router.js");  //Chamos a Routa na camada da nossa aplicacao

app.use(router);  // E Feita o uso da rota na aplicacao


app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}`);
});