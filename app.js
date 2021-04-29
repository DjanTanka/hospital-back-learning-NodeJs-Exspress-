const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const apiRoutes = require('./src/modules/routes/routes');
app.use('/', apiRoutes); 

const uri = "mongodb+srv://TatianaDjan:i5WtR3kenNaB8rG@cluster0.v0ees.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());

app.listen(8000, () => {
  console.log('Server has been started on port 8000....' )
})