export type RestorePasswordDto = Readonly<{
  password: string;
  verificationPassword: string;
  restoreToken: string;
}>;
