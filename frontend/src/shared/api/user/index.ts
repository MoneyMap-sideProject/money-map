import { SignUpRequestBody, LoginRequestBody } from './type';
import instance from './instance';

export const signUp = async (body: SignUpRequestBody) => {
  return await instance.post('', body);
};

export const getProfile = async () => {
  return await instance.get('');
};

export const login = async (body: LoginRequestBody) => {
  return await instance.post('/login', body);
};
