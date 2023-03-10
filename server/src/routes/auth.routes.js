import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";
import verifySignUp from "../middlewares/verifySignUp.js";

const router = Router();

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    signup
  );

  router.post("/signin", signin);

  router.post("/signout", signout);

  app.use('/api/auth', router);
};