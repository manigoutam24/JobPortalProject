const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Un-Authorized",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = isAdmin;
