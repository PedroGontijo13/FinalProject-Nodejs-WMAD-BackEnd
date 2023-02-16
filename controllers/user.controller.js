import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  userModel.getUsers((err, users) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ users });
    }
  });
};

const createUsersTable = async (req, res) => {
  userModel.createUsersTable((err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send("Table created");
    }
  });
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findByEmail(email);

    if (user.password !== password) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ email: req.body.email }, process.env.TOKEN_KEY);
    console.log(req.session); 
    req.session.token = token;

    // Save the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
      secure: process.env.NODE_ENV === 'production'
    });
    return res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    return res.render("pages/index", { title: "An error occurred" });
  }
};

const createUser = async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  userModel.createUser(newUser, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log({ user });
    }
  });
};

export default { getUsers, createUsersTable, createUser, LoginUser };
