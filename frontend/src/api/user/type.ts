export type Email = string;
export type Time = string;
export type Id = number;

export interface CreateUserRequestBody {
  email: Email;
}

export interface CreateUserResponseBody {
  createdAt: Time;
  email: Email;
  id: Id;
}

export interface LoginRequestBody {
  email: Email;
}

export interface LoginReponseBody {
  createdAt: Time;
  email: Email;
  id: Id;
}
