const config = require("../config");

const getPaginationOptions = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(
    config.MAX_PAGE_SIZE,
    Math.max(1, parseInt(query.limit) || config.DEFAULT_PAGE_SIZE),
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const createPaginationResponse = (data, totalCount, page, limit) => {
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: totalCount,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

module.exports = {
  getPaginationOptions,
  createPaginationResponse,
};
