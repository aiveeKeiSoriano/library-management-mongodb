const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    memberId: {
        type: String,
        unique: true,
        default: Date.now
    },
    // books: {
    //     type: [mongoose.SchemaTypes.ObjectId],
    //     ref: 'Book',
    // },
}, {timestamps: true, });

const MemberModel = new mongoose.model('Member', MemberSchema)

module.exports = MemberModel