const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")
const router = require('express').Router();
const jwt = require("jsonwebtoken")
const verifyToken = require("../middlewares/jwt.middleware")
const upload = require("../middlewares/multer.middleware")


router.get("/", verifyToken, async(req, res)=>{
  try {
    const {name, email, dob, dp, bio} = await prisma.user.findUnique({
      where:{
        id:req.id
      }
    })
    res.json({title:"success", user:{name, email, dob, dp, bio}})
  } catch (error) {
    res.status(500).json({title:"internal server error", err:error.message})
  }
})
// POST api/user/signup
// takes {name, email, password, confirmPassword, dob} dp from multer 
router.post("/signup", upload.single("dp"), async(req, res)=>{
  console.log(req.file)
    const {name, email, password, confirmPassword, dob, bio} = req.body
    // console.log(name, email, password, confirmPassword, dob, bio)
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
          name, email, password:hashedPassword, dob, dp:req.file.path, bio
        }
      })
      const token = jwt.sign({id:user.id}, process.env.SECRET, {expiresIn:"24h"})
      res.status(201).json({
        title:"created", token, user:{
          name,email,dob:new Date(dob).toDateString(),dp:req.file.path,bio
        }
      })
    } catch (error) {
      res.status(500).json({
        title:"something wrong", err:error.message
      })
    }
})

// POST api/user/signin
// {email, password}
router.post("/signin", async (req, res)=>{
  const {email, password} = req.body
  console.log(req.body)
  if(!(email && password)){
    return res.status(400).json({title:"error", msg:"please input email and password"})
  }
  try {
    const user = await prisma.user.findUnique({
      where:{
        email
      }
    })
    if(!user){
      return res.status(400).json({title:"failed", msg:"user does not exist"})
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if(!isPasswordMatched){
      return res.status(403).json({title:"login error", msg:"invalid email or password"})
    }
    const token = jwt.sign({id:user.id}, process.env.SECRET)
    res.status(200).json({title:"success", token, user:{
        name:user.name, email:user.email, dob:new Date(user.dob).toDateString(), bio:user.bio, dp:user.dp
    }})
  } catch (error) {
    res.status(500).json({title:"error", err:error.message}) 
  }
})

// PATCH api/user/updatepassword
// {oldPassword, newPassword} userId from authentication
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
    if(!isOldPassMatched) return res.status(403).json({title:"forbidden", msg:"old password is wrong"});
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

router.patch("/bio", verifyToken, async(req, res)=>{
  const bio = req.body.bio
  try {
    const updatedBio = await prisma.user.update({
      where:{
        id:req.id
      },
      data:{
        bio
      }
    })
    res.json({title:"success", updatedBio})
  } catch (error) {
    res.status(500).json({title:"failed", msg:error.message})
  }
})
module.exports = router;

// user routes completed almost