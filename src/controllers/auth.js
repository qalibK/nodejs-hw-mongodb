import { registerUser, loginUser } from '../services/auth';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  await loginUser(req.body);
};
