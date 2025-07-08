const express = require('express')
const app = express();
const cookieparser = require('cookie-parser');
const path = require('path');
const db = require("./config/mongoose-connection");
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const userModel = require("./models/user-model");
const ownerModel = require("./models/owner-model");
const productModel = require("./models/product-model");

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname,"public")));
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
);
app.use(flash());
app.set("view engine",'ejs');


app.use("/owners",ownersRouter);
app.use("/products",productRouter);
app.use("/users",usersRouter);
app.use("/",indexRouter);


app.listen(3000);