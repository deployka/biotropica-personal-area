export enum FileType {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  PDF = 'application/pdf',
  GIF = 'image/gif',
}

export const uploadFiles = (files: FileList | null): Promise<FileReader> => {
  return new Promise((resolve, reject) => {
    if (files && files.length) {
      const fr = new FileReader();
      fr.onload = function () {
        resolve(fr);
      };
      fr.readAsDataURL(files[0]);
    } else {
      reject();
    }
  });
};

export const checkFileType = (
  file: File | null,
  paths: FileType[]
): boolean => {
  if (!file) return false;
  return paths.includes(file.type as FileType);
};

export const checkFileSize = (
  file: File | null,
  maxFileSize: number
): boolean => {
  if (!file) return false;
  const fileSize = file.size / 1024 / 1024;
  return fileSize > maxFileSize;
};
