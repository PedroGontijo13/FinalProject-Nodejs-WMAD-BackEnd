import client from "../config/database.js";

const createFoundPetsTable = (callback) => {
  const query = `
      CREATE TABLE IF NOT EXISTS foundpets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL,
        reward VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
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

const getPets = async (callback) => {
    const query = 'SELECT * FROM foundpets';
    const { rows } = await client.query(query);
    return rows;
};

function getPetsById(id) {
  const query = {
    text: "SELECT * FROM foundpets WHERE id = $1",
    values: [id],
  };

  return client.query(query).then((res) => {
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return res.rows[0];
  });
}

const createFoundPet = (pet, callback) => {
  const query =
    "INSERT INTO foundpets (id, name, color, reward, location) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *";
  const values = [pet.name, pet.color, pet.reward, pet.location];

  client.query(query, values, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

export default {
    createFoundPetsTable,
    createFoundPet,
    getPetsById,
    getPets
};
