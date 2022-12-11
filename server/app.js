const mongoose = require("mongoose");
const express = require("express");
var morgan = require('morgan')
var cors = require('cors')
const itemController = require('./controllers/itemController')
const formController = require('./controllers/formController')

const PORT = 3800;
const app = express();
const router = express.Router();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


app.route("/tasks").get(itemController.getAllItems)
app.route("/tasks").post(itemController.createItem)
app.route("/form").post(formController.upload.single('testImage'), formController.createFormData )


mongoose
  .connect(
    "mongodb+srv://rajanbakshi:varunbakshi12345@cluster0.ddwcd3n.mongodb.net/custom_pagination?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((con) => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err, '...........')
    console.log("Network or Connection error");
  });

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

// mongodb+srv://rajanbakshi:varunbakshi12345@cluster0.ddwcd3n.mongodb.net/custom_pagination?retryWrites=true&w=majority
