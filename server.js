import express from "express";
import bodyParser from "body-parser";
import UserRoute from "./routes/user.route.js";
import indexRoute from "./routes/index.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import session from "express-session";

const app = express();

// Set up the EJS template engine
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.TOKEN_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use("/", indexRoute);

app.use("/dashboard", dashboardRoutes);

//User router
app.use("/user", UserRoute);

app.listen("3001");
