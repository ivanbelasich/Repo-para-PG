const About = require("../models/about");

const createAbout = async (req, res) => {
  const { email, telephone, address, city, stateOrProvince, logo } = req.body;

  if (email && telephone && address && city && stateOrProvince && logo) {
    const newabout = new About({
      email,
      telephone,
      address,
      city,
      stateOrProvince,
      logo,
    });
  }

  try {
    const about = await newabout.save();
    res.status(200).json({
      message: "Added Succefully",
      about
    });
  } catch (error) {
    res.status(400).json({
      message: "Couldn't create please try again",
    });
  }
};

const getAbout = async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json(about[0]);
  } catch (error) {
    res.status(400).json({
      message: "Cannot get the about",
    });
  }
};

const updateAbout = async (req, res) => {
  const { id } = req.params;
  const { email, telephone, address, city, stateOrProvince, logo } = req.body;

  if (email || telephone || address || city || stateOrProvince || logo) {
    try {
      const aboutToUpdate = {
        email,
        telephone,
        address,
        city,
        stateOrProvince,
        logo,
      };

      const about = await About.findOneAndUpdate(id, aboutToUpdate, {
        new: true,
      });
      res.status(200).json(about);
    } catch (error) {
      res.status(400).json({
        message: "Your request could not be processed. try again",
      });
    }
  }
};

module.exports = {
    createAbout,
    getAbout,
    updateAbout
};