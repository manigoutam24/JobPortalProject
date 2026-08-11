const companyModel = require("../models/companyModel");

const createCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;

    if (!companyName || !description || !website || !location) {
      return res.status(400).send({
        success: false,
        message: "Provide all fields",
      });
    }

    const company = await companyModel.create({
      companyName,
      description,
      website,
      location,
      createdBy: req.user._id,
    });
    // await company.save();

    res.status(201).send({
      success: true,
      message: "Company created successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

const getCompany = async (req, res) => {
  try {
    const companies = await companyModel.find({ createdBy: req.user._id });
    res.status(200).send({
      success: true,
      message: "You have Companies",
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

module.exports = { createCompany, getCompany };
