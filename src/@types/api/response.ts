import { ROLE } from '../entities/Role';

export type Response = {
  statusCode: HTTP_CODES;
  message: string;
};
export type SignInResponse = {
  token: string;
};
