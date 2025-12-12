const UserModel = require("../Models/User");

const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { mobile, gender, college, about, profileImage } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { mobile, gender, college, about, profileImage },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};

// Controllers/ProfileController.js

const updateScore = async (req, res) => {
  try {
    const { points = 0, gameName, badge } = req.body;
    const userId = req.user._id;

    // Build update object
    const updateFields = { $inc: { score: points } };

    if (gameName) {
      updateFields.$addToSet = { completedGames: gameName };
    }
    if (badge) {
      updateFields.$addToSet = { ...updateFields.$addToSet, badges: badge };
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Score updated",
      score: user.score,
      badges: user.badges
    });
  } catch (err) {
    console.error("Score update error:", err);
    res.status(500).json({ success: false, message: "Failed to update score" });
  }
};

const markGameStarted = async (req, res) => {
  try {
    const { gameName } = req.body;
    const userId = req.user._id;

    if (!gameName) {
      return res.status(400).json({ success: false, message: "gameName is required" });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { startedGames: gameName } },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Game marked as started",
      startedGames: user.startedGames,
      completedGames: user.completedGames
    });
  } catch (err) {
    console.error("Mark game started error:", err);
    res.status(500).json({ success: false, message: "Failed to mark game as started" });
  }
};

module.exports = { getProfile, updateProfile, updateScore, markGameStarted };