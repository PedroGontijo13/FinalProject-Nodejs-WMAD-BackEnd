import foundPetsModel from "../models/foundpets.model.js";

const getPets = async (req, res) => {
  const pets = await foundPetsModel.getPets();
  if (!pets) {
    res.send(500);
  } else {
    res.send(pets);
  }
};

const createFoundPetsTable = async (req, res) => {
  foundPetsModel.createFoundPetsTable((err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send("Table created");
    }
  });
};

const createPet = async (req, res) => {
  console.log(req.body);
  const newPet = {
    name: req.body.Name,
    color: req.body.Color,
    reward: req.body.Reward,
    location: req.body.City,
  };

  foundPetsModel.createFoundPet(newPet, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log({ user });
    }
  });
};

export default { getPets, createFoundPetsTable, createPet };
