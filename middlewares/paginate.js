export const paginateApi = async (model, req, next, populate) => {
  try {
    let result;

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    let count = await model.countDocuments();

    let select = req.query.select;

    if (select) {
      const query = select.split(",").join(" ");
      result = await model.find().select(query).skip(startIndex).limit(limit);
    } else {
      //   if (populate === "populate") {
      result = await model
        .find()
        .populate({
          path: `${populate}`,
        })
        .skip(startIndex)
        .limit(limit);
      //   } else {
      // console.log("yes");
      // result = await model.find().skip(startIndex).limit(limit);
      //   }
    }

    let pagination = {};

    if (endIndex < count) {
      pagination.next = page + 1;
    }

    if (startIndex >= limit) {
      pagination.prev = page - 1;
    }

    pagination.count = count;

    return { success: true, pagination, data: result };
    // res.send({ success: true, pagination, data: result });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(error);
  }
};
