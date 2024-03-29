export type SignUpDto = Readonly<{
  email: string;
  password?: string;
  verificationPassword?: string;
  name: string;
  lastname: string;
  phone: string;
  role: string;
  token?: string;
}>;

export type SignUpWithoutPassDto = Exclude<
  SignUpDto,
  'password' | 'verificationPassword'
>;
