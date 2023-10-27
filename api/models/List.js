const { DataTypes } = require("sequelize");
const { sq } = require("../postgresql");

const List = sq.define("List", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

// List.sync()
//   .then(() => {
//     console.log("List Model synced");
//   })
//   .catch((err) => {
//     console.log("Error in List model");
//   });

module.exports = List;
