import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/auth.config.js";
import db from "../models/index.js";
const User = db.user;

export const verifyToken = (req, res, next) => {

  const token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    req.userId = decoded.id;

    next();
  });
};

export const verifyTokenAndAdmin = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      const user = await User.findByPk(req.userId);

      const roles = await user.getRoles();

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].dataValues.name === "admin") {
          return next();
        }
      }

      return res.status(403).send({
        message: "Require Admin Role!",
      });

    } catch (error) {
      return res.status(500).send({
        message: "Unable to validate User role!",
      });
    }
  });

};

export const isAdminOrUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin" || roles[i].name === "user") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

const authJwt = {
  verifyToken,
  verifyTokenAndAdmin,
  isAdminOrUser
};

export default authJwt;
