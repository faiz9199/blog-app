const prisma = require("../db/prisma");

const getUserMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    req.userDetails = user; // Attach user details to the req object
    next();
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ err: "Internal server error" });
  }
};

module.exports = getUserMiddleware;
