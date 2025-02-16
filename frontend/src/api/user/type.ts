export type Email = string;
export type Time = string;
export type Id = number;

export type CreateUserRequestBody = {
  email: Email;
};

export type CreateUserResponseBody = {
  createdAt: Time;
  email: Email;
  id: Id;
};

export type LoginRequestBody = {
  email: Email;
};

export type LoginReponseBody = {
  createdAt: Time;
  email: Email;
  id: Id;
};
