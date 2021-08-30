const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const apiRoutes = require('./src/modules/routes/routes');
app.use('/', apiRoutes); 
const errorMiddleware = require('./src/middleware/error-middleware')
app.use(errorMiddleware)

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); // добавила чтоб убрать worning
const uri = 'mongodb+srv://TatianaDjan:i5WtR3kenNaB8rG@cluster0.v0ees.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(8000, () => {
  console.log('Server has been started on port 8000....' )
})