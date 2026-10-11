const { default: mongoose } = require("mongoose");
const cloudinary = require("../config/cloudinary");
const companyModel = require("../models/companyModel");
const getDataUri = require("../utils/dataUri");

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

const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await companyModel.findById(companyId);

    if (!company) {
      return res.status(404).send({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Company fetched Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in ID API",
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    //! Fetch data from body and params
    const { companyName, description, website, location } = req.body;
    const { companyId } = req.params;

    //! validate companyID
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid company ID",
      });
    }

    //!FETCH COMPANY
    const company = await companyModel.findById(companyId);
    //! VALIDATE cOMPANY
    if (!company) {
      return res.status(404).send({
        success: false,
        message: "Company not found",
      });
    }

    // console.log("company.createdBy:", company.createdBy);
    // console.log("req.user:", req.user);
    // console.log("req.user._id:", req.user?._id);

    //! CHECK OWNERSHIP BETWEEN CREATEDBY AND EXISTING USER
    if (!company.createdBy.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this company",
      });
    }

    const updateData = {};

    if (companyName !== undefined) {
      updateData.companyName = companyName;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (website !== undefined) {
      updateData.website = website;
    }

    if (location !== undefined) {
      updateData.location = location;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    //?FETCH DATA AND UPDATE BY ID
    const comapnyUpdate = await companyModel.findByIdAndUpdate(
      companyId,
      updateData,
    );

    return res.status(200).send({
      success: true,
      message: "Company updated Successfully",
      comapnyUpdate,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in Company Update API",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).send({
        success: false,
        message: "Company id required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Company ID",
      });
    }

    const company = await companyModel.findById(companyId);
    if (!company) {
      return res.status(404).send({
        success: false,
        message: "Company not found",
      });
    }

    if (!company.createdBy.equals(req.user._id)) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to delete this company",
      });
    }

    const deleteCompany = await companyModel.findByIdAndDelete(companyId);

    return res.status(200).send({
      success: true,
      message: "Company delete Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in delete API",
    });
  }
};

const updateCompanyLogo = async (req, res) => {
  try {
    //!getID ans FILE
    const { companyId } = req.params;
    const file = req.file;

    //!validate file
    if (!file) {
      return res.status(400).send({
        success: false,
        message: "File not found",
      });
    }

    //!validate companyID
    if (!companyId) {
      return res.status(400).send({
        success: false,
        message: "Npo companty found with this ID",
      });
    }

    //!getCompany
    const company = await companyModel.findById(companyId);

    //!Validate Company
    if (!company) {
      return res.status(400).send({
        success: false,
        message: "No company Found",
      });
    }

    //!CHECH OWNERSHIP
    if (!company.createdBy.equals(req.user._id)) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to update logo of this company",
      });
    }

    //!CONVERTDATA
    const fileUri = getDataUri(file);

    //!UPLOAD TO CLOUDINARY
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "image",
      folder: "job-portal/company-logos",
    });

    //!SAVE URL IN COMPANYMODEL
    company.logo = cloudResponse.secure_url;

    await company.save();

    return res.status(200).send({
      success: true,
      message: "Logo update Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in UpdateLogo API",
    });
  }
};

module.exports = {
  createCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
  updateCompanyLogo,
};
