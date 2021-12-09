
type NotificationMoment = 'now' | 'morning' | 'noon' | 'afternoon' | 'evening';

interface INotification {
    id: number;
    key: NotificationKey;
    message: string;
    link: string;
    moment?: NotificationMoment;
    createdAt: Date;
    data?: {
        consultationId?: number;
    };
}