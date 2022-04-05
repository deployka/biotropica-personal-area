export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  refreshToken: string;
}

export interface SignUpData {
  email: string;
  password: string;
  verificationPassword: string;
  name: string;
  lastname: string;
  phone: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  password: string;
  verificationPassword: string;
}

export interface RestorePasswordData {
  password: string;
  verificationPassword: string;
  restoreToken?: string;
}
