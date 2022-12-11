const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    file: {
        data: Buffer,
        contentType: String,
    },
    fileName: {
        type: String,
        required: true,
    }
})

const Form = mongoose.model("Form", formSchema);

module.exports = Form;