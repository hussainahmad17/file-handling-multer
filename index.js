const express = require("express")
const app = express()
const path = require("path")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
port = 1000


//storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const myUpload = multer({ storage })


//ejs
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//routes
app.get("/", (req, res) => {
    return res.render("home")
})



app.post("/upload", myUpload.single("profileImage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/")
})


app.listen(port, () => {
    console.log("App running on port ", port);
})