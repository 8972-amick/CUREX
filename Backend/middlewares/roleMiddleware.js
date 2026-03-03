export  const requireRole = (role) => {// role can be "ADMIN", "DOCTOR", "PATIENT"
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403)
            .json({message: "Access Denied"})
        }
        next()// allow access
    }
}