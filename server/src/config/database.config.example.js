export const DB_HOST = "your db host here"; // example: "localhost"
export const DB_USER = "your db username here"; // par défaut c'est "root" pour la BDD MySQL
export const DB_PASSWORD = "your db password here"; // par défaut vide "" pour MySQL
export const DB_NAME = "your database name here";
export const dialect = "mysql"; // exemple: "mysql; postgresql; sqlite; ...
export const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};