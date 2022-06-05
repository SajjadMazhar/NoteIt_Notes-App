const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")
const router = require('express').Router();
const jwt = require("jsonwebtoken")
const verifyToken = require("../middlewares/jwt.middleware")

router.post("/signup", async(req, res)=>{
    const {name, email, password, confirmPassword, dob} = req.body
    if(!(name && email && password && confirmPassword && dob)){
      return res.status(400).json({title:"error occured", msg:"please fill all the input fields"})
    }
    if(!(password===confirmPassword)){
      return res.status(400).json({title:"error occured", msg:"password is not matching"})
    }
    try {
      const salt = await bcrypt.genSalt(8)
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = await prisma.user.create({
        data:{
          name, email, password:hashedPassword, dob
        }
      })
      const token = jwt.sign({id:user.id}, process.env.SECRET, {expiresIn:"24h"})
      res.status(201).json({
        title:"created", token
      })
    } catch (error) {
      res.status(500).json({
        title:"something wrong", err:error.message
      })
    }
})

router.post("/signin", verifyToken, async (req, res)=>{
  const {email, password} = req.body
  if(!(email && password)){
    return res.status(400).json({title:"error", msg:"please input email and password"})
  }
  try {
    const user = await prisma.user.findUnique({
      where:{
        email
      }
    })
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if(!isPasswordMatched){
      return res.status(403).json({title:"login error", msg:"invalid email or password"})
    }
    const token = jwt.sign({id:user.id}, process.env.SECRET)
    res.status(200).json({title:"success", token})
  } catch (error) {
    res.status(500).json({title:"error", err:error.message}) 
  }
})

router.patch("/updatepassword", verifyToken, async(req, res)=>{
  const {oldPassword, newPassword} = req.body
  if(!(oldPassword && newPassword)){
    return res.status(400).json({title:"fill all the inputs"})
  }
  try {
    const user = await prisma.user.findUnique({
      where:{
        id:req.id
      }
    })
    const isOldPassMatched = await bcrypt.compare(oldPassword, user.password)
    if(!isOldPassMatched) return res.status(403).json({title:"old password is wrong"});
    const salt = await bcrypt.genSalt(8)
    const newHashedPass = await bcrypt.hash(newPassword, salt)
    await prisma.user.update({
      where:{
        id:req.id
      },
      data:{
        password:newHashedPass
      }
    })
    res.json({title:"success", msg:"password updated"})

  } catch (error) {
    res.status(500).json({title:"error", err:error.message})
  }
})
module.exports = router;

// user routes completed almost