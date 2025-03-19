export type Email = string;
export type Time = string;
export type Id = number;

export type SignUpRequestBody = {
  email: Email;
};

export type SignUpResponseBody = {
  createdAt: Time;
  email: Email;
  id: Id;
};

export type LoginRequestBody = {
  email: Email;
};

export type LoginResponseBody = {
  createdAt: Time;
  email: Email;
  id: Id;
};
