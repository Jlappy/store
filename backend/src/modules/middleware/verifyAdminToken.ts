import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const verifyAdminToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid credentials.' });
  }
};

export default verifyAdminToken;
