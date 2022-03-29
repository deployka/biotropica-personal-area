import { Specialization } from '../requests/specializations';

export enum ROLE {
  USER = 'USER',
  SPECIALIST = 'SPECIALIST',
  ADMIN = 'ADMIN',
}

export enum TARIFF {
  BASE = 'BASE',
  EXTENDED = 'EXTENDED',
  INDIVIDUAL = 'INDIVIDUAL',
}

export type Role = {
  createdAt: string;
  id: number;
  name: ROLE;
  updatedAt: string;
};

export type Course = {
  description: string;
  title: string;
  date: string;
};

export type Specialist = {
  courses: Course[];
  createdAt: string;
  education: string;
  experience: string;
  id: number;
  price: number;
  specializations: [];
  updatedAt: string;
};

export type Consultation = {
  createdAt: string;
  date: string;
  id: number;
  specialist: Specialist;
  updatedAt: string;
  user: User;
  meetingNumber: number;
  meetingPassword: string;
};

export type Recommendation = {
  createdAt: string;
  description: string;
  id: number;
  specialist: User;
  status: RecommendationStatus;
  title: string;
  updatedAt: string;
  user: User;
  specialization: Specialization;
};

export enum RecommendationStatus {
  INITIATED = 'INITIATED',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface User {
  banReason: string | null;
  banned: boolean | null;
  confirmed: boolean;
  confirmedHash: string;
  createdAt: string;
  dob: Date | null;
  email: string;
  gender: string | null;
  id: number | null;
  isOnline: boolean | null;
  lastname: string;
  name: string;
  profilePhoto: string;
  paid: boolean;
  password: string;
  patronymic: string | null;
  phone: string;
  questionHash: string;
  refreshToken: string;
  restoreToken: string;
  roles: Role[];
  specialist: Specialist;
  tariff: TARIFF;
  updatedAt: string;
  apiUserUuid: string;
}

export type UserState = {
  data: User;
  isLogged: boolean;
};
