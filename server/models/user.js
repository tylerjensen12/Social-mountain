const { DataTypes } = require("sequelize");
const {db} = require("../util/database");

module.exports = {
  User: db.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING },
    hashedPass: { type: DataTypes.STRING },
  }),
};
