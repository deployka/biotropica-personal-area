export type CreateConsultationDto = Readonly<{
  specialistId: UniqueId;
  isPaid?: boolean;
}>;
