import Sequelize from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, dialect as _dialect, pool as _pool } from "../config/database.config.js";
import { RoleSchema } from "../models/role.model.js";
import { UserSchema } from "../models/user.model.js";

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: _dialect,
    operatorsAliases: false,

    pool: {
      max: _pool.max,
      min: _pool.min,
      acquire: _pool.acquire,
      idle: _pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = UserSchema(sequelize, Sequelize);
db.role = RoleSchema(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.users = UserSchema(sequelize, Sequelize);

db.ROLES = ["user", "admin"];

export default db;