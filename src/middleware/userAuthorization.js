const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming user role is included in the token payload

    if (userRole !== requiredRole) {
      return res.status(403).json({ error: "Permission denied" });
    }

    next();
  };
};

module.exports = {
  checkUserRole,
};
