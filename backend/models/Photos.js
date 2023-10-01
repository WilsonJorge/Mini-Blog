const mongoose =require("mongoose")

const {Schema} =mongoose

const photoSchema =new Schema({
    image:String,
    title:String,
    likes:Array,
    comments:Array,
    userID:mongoose.isObjectIdOrHexString,
    userName:String,

},{
    timestamps:true
})

const Photo = mongoose.model("photo",photoSchema);

module.exports = Photo;