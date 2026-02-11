import User from '@/app/models/User';
import { connectToDatabase } from '@/lib/db/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Add a secret key for security in production
  const { secret, username, password } = req.body;
  
  if (secret !== process.env.ADMIN_CREATION_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create admin user
    const user = new User({
      username,
      password,
      role: 'admin',
    });

    await user.save();

    // Return user without password
    const userData = {
      id: user._id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
    };

    res.status(201).json(userData);
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}