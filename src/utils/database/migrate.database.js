require("dotenv").config("../../../.env");
const { exec } = require("child_process");

// ==========================================================

const command = `mysql -u ${process.env.DB_USER} -p ${process.env.DB_NAME} < ./src/utils/database/migrations.sql `;

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
