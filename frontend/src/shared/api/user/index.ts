import { SignUpRequestBody, LoginRequestBody } from './type';
import instance from './instance';

export const signUp = async (body: SignUpRequestBody) => {
  return instance.post('/users/register', body);
};

export const login = async (body: LoginRequestBody) => {
  return instance.post('/users/login', body);
};

export const logout = async () => {
  return instance.get('/users/logout');
};

export const getProfile = async () => {
  return instance.get('/users/profile');
};
