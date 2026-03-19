export const requireRole = (requiredRole) => {
  const allowedRoles = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];

  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access Denied" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};