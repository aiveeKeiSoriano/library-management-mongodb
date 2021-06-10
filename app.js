const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();
app.use(morgan("dev"));
app.set('view engine', 'pug')
app.use(express.static('static'))
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('connected'))

// let morgan2 = (req, res, next) => {
//     next()
//     console.log(req.method, req.url, res.statusCode)
// }

// app.use(morgan2)

// app.all(/.*/, (req, res, next) => {
//     console.log(req.method, req.url, res.statusCode)
//     next()
// })

app.get("/", (req, res) => {
  res.redirect('/books')
//   res.send("Welcome to the Library!");
});

const addRouter = require('./routes/add')
const bookRouter = require('./routes/books')
const authRouter = require("./routes/auth")

app.use('/books', bookRouter)
app.use('/add', addRouter)
app.use('/auth', authRouter)

app.get(/.*/, (req, res) => {
  res.statusCode = 404
  res.send("Are you lost baby girl");
});

const PORT = 3300;
app.listen(PORT, () => {
  console.log("server is listening at http://localhost:" + PORT);
});
