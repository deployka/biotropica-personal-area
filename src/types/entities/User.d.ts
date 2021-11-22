interface User {
    id: number;
    email: string;
    password: string;
    profile_photo: string;
    name: string;
    lastname: string;
    patronymic: string;
    dob: Date;
    phone: string;
    gender: {
        value: string;
        label: string;
    }[];
    before_photos: JSON;
    after_photos: JSON;
    paid: boolean;
    isOnline: boolean;
    banned: boolean;
    banReason: string;
    confirmed: boolean;
    confirmed_hash: string;
    refreshToken: string;
}