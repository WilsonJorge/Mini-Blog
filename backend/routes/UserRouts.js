const express = require("express")

const router =express.Router();

//Controler

const{register,login,getCurrentUser,update, getUserById,} =require("../controllers/Usecontroller");
const authGuard = require("../middlewares/authGuard");

//Middlewares

const validate = require("../middlewares/handleValidation");

const{ userCreateValidation,LoginValidation,} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { UserUpdateValidation } = require("../middlewares/UserValidation");
const { imageUpload } = require("../middlewares/imageUpload");
const { update } = require("../models/Users");

//Routes
router.post("/register",userCreateValidation(),validate,register);
router.post("/login",LoginValidation(),validate,login);
router.get("/profile", authGuard,getCurrentUser);
router.put("/",authGuard,UserUpdateValidation(),validate,imageUpload.single("profileImage"),update);
router.get("/:id",getUserById);


module.exports = router;