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
  let id = mongoose.mongo.ObjectID(input)
  let categories = await Category.findOne({ _id: id });
  let response = ''
  if (!categories) {
    return 404
  }
  else {
    await Category.deleteOne({ _id: id }, function (err) {
      if (err) {
        response = 500
      }
      else {
        console.log('deleted')
        response = 201
      }
    });
  }
  return response
};

const allCategories = async () => {
  let categories = await Category.find();
  return categories
}

module.exports = {
  printAllCategories,
  addCategory,
  deleteCategory,
  allCategories
};
