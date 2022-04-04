interface User {
  id: number;
  email: string;
  password: string;
  profilePhoto: string;
  name: string;
  lastname: string;
  patronymic: string;
  dob: Date;
  phone: string;
  gender: {
    value: string;
    label: string;
  }[];
  paid: boolean;
  isOnline: boolean;
  banned: boolean;
  banReason: string;
  confirmed: boolean;
  refreshToken: string;
  roles: Array<'CLIENT' | 'SPECIALIST' | 'ADMIN'>;
}
