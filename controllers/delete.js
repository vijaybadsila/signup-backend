const userdata = require("../models/userdata")

exports.deleteData=async(req,res)=>{
        try{

            const id =req.params.id;
            console.log("id--->",id);
           const data= await userdata.findById(id)
           console.log(data);
           
            if(!data){
     res.status(404).json({
                    success:false,
                    message:"user not found",
                    data:null
                })
            }  
            
                
                
           
            
           const Response=await userdata.findByIdAndDelete({_id: id})
           res.status(200).json({
            success:true,
            data:Response,
            message:"Delete  Data"
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