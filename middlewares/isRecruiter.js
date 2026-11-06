const isRecruiter = async (req, res, next) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).send({
        success: false,
        message: "Un-Authorized",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = isRecruiter;
