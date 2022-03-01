import sequelize from "./sequelize.database.js";

// ===================================================

const databaseConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
};

// ===================================================

export default databaseConnect;
