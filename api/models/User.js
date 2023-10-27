const { DataTypes } = require("sequelize");
const { sq } = require("../postgresql");

const User = sq.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// (async () => {
//   await sq.sync({ force: true });
//   // Code here
// })();

// User.sync()
//   .then(() => {
//     console.log("User Model synced");
//   })
//   .catch((err) => {
//     console.log("Error in User model");
//   });

module.exports = User;
