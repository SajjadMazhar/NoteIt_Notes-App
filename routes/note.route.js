const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const router = require('express').Router();
const verifyToken = require("../middlewares/jwt.middleware")

// accepts {title, content, color } userId by authentication
// POST /api/note
router.post("/", verifyToken, async(req, res)=>{
    const {title, content, color=""} = req.body
    const userId = req.id
    if (!(title && content)){
        return res.status(400).json({title:"error", msg:"title and content are required"})
    }
    try {
        const note = await prisma.note.create({
            data:{
                title,content,color,userId
            },
        })   
        res.status(201).json({title:"created", note})
    } catch (error) {
        res.status(500).json({title:"internal server error", err:error.message})
    }
})

// GET /api/note
router.get("/", verifyToken, async(req, res)=>{
    const userId = req.id
    try {
        const notes = await prisma.note.findMany({
            where:{
                userId
            },
            include:{
                user:true
            }
        })
        res.status(200).json({title:"success", notes})
    } catch (error) {
        res.status(500).json({title:"internal server error", err:error.message})
    }
})

// accepts {title, content} and noteId from params
// PATCH /api/note

router.patch("/:noteId", verifyToken, async(req, res)=>{
    const {title, content} = req.body
    const id = req.params.noteId
    if(!(title && content)){
        return res.status(400).json({title:"bad request", msg:"fill all the required inputs"})
    }
    if(!id){
        return res.status(400).json({title:"bad request", msg:"missing note id"})
    }
    try {
        const note = await prisma.note.update({
            where:{
                id:parseInt(id)
            },
            data:req.body
        })
        res.json({title:"update success", note})
    } catch (error) {
        res.status(500).json({title:"internal server error", err:error.message})
    }
})

// DELETE /api/note

router.delete("/:noteId", verifyToken, async(req, res)=>{
    const id=req.params.noteId
    if(isNaN(parseInt(id))){
        return res.status(400).json({title:"internal server error", msg:"missing note id"})
    }
    try {
        const note = await prisma.note.delete({
            where:{
                id:parseInt(id)
            }
        })
        res.status(200).json({title:"success", note})
    } catch (error) {
        res.status(500).json({title:"internal server error", err:error.message})
    }
})
module.exports = router