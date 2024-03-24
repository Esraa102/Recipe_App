import asyncHandlder from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandlder(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err || !token) {
        res.status(401);
        throw new Error("User Is Unathorized");
      }
      req.user = decoded.user;
      next();
    });
  }
});

export { validateToken };
