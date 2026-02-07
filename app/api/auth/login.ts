import type { NextApiRequest, NextApiResponse } from 'next';

import { generateToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongo';
import User from '@/app/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id.toString(), user.username, user.role);

    // Return user info (without password) and token
    const userData = {
      id: user._id,
      username: user.username,
      role: user.role,
      token,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}