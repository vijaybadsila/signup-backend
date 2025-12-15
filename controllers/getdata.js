const userdata = require("../models/userdata")
exports.getdata=async(req,res)=>{
        try{
           const Response=await userdata.find({})
           res.status(200).json({
            success:true,
            data:Response,
            message:"Get All Data"
           })
        }catch(err){
console.error(err);
console.log(err);
   res.status(200).json({
            success:false,
            data:null,
            message:"something went wrong"
           })
        }
}