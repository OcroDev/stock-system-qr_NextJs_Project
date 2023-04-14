import Sequelize from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();
const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USER;
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: "postgres",
});

export default sequelize;
