const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/dps")
    },
    filename:(req, file, cb)=>{
        const newName = Math.round(Math.random()*1E9) + file.originalname
        cb(null, newName)
    }
})

const upload = multer({storage})
module.exports = upload