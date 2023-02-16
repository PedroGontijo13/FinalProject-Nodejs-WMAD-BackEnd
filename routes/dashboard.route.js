import { Router } from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = Router()

router.get("/", async (req, res) => {
  try {
    const decoded = jwt.verify(req.session.token, process.env.TOKEN_KEY);
    console.log(decoded)
    const user = await User.findByEmail(decoded.email);

    res.render("pages/dashboard", { user });
  } catch (err) {
    console.error(err);
    res.render("pages/index", { title: "An error occurred" });
  }
});

export default router