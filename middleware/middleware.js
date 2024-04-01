// isAdmin middleware checks if the user has admin privileges
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.authLevel === 2) {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(401).send("Unauthorized"); // User is not authorized, send 401 Unauthorized status
    }
}

// isBusinessOwner middleware checks if the user has business owner privileges or higher
const isBusinessOwner = (req, res, next) => {
    const user = req.user;
    if (user.authLevel >= 1) {
        next(); // User is a business owner or higher, proceed to the next middleware or route handler
    } else {
        res.status(401).send("Unauthorized"); // User is not authorized, send 401 Unauthorized status
    }
}

// isNotBusinessOwner middleware checks if the user is not a business owner
const isNotBusinessOwner = (req, res, next) => {
    const user = req.user;
    if (user.authLevel !== 1) {
        next(); // User is not a business owner, proceed to the next middleware or route handler
    } else {
        res.status(401).send("Unauthorized"); // User is a business owner, send 401 Unauthorized status
    }
}

// Export all middleware functions as an object
module.exports = {
    isAdmin,
    isBusinessOwner,
    isNotBusinessOwner
};
