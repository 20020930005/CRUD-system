const mongoose=require("mongoose"); //connect mongose
const Schema=mongoose.Schema;

const ImgSchema=new mongoose.Schema(
  {
    image:{
      type:String,//datatype
      required:true,//validate
    },
  }
);

module.exports=mongoose.model(
  "Imagemodel",//filename
  ImgSchema //function name
)