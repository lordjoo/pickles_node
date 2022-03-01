require("dotenv").config("../../../.env");
const { exec } = require("child_process");

// ==========================================================

/*
sequelize-auto -o "./models" -d sequelize_auto_test -h localhost -u my_username -p 5432 -x my_password -e postgres
sequelize-auto  -o "./models" -h localhost -d centers -u root  -p 3306 --e mysql 
sequelize-auto  -o "./models" -h localhost -d center_administration -u root -x mariomario -p 3306 --e mysql 
*/

// ==========================================================

const command = `sequelize-auto  -o "./models" -h ${process.env.DB_HOST} -d ${process.env.DB_NAME} -u ${process.env.DB_USER} -x  ${process.env.DB_PASSWORD} -p 3306 --e ${process.env.DB_DIALECT} -l esmd`;


exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

// ==========================================================

/**
 *   TODO :
 *      After Create dir models
 *      take every file in it and place it as filename.models.js
 *      inside the entities/filename
 *
 *      ex :
 *          models/users.js  --- move to ---> entities/users/users.model.js
 *
 *
 *       then move  init-models to database , update all paths in it
 *
 *       add & export models variable  (sequelize is my setup to sequelize)
 *
 *       const models = initModels(sequelize);
 *
 * */

// ==========================================================
