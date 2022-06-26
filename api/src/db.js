// Dependencies
require("dotenv").config();
const {Sequelize} = require("sequelize");
// Files
const modelUser = require("./models/User");
const modelSpreadsheet = require("./models/Spreadsheet");
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/abem`, {
    logging: false,
});

modelUser(sequelize);
modelSpreadsheet(sequelize);

const {User} = sequelize.models;
const {Spreadsheet} = sequelize.models;

User.hasMany(Spreadsheet);
Spreadsheet.belongsTo(User);


module.exports =
{
    ...sequelize.models,
    db: sequelize,
};