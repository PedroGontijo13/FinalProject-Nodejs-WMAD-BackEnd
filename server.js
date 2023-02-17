import express from "express";
import bodyParser from "body-parser";
import UserRoute from "./routes/user.route.js";
import indexRoute from "./routes/index.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import session from "express-session";
import lostpetRoute from './routes/lostpets.route.js'

const app = express();

// Set up the EJS template engine
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  session({
    secret: process.env.TOKEN_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", indexRoute);

app.use("/dashboard", dashboardRoutes);

app.use('/lostpet', lostpetRoute)

//User router
app.use("/user", UserRoute);

app.listen("3001");
