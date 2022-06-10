export type Response = {
  statusCode: HTTP_CODES;
  message: string;
};
export type SignInResponse = {
  token: string;
};

export type ResponseError = {
  data: {
    message: string;
  };
  status: HTTP_CODES;
};
