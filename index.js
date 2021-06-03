const readlineSync = require("readline-sync");
const mongoose = require("mongoose");

// let username = readlineSync.question('Your name:')
// console.log('Hi', username)

// mongodb://127.0.0.1:27017

// const Category = require("./models/category");
const categoryController = require('./controllers/categoryController')
const bookController = require('./controllers/bookController')
const memberController = require('./controllers/memberController');
const issueController = require('./controllers/issueController')

mongoose.connect("mongodb://127.0.0.1:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => showOptions())
  
async function showOptions() {

    let db = mongoose.connection;
    
    console.log("\nWelcome to the Library\n");
    console.log("Press 1 for Categories")
    console.log("Press 2 for Books")
    console.log("Press 3 for Membership")
    console.log("Press 4 for Book Issuance")
    console.log("Press 5 to exit")

    let choice = readlineSync.question("\n");

    switch (choice) {
        case '1':
            await Categories()
            break;
        case '2':
            await Books()
            break;
        case '3':
            await Members()
            break;
        case '4':
            await Issues()
            break;
        case '5':
            console.log("\nGoodbye!")
            return;
        default:
            console.log("\nInvalid choice\n")
    }
    await showOptions()
    db.close()
}

function displayCategoriesOptions() {
    console.log("\nHere are few things you can do: \n");
    console.log("1. Show categories");
    console.log("2. Add category");
    console.log("3. Delete category");
    console.log("4. Go back\n")
  }

async function Categories() {
    displayCategoriesOptions();
    let choice = readlineSync.question("Choose a number: ");
    switch (choice) {
        case "1":
            //Show categories
            await categoryController.printAllCategories()
            break;
        case "2":
            //Add categories
            let newCategory = readlineSync.question("\nWhat category do you want to add?  ");
            await categoryController.addCategory(newCategory)
            break;
        case "3":
            //Delete categories
            console.log('\nWhich category do you want to delete?\n')
            await categoryController.printAllCategories()
            let removeCategory = readlineSync.question("\n");
            await categoryController.deleteCategory(removeCategory)
            break;
        case "4":
            return;
        default:
            console.log('"\nInvalid choice\n"')
    }
    let again = readlineSync.question("")
    if (again === '') {
        await Categories()
    }
}

function displayBooksOptions() {
    console.log("\nHere are few things you can do: \n");
    console.log("1. Show books");
    console.log("2. Add book");
    console.log("3. Delete book");
    console.log("4. Find a book");
    console.log("5. See all books in a category")
    console.log("6. Go back\n")
  }

async function Books() {
    displayBooksOptions();
    let choice = readlineSync.question("Choose a number: ");
    switch (choice) {
        case "1":
            //Show books
            await bookController.printAllBooks()
            break;
        case "2":
            //Add book
            console.log("\nFill up the all the information")
            let name = readlineSync.question("Name: ");
            let price = readlineSync.question("Price: ")
            let category = readlineSync.question("Category: ")
            let authors = readlineSync.question("Authors (separated by commas): ")
            await bookController.addBook(name, price, category, authors)
            break;
        case "3":
            //Delete book
            console.log('\nWhich book do you want to delete?\n')
            await bookController.printAllBooks()
            let removeBook = readlineSync.question("\n");
            await bookController.deleteBook(removeBook)
            break;
        case "4":
            let detail = readlineSync.question("\nWhat book are you trying to find? ")
            await bookController.searchBook(detail)
            break;
        case "5":
            await categoryController.printAllCategories()
            let categoryName = readlineSync.question("\nAt which category should should we look at? ")
            await bookController.bookAtCategory(categoryName)
        case "6":
            return;
        default:
            console.log('"\nInvalid choice\n"')
    }
    let again = readlineSync.question("")
    if (again === '') {
        await Books()
    }
}

function displayMembersOptions() {
    console.log("\nHere are few things you can do: \n");
    console.log("1. Show all members")
    console.log("2. Add a member");
    console.log("3. Remove a member");
    console.log("4. Search for a member")
    console.log("5. Go back\n")
}
  
async function Members() {
    displayMembersOptions();
    let choice = readlineSync.question("Choose a number: ");
    switch (choice) {
        case "1":
            await memberController.printAllMembers()
            break;
        case "2":
            console.log("\nPlease fill out all the information needed")
            let name = readlineSync.question("Name: ")
            await memberController.addMember(name)
            break;
        case "3":
            let id = readlineSync.question("\nEnter the member id: ")
            await memberController.deleteMember(id)
            break;
        case "4":
            let searchName = readlineSync.question("\nEnter a name: ")
            await memberController.searchMembers(searchName)
            break;
        case "5":
            return;
        default:
            console.log("\nInvalid choice\n")
    }
    let again = readlineSync.question("")
    if (again === '') {
        await Members()
    }
}


function displayIssueOptions() {
    console.log("\nHere are few things you can do: \n");
    console.log("1. Show all active issues")
    console.log("2. Issue a new book");
    console.log("3. Return a book");
    console.log("4. Get Issue history of a book")
    console.log("5. Go back\n")
}

async function Issues() {
    displayIssueOptions();
    let choice = readlineSync.question("Choose a number: ");
    switch (choice) {
        case "1":
            await issueController.printAllActiveIssues()
            break;
        case "2":
            console.log("\nPlease fill out all the information needed")
            let id = readlineSync.question("Member ID: ")
            let book = readlineSync.question("Complete book name: ")
            await issueController.createIssue(id, book)
            break;
        case "3":
            let memberid = readlineSync.question("Please enter your member ID: ")
            await issueController.returnIssue(memberid)
            break;
        case "4":
            let bookname = readlineSync.question("Enter the name of the book: ")
            await issueController.bookHistory(bookname)
            break;
        case "5":
            return;
        default:
            console.log("\nInvalid choice\n")
    }
    let again = readlineSync.question("")
    if (again === '') {
        await Issues()
    }
}