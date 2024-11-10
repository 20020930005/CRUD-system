const mongoose=require("mongoose"); //connect mongose
const Schema=mongoose.Schema;

const regiSchema=new mongoose.Schema(
  {
    username:{
      type:String,//datatype
      required:true,//validate
    },

    email:{
      type:String,//datatype
      required:true,//validate
      
    },


    password:{
      type:String,//datatype
      required:true,//validate
      
    }



  }
);

module.exports=mongoose.model(
  "Registermodel",//filename
  regiSchema //function name
)
