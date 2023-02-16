import userModel from "../models/user.model.js";
import client from "../config/database.js";
import jwt from 'jsonwebtoken'

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
  const LoginData = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    // Get user input
    const { email, password } = LoginData;

    // Validate user input
    if (!(email && password)) {
      res.status(400).render("pages/index", { title: "Invalid!"})
    }

    // Check if user exists
    const { rows } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (rows.length > 0 && rows[0].password === password) {
      // Create JWT token
      const token = jwt.sign(
        { user_id: rows[0].id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      res.status(200).render("pages/index", { title: email });
    } else {
      res.status(400).render("pages/index", { title: "Invalid!"})
    }
  } catch (err) {
    console.log(err);
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
