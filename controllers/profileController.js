import ProfileModel from "../models/profileModel.js";

const createProfile = async (req, res) => {
  try {
    const { personalInfo, workInfo, additionalInfo } = req.body;
    const profile = new ProfileModel({
      userId: req.user.userId,
      personalInfo,
      workInfo,
      additionalInfo,
    });
    await profile.save();
    res.status(201).send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { personalInfo, workInfo, additionalInfo } = req.body;

    const profile = await ProfileModel.findOne({ userId: req.user.userId });

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    if (profile.userId !== req.user.userId) {
      return res.status(400).send("Only the owner can update the profile");
    }

    if (personalInfo) {
      profile.personalInfo = { ...profile.personalInfo, ...personalInfo };
    }
    if (workInfo) {
      profile.workInfo = { ...profile.workInfo, ...workInfo };
    }
    if (additionalInfo) {
      profile.additionalInfo = { ...profile.additionalInfo, ...additionalInfo };
    }

    await profile.save();

    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!req.user) {
      return res.status(403).send("Access denied: You need to login");
    }

    const profile = await ProfileModel.findOne({ userId });

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export { createProfile, getProfile, updateProfile, getProfileByUserId };
