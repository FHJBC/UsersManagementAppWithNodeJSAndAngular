import bcryptjs from "bcryptjs";
import Sequelize from "sequelize";
import db from "../models/index.js";


const User = db.user;
const Role = db.role;
const Op = Sequelize.Op;

const { hashSync } = bcryptjs;


export function allAccess(req, res) {
  res.status(200).send("Public Content.");
}

export function userBoard(req, res) {
  res.status(200).send("User Content.");
}

export function adminBoard(req, res) {
  res.status(200).send("Admin Content.");
}

export async function create(req, res) {

  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Save User to Database
  try {
    const user = await User.create({
      ...req.body,
      password: hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);

      if (result) res.send({ message: "User registered successfully!" });

    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while creating the User." });
  }
}

export async function findAll(req, res) {

  try {
    const users = await User.findAll();

    if (users !== null) {
      res.send({ users });
      // return res.status(200).send({
      //   users,
      // });
    } else {
      res.send("No users!");
    }

  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  }

  // User.findAll()
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving users."
  //     });
  //   });
}

export function findOne(req, res) {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
}

export function update(req, res) {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
}

export function deleteOne(req, res) {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete User with id=${id}`
      });
    });
};

export function deleteAll(req, res) {
  console.log("REQUEST SESSION", req.session);
  User.destroy({
    where: {
      id: {
        [Op.not]: req.session.userId,
      },
    },
    truncate: true
  })
    .then(data => {
      res.send({
        message: "Users deleted successfully!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete all Users`
      });
    });
}
