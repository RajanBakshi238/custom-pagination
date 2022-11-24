const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name is required']
    },
    description: String,
    category: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item