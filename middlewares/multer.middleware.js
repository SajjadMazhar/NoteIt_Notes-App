const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "client/build/dps")
    },
    filename:(req, file, cb)=>{
        const newName = Math.round(Math.random()*1E9) + path.extname(file.originalname)
        cb(null, newName)
    }
})

const upload = multer({storage})
module.exports = upload