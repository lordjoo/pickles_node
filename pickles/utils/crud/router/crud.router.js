import { Router } from "express";
import bodyParser from "body-parser";
import controller from "../controller/crud.controller.js";

// ============================================================

/*
 * crud express router
 * params:
 *      path    : /resource  or /resource/:id
 *      orm     : orm crud operations as (sequelizeCrud)
 *      options : filter operations
 */
const crud = (path, orm, options) => {
  const router = Router();
  router.use(bodyParser.json());

  // ------------------------------------

  //  /resource
  router
    .route(path)
    .get(
      controller.getList(
        orm.getList,
        orm.search || undefined,
        options && options.filters
      )
    )
    .post(controller.create(orm.create));

  // ------------------------------------

  //  /resource/:id
  router
    .route(`${path}/:id`)
    .get(controller.getOne(orm.getOne))
    .put(controller.update(orm.update))
    .delete(controller.destroy(orm.destroy));

  return router;
};

// ============================================================

export default crud;
