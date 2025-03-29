import { SignUpRequestBody, LoginRequestBody } from './type';
import instance from './instance';

export const signUp = async (body: SignUpRequestBody) => {
  return await instance.post('/register', body);
};

export const login = async (body: LoginRequestBody) => {
  return await instance.post('/login', body);
};

export const logout = async () => {
  return await instance.get('/logout');
};

export const getProfile = async () => {
  return await instance.get('/profile');
};
