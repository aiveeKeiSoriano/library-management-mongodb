const mongoose = require("mongoose");
const Book = require("../models/book");
const Category = require("../models/category");

const categoryController = require('./categoryController')

const printAllBooks = async () => {
  console.log("\nBooks:");
  let books = await Book.find();
  if (books.length === 0) {
    console.log("There are no books saved");
  }
  books.map((el) => console.log(el.name, "|", el.authors.join(', ')));
};

const addBook = async (name, price, category, authors) => {
    let categories = await Category.findOne({ name: category })
    if (!categories) {
        console.log('\nInvalid Category')
        console.log('\nHere are the categories available:')
        await categoryController.printAllCategories()
        return
    }
  const book = new Book({ name: name, price: Number(price), category: categories._id, authors: authors.split(',') });
  try {
    await book.save();
    console.log("\nAdded Successfully!");
  } catch (e) {
    console.log(e.errors);
  }
};

const deleteBook = async (input) => {
  let books = await Book.findOne({ name: input });
  if (!books) {
    console.log("\nInvalid Book name");
    return;
  } else {
    await Book.deleteOne({ name: input }, function (err) {
      if (err) {
        console.log(err);
      } else console.log("\nDeleted Successfully!");
    });
  }
};

const searchBook = async (input) => {
    let list = await Book.find({ name: { "$regex": input, "$options": "i" } })
    console.log('\n')
    if (list.length === 0) console.log('Book not found')
    else list.map(el => console.log(el.name, "|", el.authors.join(', ')))
}

const bookAtCategory = async (input) => {
  let categories = await Category.findOne({ name: input })
  if (!categories) {
      console.log('\nInvalid Category')
      console.log('\nHere are the categories available:')
      await categoryController.printAllCategories()
      return
  }
  let list = await Book.find({ category: categories.id })
  if (list.length === 0) {
    console.log("\nThere are no books in that category")
  }
  else {
    console.log("\nHere are all the books in that category\n")
    list.map(el => console.log(el.name, "|", el.authors.join(', ')))
  }
}

const allBooks = async () => {
  let books = await Book.find();
  return books
}

module.exports = {
  printAllBooks,
  addBook,
  deleteBook,
  searchBook,
  bookAtCategory,
  allBooks
};
