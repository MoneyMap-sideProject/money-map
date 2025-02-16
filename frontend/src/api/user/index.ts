import { CreateUserRequestBody, LoginRequestBody } from './type';
import instance from './instance';

export const createUser = async (body: CreateUserRequestBody) => {
  return await instance.post('', body);
};

export const getUsers = async () => {
  return await instance.get('');
};

export const login = async (body: LoginRequestBody) => {
  return await instance.post('/login', body);
};
