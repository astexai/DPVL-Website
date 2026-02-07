import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const decoded = await authenticate(req, res);
    
    if (decoded) {
      res.status(200).json({
        valid: true,
        user: {
          id: decoded.userId,
          username: decoded.username,
          role: decoded.role,
        },
      });
    }
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}