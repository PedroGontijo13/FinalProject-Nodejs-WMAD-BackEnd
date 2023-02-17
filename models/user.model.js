import client from "../config/database.js";

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

function getUserById(id) {
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id]
  };

  return client.query(query)
    .then(res => {
      if (res.rows.length === 0) {
        throw new Error('User not found');
      }
      return res.rows[0];
    });
}


const findByEmail = async (email) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };

  const { rows } = await client.query(query);

  return rows[0];
}

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

export default { getUsers, createUsersTable, createUser, getUserById, findByEmail };