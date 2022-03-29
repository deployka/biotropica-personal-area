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
  verification_password: string;
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
  verification_password: string;
  restoreToken?: string;
}
