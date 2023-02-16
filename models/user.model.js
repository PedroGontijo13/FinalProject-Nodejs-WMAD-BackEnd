import client from "../config/database.js";

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

const createUsersTable = (callback) => {
  const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

  client.query(query, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Created");
    }
  });
};

const getUsers = (callback) => {
  client.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.error(err.stack);
      callback(err, null);
    } else {
      callback(null, res.rows);
    }
  });
};

const getUserByUsername = async (username) => {
  const query = `
    SELECT *
    FROM users
    WHERE username = $1
  `;
  const result = await client.query(query, [username]);
  return result.rows[0];
};

const createUser = (user, callback) => {
  const query =
    "INSERT INTO users (id, name, email, password) VALUES (DEFAULT, $1, $2, $3) RETURNING *";
  const values = [user.name, user.email, user.password];

  client.query(query, values, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

export default { getUsers, createUsersTable, createUser, getUserByUsername };