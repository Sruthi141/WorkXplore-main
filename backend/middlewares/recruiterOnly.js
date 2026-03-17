export const recruiterOnly = (req, res, next) => {
  // your auth middleware must already set req.user or req.userRole
  const role = req.user?.role || req.userRole;

  if (role !== "recruiter") {
    return res.status(403).json({
      success: false,
      message: "Only recruiters can access this resource",
    });
  }

  next();
};