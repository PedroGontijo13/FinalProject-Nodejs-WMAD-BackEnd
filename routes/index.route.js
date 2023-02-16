import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("pages/index", { title: "My EJS Page" });
});

router.get('/logout', (req, res) => {
  // destroy the user session and redirect to home page
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

export default router;