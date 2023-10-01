//Faremos a configuracao de Todads Rotas da Nossa Aplicacao 
//Utilizando a arquitectura MVC(onde teremos Models,Views e Controlres)

const express =require('express') //Fazemos a importacao do Express

const router =express() //Chamamos o Metodo express no router


router.use("/api/users",require("./UserRouts"));
router.use("api/photos",require("./PhotosRouter"))
//Teste da Rota

router.get("/",(req,res)=>{
    res.send("API WORKING")
});

module.exports =router // E exportamos as Routas