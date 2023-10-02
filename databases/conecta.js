import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "Trabalho3", "root", "011000", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});