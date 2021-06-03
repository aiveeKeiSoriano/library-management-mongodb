const mongoose = require("mongoose")
const Member = require("../models/member")

const printAllMembers = async () => {
  console.log("\nMembers:\n");
  let members = await Member.find();
  if (members.length === 0) {
    console.log("There are no members saved");
  }
  members.map((el) => console.log(el.name, "|", el.memberId));
}

const addMember = async (name) => {
  const member = new Member({ name: name });
  try {
    await member.save();
    console.log("\nAdded Successfully!");
  } catch (e) {
    console.log(e);
  }
}

const deleteMember = async (id) => {
  let member = await Member.findOne({ memberId: id });
  if (!member) {
    console.log("\nMember not found, please recheck the id");
    return;
  }
  else {
    await Member.deleteOne({ memberId: id }, function (err) {
      if (err) {
        console.log(err);
      }
      else console.log("\nDeleted Successfully!");
    });
  }
}

const searchMembers = async (name) => {
  let list = await Member.find({ name: { "$regex": name, "$options": "i" } })
  console.log('\n')
  if (list.length === 0) console.log('Member not found')
  else list.map(el => console.log(el.name, "|", el.memberId))
}

module.exports = {
    printAllMembers,
    addMember,
    deleteMember,
    searchMembers
};