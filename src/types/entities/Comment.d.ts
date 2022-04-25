export interface Comment {
  id: number;
  text: string;
  author: Pick<User, 'profilePhoto' | 'name' | 'lastname', 'id'>;
  createdAt: string;
}
