import sequelizeOrm from "./orms/sequelize.orm.js";
import crudRouter from "./router/crud.router.js";
import prismaOrm from "./orms/prisma.orm";

export const sequelizeCrud = sequelizeOrm;
export const prismaCrud = prismaOrm;
export const crud = crudRouter;
