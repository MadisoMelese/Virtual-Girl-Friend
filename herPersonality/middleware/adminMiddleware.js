import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const createadmin = async ()=>{
  const createAdmin = await Admin.findOne({email: "Madisha@gmail.com"});
  if (!createAdmin) {
    const admin = new Admin({
      name: "Madisha",
      email: "Madisha@gmail.com",
      password: "1234"
    })
    await admin.save();
  }
}
createadmin();

export const protectAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized as admin" });
    }
  } else {
    res.status(401).json({ error: "No token, admin access denied" });
  }
};
