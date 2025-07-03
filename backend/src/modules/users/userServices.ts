import { UserModel } from './userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TUser } from './userInterface';

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

const adminLogin = async (username: string, password: string) => {
    const admin = await UserModel.findOne({ username });

    if (!admin) {
        throw new Error('Admin not found');
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }


    const token = jwt.sign(
        { id: admin._id, username: admin.username, role: admin.role },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        user: {
            username: admin.username,
            role: admin.role,
        },
    };
};

export const UserService = {
    adminLogin,
};
