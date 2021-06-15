const express = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const multipart = multer({ storage: storage });

const jwt = require("jsonwebtoken");

const router = express.Router();
const userController = require("../controllers/userController");

let refreshTokens = [];

router.post("/signup", multipart.single("picture"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  req.body.picture = req.file?.filename;
  let result = await userController.addUser(req.body);
  if (result.status) {
    res.status(201).send(result.result);
  } else {
    res.status(401).send(result.result);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  let result = await userController.login(req.body);
  if (result.status) {
    let payload = {
      email: result.result.email,
    };
    let refresh = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    });
    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
    refreshTokens.push(refresh);
    res.status(200).send({ access_token: token, refresh_token: refresh });
  } else {
    res.status(401).send(result.result);
  }
});

router.post("/token", async (req, res) => {
  const { refresh } = req.body;
  console.log(refresh);
  if (!refresh || !refreshTokens.includes(refresh)) {
    res.status(403).send({ message: "Invalid refresh token" });
  } else {
    try {
      let user = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);
      let payload = {
        email: user.email,
      };
      let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      });
      console.log(token);
      res.status(200).send({ access_token: token });
    } catch (e) {
      res.status(403).send({ message: "Invalid refresh token" });
    }
  }
});

module.exports = router;
