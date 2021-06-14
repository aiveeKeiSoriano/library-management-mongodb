const express = require("express");

const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "static/images/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const multipart = multer({ storage: storage })

const jwt = require("jsonwebtoken")

const router = express.Router();
const userController = require("../controllers/userController");

router.post('/signup', multipart.single("picture"), async (req, res) => {
    console.log(req.file)
    console.log(req.body)
    req.body.picture = req.file?.filename
    let result = await userController.addUser(req.body)
    if (result.status) {
        res.status(201).send(result.result)
    }
    else {
        res.status(401).send(result.result)
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body)
    let result = await userController.login(req.body)
    if (result.status) {
        let payload = {
            email: result.result.email,
            iat: Date.now()
        }
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
        console.log(token)
        res.status(200).send({ access_token: token })
    }
    else {
        res.status(401).send(result.result)
    }
})

module.exports = router;