import User from "../models/User.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalUsers,
      message: "Admin dashboard loaded",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};