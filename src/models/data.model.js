import mongoose from "mongoose";

export const dataSchema= new mongoose.Schema({
    text:{type:String,requied:true},
    
})

export const Data = mongoose.model("data",dataSchema)