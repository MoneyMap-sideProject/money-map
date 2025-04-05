import { SignUpRequestBody, LoginRequestBody } from './type';
import instance from './instance';

export const signUp = async (body: SignUpRequestBody) => {
  return instance.post('/register', body);
};

export const login = async (body: LoginRequestBody) => {
  return instance.post('/login', body);
};

export const logout = async () => {
  return instance.get('/logout');
};

export const getProfile = async () => {
  return instance.get('/profile');
};
