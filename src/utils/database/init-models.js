import sequelize from "./sequelize.database";
import _sequelize from "sequelize";

// ------------------------------------------------------

const DataTypes = _sequelize.DataTypes;

// ------------------------------------------------------
// Models

import _users from "../../entities/users/users.model.js";

// ------------------------------------------------------

const initModels = (sequelize) => {
  const users = _users(sequelize, DataTypes);
  return {
    users,
  };
};

// ------------------------------------------------------

const models = initModels(sequelize);

// ------------------------------------------------------

export default models;
