import sequelizeOrm from "./orms/sequelize.orm.js";
import crudRouter from "./router/crud.router.js";

export const sequelizeCrud = sequelizeOrm;
export const crud = crudRouter;
