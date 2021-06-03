const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        required: true,
    },
    member: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Member',
        required: true,
    },
    issued: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true, });

const IssueModel = new mongoose.model('Issue', IssueSchema)

module.exports = IssueModel