export type SignUpDto = Readonly<{
  email: string;
  password: string;
  verificationPassword: string;
  name: string;
  lastname: string;
  phone: string;
  role: string;
}>;

export type SignUpWithoutPassDto = Readonly<{
  email: string;
  password?: string;
  verificationPassword?: string;
  name: string;
  lastname: string;
  phone: string;
  role: string;
}>;
