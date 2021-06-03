const mongoose = require("mongoose");
const Category = require("../models/category");

const printAllCategories = async () => {
  console.log("\nCategories:");
  let categories = await Category.find();
  if (categories.length === 0) {
    console.log("There are no categories saved");
  }
  categories.map((el) => console.log("-", el.name));
};

const addCategory = async (input) => {
  const category = new Category({ name: input });
  try {
    await category.save();
    console.log("\nAdded Successfully!");
  } catch (e) {
    console.log(e);
  }
};

const deleteCategory = async (input) => {
  let categories = await Category.findOne({ name: input });
  if (!categories) {
    console.log("\nInvalid category name");
    return;
  } else {
    await Category.deleteOne({ name: input }, function (err) {
      if (err) {
        console.log(err);
      } else console.log("\nDeleted Successfully!");
    });
  }
};

module.exports = {
  printAllCategories,
  addCategory,
  deleteCategory,
};
