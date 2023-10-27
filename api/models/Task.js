const { DataTypes } = require("sequelize");
const { sq } = require("../postgresql");

const Task = sq.define("Task", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  listId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

// Task.sync()
//   .then(() => {
//     console.log("Task Model synced");
//   })
//   .catch((err) => {
//     console.log("Error in Task model");
//   });

module.exports = Task;
