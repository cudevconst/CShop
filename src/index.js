const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');



const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');

const appController = require('./controller/app');
const userController = require('./controller/user')
const productController = require('./controller/product');
const cartController = require('./controller/cart');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(cors());

app.use(cookieParser('NotSoSecret'));
app.use(session({
  secret : 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Thanh cong"))
.catch((err) => console.log(err))


//cau hinh ejs

app.set("view engine", "ejs");
app.set('views', "./src/views");


// lay file o static'
app.use(express.static(__dirname + '/static'));

app.use(express.static(__dirname + '/uploads'));


//api 
app.use("/api/auth", authRouter);

app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/user", userRouter);

//controller

app.use("/", appController);

app.use("/user", userController);

app.use("/product", productController);

app.use("/cart", cartController);

app.listen(port, () => console.log(`http://localhost:${port}`))