export const getDashboard = async (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.fullName}`,
    user: req.user,
  });
};