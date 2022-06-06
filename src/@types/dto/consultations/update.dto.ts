export type UpdateConsultationDto = Readonly<
  { id: UniqueId } & Partial<{
    date: Date;
  }>
>;
