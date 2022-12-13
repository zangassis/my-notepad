const mongoose = require('mongoose')

const Note = mongoose.model('Note', {
    title: String,
    noteText: String,
    subject: String,
    createDate: Date,
    updateDate: Date
})

module.exports = Note