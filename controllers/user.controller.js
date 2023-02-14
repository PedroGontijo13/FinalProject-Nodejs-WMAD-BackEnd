import userModel from "../models/user.model.js";

const getUsers = (req, res) => {
  userModel.getUsers((err, users) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ users });
    }
  });
};

const createUsersTable = (req, res) => {
  userModel.createUsersTable((err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send("Table created");
    }
  });
};

const createUser = (req, res) => {
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

export default { getUsers, createUsersTable, createUser };
