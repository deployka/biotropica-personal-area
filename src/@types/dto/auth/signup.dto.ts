export type SignUpDto = Readonly<{
  email: string;
  password: string;
  verificationPassword: string;
  name: string;
  lastname: string;
  phone: string;
}>;