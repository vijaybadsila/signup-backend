const userdata = require("../models/userdata");
exports.CreateData=async(req,res)=>{
try{
const{name,email,title,Department,Role}=req.body;
     const Response= await userdata.create({
        name,
        email,
        title,
        Department,
        Role
      })
      res.status(200).json({
        success:true,
        data:Response,
        message:"User Created"
      })
}
catch(err){
console.error(err);
console.log(err);
    res.status(500).json({
        success:false,
        data:null,
        message:"Internal Server Error"
      })

}
}