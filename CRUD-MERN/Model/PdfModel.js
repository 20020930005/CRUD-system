const mongoose=require("mongoose"); //connect mongose
const Schema=mongoose.Schema;

const pdfSchema=new mongoose.Schema(
  {
    title:{
      type:String,//datatype
      required:true,//validate
    },

    pdf:{
      type:String,//datatype
      required:true,//validate
      
    },




  }
);

module.exports=mongoose.model(
  "PdfModel",//filename
  pdfSchema //function name
)
