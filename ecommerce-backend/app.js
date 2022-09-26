const express = require("express");
const mongoose = require("mongoose");
//morgan is a Node. js and Express middleware to log HTTP requests and errors, and simplifies the process.
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
/*
CORS is shorthand for Cross-Origin Resource Sharing. It is a mechanism to allow 
or restrict requested resources on a web server depend on where the HTTP request was initiated. 
This policy is used to secure a certain web server from access by other website or domain
*/
const cors = require('cors');
const expressValidator = require('express-validator');
// to use .env file
require("dotenv").config();
//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

const app = express();

//connect to mongo cloud
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});