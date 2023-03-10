import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { secret } from "../config/auth.config.js";
import { create } from "../controllers/user.controller.js";
import db from "../models/index.js";


const { compareSync } = bcryptjs;
const { sign } = jwt;

const User = db.user;

export const signup = async (req, res) => {
  await create(req, res);
}

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = sign({ id: user.id }, secret, {
      expiresIn: 86400, // 24 hours
    });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;
    req.session.userId = user.id;
    req.session.username = user.username;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function signout(req, res) {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
}