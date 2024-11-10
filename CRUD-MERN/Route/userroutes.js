const express=require("express");
const router=express.Router();

//insert model
const User=require("../Model/usermodel")
//insert user controllers
const UserController=require("../Controlers/usercontroll");


router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);


module.exports = router;