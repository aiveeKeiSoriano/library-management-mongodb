const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router
  .route("/")
  .get(async (req, res) => {
    let category = await categoryController.allCategories();
    res.json(category);
  })
  .post(async (req, res) => {
    console.log(req.body)
    let { name } = req.body;
    await categoryController.addCategory(name);
    let category = await categoryController.allCategory();
    // res.render("books", { books: books });
  });

router.delete("/:categoryID", async (req, res) => {
  let response = await bookController.deleteCategory(req.params.categoryID);
  res.status(response)
  res.end()
});

module.exports = router;
