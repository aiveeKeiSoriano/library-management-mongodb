const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.route("/").get( async (req, res) => {
    let categories = await categoryController.allCategories()
    console.log(categories)
    res.render('add', {categories: categories})
});

module.exports = router;
