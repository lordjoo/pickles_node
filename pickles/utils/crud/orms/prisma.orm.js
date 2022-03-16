const prismaCrud = (model) => ({
  // --------------------------------------------

  create: async (data) => model.create({ data }),

  // --------------------------------------------

  getOne: async (id) => model.findUnique({ where: { id } }),

  // --------------------------------------------

  getList: async ({ filter, limit, offset, order }) => {
    const count = model.count();
    const rows = model.findMany({
      where: filter,
      skip: offset,
      take: limit,
    });

    return Promise.all([count, rows]);
  },

  // model.findAndCountAll({
  //   limit,
  //   offset,
  //   order,
  //   where: filter,
  //   raw: true,
  // }),

  // --------------------------------------------

  update: async (id, data) => model.update({ where: { id }, data }),

  // --------------------------------------------

  destroy: async (id) => await prisma.user.delete({ where: { id } }),

  // --------------------------------------------
});

export default prismaCrud;
