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

export interface Role {
    createdAt: string;
    id: number;
    name: ROLE;
    updatedAt: string;
}

export interface Course {
    description: string;
    title: string;
    date: string,
}

export interface Specialist {
    courses: Course[];
    createdAt: string;
    education: string;
    experience: string;
    id: number;
    price: number;
    specializations: [];
    updatedAt: string;
}

export interface Consultation {
    createdAt: string;
    date: string;
    id: number;
    specialist: Specialist;
    updatedAt: string;
    user: User;
    meetingNumber: number;
    meetingPassword: string;
}

export interface Recommendation {
    createdAt: string;
    description: string;
    id: number;
    specialist: User;
    status: string;
    title: string;
    type: string;
    updatedAt: string;
    user: User;
}

export interface User {
    after_photos: JSON | null;
    banReason: string | null;
    banned: boolean | null;
    before_photos: JSON | null;
    confirmed: boolean;
    confirmed_hash: string;
    createdAt: string;
    dob: Date | null;
    email: string;
    gender: string | null;
    id: number | null;
    isOnline: boolean | null;
    lastname: string;
    name: string;
    profile_photo: string;
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
}
