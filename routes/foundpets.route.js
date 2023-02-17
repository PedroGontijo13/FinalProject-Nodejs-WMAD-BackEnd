import { Router } from "express";
import foundPetsController from "../controllers/foundpets.controller.js";

const router = Router();

router.get("/", (req, res) => {
  foundPetsController.createFoundPetsTable();
  res.send(200);
});

router.get("/getPets", (req, res) => {
  foundPetsController.getPets(req, res);
});

router.post("/", (req, res) => {
  foundPetsController.createPet(req);
  res.send(200);
});

export default router;