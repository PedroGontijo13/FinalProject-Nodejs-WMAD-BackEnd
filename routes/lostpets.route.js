import { Router } from "express";
import lostPetsController from "../controllers/lostpets.controller.js";

const router = Router();

router.get("/", (req, res) => {
  lostPetsController.createLostPetsTable();
  res.send(200);
});

router.get("/getPets", (req, res) => {
  lostPetsController.getPets(req, res);
});

router.post("/", (req, res) => {
  lostPetsController.createPet(req);
  res.send(200);
});

export default router;