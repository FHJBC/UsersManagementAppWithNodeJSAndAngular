import { Router } from "express";
import { adminBoard, allAccess, create, deleteAll, deleteOne, findAll, findOne, update, userBoard } from "../controllers/user.controller.js";
import { isAdminOrUser, verifyToken, verifyTokenAndAdmin } from "../middlewares/authJwt.js";

const router = Router();

export default function (app) {

  // Create a new User
  router.route("/")
    .post(create);

  // Retrieve all Users
  router.get("/", verifyTokenAndAdmin, findAll);

  // Retrieve a single User with id
  router.get("/:id", verifyToken, findOne);

  // Update a User with id
  router.put("/:id", [verifyToken, isAdminOrUser], update);

  // Delete a User with id
  router.delete("/:id", [verifyToken, isAdminOrUser], deleteOne);

  // Delete all Users
  router.delete("/", verifyTokenAndAdmin, deleteAll);

  app.use('/api/users', router);

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/all", allAccess);

  app.get(
    "/api/user",
    verifyToken,
    userBoard
  );

  app.get(
    "/api/admin",
    verifyTokenAndAdmin,
    adminBoard
  );
};