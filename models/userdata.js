const mongoose=require("mongoose")
const nodemailer=require("nodemailer")
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    title:{
             type:String,
        required:true
    },
    Department:{
             type:String,
        required:true
    },
    Role:{
             type:String,
        required:true
    },
    createdTime:{
        type:Date,
        default:Date.now()
    }

})


UserSchema.post("save",async function (doc){
    try{
let transpote= nodemailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
      user:"vijaybadsila61@gmail.com",
      pass:"xydi fjjg jbac zfjf"
    }
})
let info =await transpote.sendMail({
    form:"vijat",to:doc.email,subject:"User Created Successfully",
    html:`<h1>Hi ${doc.name}</h1>
    <p>Thanks again for coming to the grand opening. It was very nice meeting you. ${doc._id} like
     to confirm the appointment you made to come in Saturday at 12:00 for your sibling portrait 
     session. I know your parents in Canada are going to love it!</p>`
})
console.log("info--------->",info);

    }catch(err){
        console.error(err);
        console.log(err);
        
        
    }
})
module.exports=mongoose.model("userdata",UserSchema)