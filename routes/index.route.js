import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("pages/index", { title: "My EJS Page" });
});

export default router;