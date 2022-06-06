export type CreateCommentDto = Readonly<{
  text: string;
  analyzeAnswerId: UniqueId;
}>;
