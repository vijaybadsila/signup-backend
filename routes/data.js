const express=require("express");
const { CreateData } = require("../controllers/CreateData");
const { getdata } = require("../controllers/getdata");
const { deleteData } = require("../controllers/delete");
const { Logindata } = require("../controllers/Logindata");
const { signin } = require("../controllers/sigin");
const router=express.Router();


router.post("/Add",CreateData)
router.get("/",getdata)
router.delete("/delete/:id",deleteData)
router.post("/login",Logindata)
router.post("/signin",signin)
module.exports=router;