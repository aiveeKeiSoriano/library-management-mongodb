const mongoose = require("mongoose")
const Issue = require("../models/issue")
const Member = require("../models/member")
const Book = require("../models/book")

const printAllActiveIssues = async () => {
  let issues = await Issue.find().populate('book').populate('member');
  if (issues.length === 0) {
      console.log("\nThere are no issues right now");
      return;
    }
    console.log("\nIssues:\n");
    issues.map((el) => {
      if (el.issued) console.log(el.book.name, "|", el.member.name)
  });
}

const createIssue = async (memberId, bookName) => {
    let findMember = await Member.findOne({ memberId: memberId })
    if (!findMember) {
        console.log("Member not found, please check ID or register as a member first")
        return
    }
    let findBook = await Book.findOne({ name: bookName })
    if (!findBook) {
        console.log("There's no such book available in this library, please recheck the book name")
        return
    }
    let findMemberIssue = await Issue.findOne({ member: findMember._id })
    if (findMemberIssue) {
        if (findMemberIssue.issued) {
            console.log("You currently have a book issued to you, please return it back first before trying again")
            return
        }
    }
    let findBookIssue = await Issue.findOne({ book: findBook._id })
    if (!findBookIssue) {
        const issue = new Issue({ member: findMember._id, book: findBook._id })
        try {
            await issue.save();
            console.log("\nIssued Successfully!");
            } catch (e) {
            console.log(e);
            }
    }
    else {
        if (findBookIssue.issued) {
            console.log("Sorry the book you're trying to get is currently issued to someone else")
            return
        }
        else {
            const issue = new Issue({ member: findMember._id, book: findBook._id })
            try {
                await issue.save();
                console.log("\nIssued Successfully!");
            }
            catch (e) {
                console.log(e);
            }
        }
    }
}

const returnIssue = async (memberID) => {
    let findMember = await Member.findOne({ memberId: memberID })
    if (!findMember) {
        console.log("Member not found, please check ID")
        return
    }
    let findMemberIssue = await Issue.findOne({ member: findMember._id })
    if (!findMemberIssue) {
        console.log("We cannot find a issued book under your member ID")
    }
    else {
        try {
            await Issue.updateOne({ member: findMember._id }, { $set: { issued: false } })
            console.log("Thank you for returning the book!")
        }
        catch (e) {
            console.log(e)
        }
    }
}

const bookHistory = async (bookName) => {
    let findBook = await Book.findOne({ name: bookName })
    if (!findBook) {
        console.log("There's no such book available in this library, please recheck the book name")
        return;
    }
    let issues = await Issue.find({ book: findBook._id }).populate('member');
    if (issues.length === 0) {
        console.log("There are no issues for this book yet");
        return;
        }
    console.log("\nIssues:\n");
    issues.map((el) => console.log(el.member.name, "|", el.createdAt));
}

module.exports = {
    printAllActiveIssues,
    createIssue,
    returnIssue,
    bookHistory
};