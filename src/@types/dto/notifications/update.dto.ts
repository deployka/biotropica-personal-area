export type UpdateNotificationDto = Readonly<
  { id: UniqueId } & Partial<{
    message: string;
    link: string;
    data: {
      consultationId: UniqueId;
    };
  }>
>;
