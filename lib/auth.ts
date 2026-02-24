import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface DecodedToken {
  userId: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export function generateToken(userId: string, username: string, role: string): string {
  return jwt.sign(
    { userId, username, role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch (error) {
    return null;
  }
}

export async function authenticate(
  req: NextApiRequest,
  res: NextApiResponse,
  requiredRole: string[] = ['admin']
) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return null;
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }

  if (!requiredRole.includes(decoded.role)) {
    res.status(403).json({ error: 'Insufficient permissions' });
    return null;
  }

  return decoded;
}