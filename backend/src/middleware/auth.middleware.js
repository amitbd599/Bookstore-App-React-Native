import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleware = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.userID = decoded.userID;
    req.email = decoded.email;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default middleware;
