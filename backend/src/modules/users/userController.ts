import { Request, Response } from 'express';
import { UserService } from './userServices';

const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await UserService.adminLogin(username, password);

    return res.status(200).json({
      message: 'Authentication successful',
      ...result,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(401).json({
      message: error.message || 'Failed to login as admin',
    });
  }
};

export const UserController = {
  adminLogin,
};
