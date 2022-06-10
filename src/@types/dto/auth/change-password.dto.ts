export type ChangePasswordDto = Readonly<{
  currentPassword: string;
  password: string;
  verificationPassword: string;
}>;
