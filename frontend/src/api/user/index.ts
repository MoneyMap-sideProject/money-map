import { CreateUserRequestBody, LoginRequestBody } from './type';
import instance from './instance';

export const requestCreateUser = async (body: CreateUserRequestBody) => {
  return await instance.post('', body);
};

export const requestGetUsers = async () => {
  return await instance.get('');
};

export const requestLogin = async (body: LoginRequestBody) => {
  return await instance.post('/login', body);
};
