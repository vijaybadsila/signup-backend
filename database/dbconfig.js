const mongoose=require("mongoose")
require("dotenv").config();
const dbconnect=()=>{
   mongoose
  .connect(process.env.MONGODB_URI)
    .then(()=>console.log("Database Connected") )
    .catch((err)=>{
        console.log("Something Databse Error ",err)
       process.exit(1);
    })
} 
module.exports=dbconnect;