export const getAllBootcamps = async (req, res, next) => {
  try {
    new Throw("wrong");
    res.send({ success: true, data: "working!!!" });
  } catch (error) {
    const err = { success: false, status: 404, error: error.message };
    next(err);
  }
};
