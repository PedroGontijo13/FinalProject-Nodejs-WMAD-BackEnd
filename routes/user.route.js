import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get("/", (req, res) => {
  userController.createUsersTable();
  res.render("pages/index", { title: "User" });
});

router.get('/form', (req, res) => {
  res.render('pages/createUser', { title: 'Create User'})
})

router.post("/", (req, res) => {
  userController.createUser(req)
  res.render("pages/index", { title: "User" });
});

export default router;