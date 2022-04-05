interface TaskComment {
  uuid: string;
  datetime: string; // ISO
  text: string; // HTML
  author: {
    lastname: string;
    name: string;
    profilePhoto: string; // Ссылка
  };
}
