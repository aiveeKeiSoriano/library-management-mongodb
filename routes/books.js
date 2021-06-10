const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router
  .route("/")
  .get(async (req, res) => {
    let books = await bookController.allBooks();
    res.json(books);
  })
  .post(async (req, res) => {
    console.log(req.body)
    let { name, authors, category, price } = req.body;
    await bookController.addBook(name, price, category, authors);
    let books = await bookController.allBooks();
    res.render("books", { books: books });
  });

// let bookIdHandler1 = (req, res, next) => {
//   let id = req.params.bookID;
//   if (Number(id) !== NaN && Number(id) > 0) {
//     next();
//   } else {
//     res.send("Invalid Book Id");
//   }
// };

// let bookIdHandler2 = (req, res) => {
//   console.log(req.params);
//   res.send("Book requested: " + req.params.bookID);
// };

router.delete("/:bookID", async (req, res) => {
  let response = await bookController.deleteBook(req.params.bookID);
  res.status(response)
  res.end()
});

module.exports = router;
