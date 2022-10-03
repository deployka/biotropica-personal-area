import { ProgressPhotoType } from '../../@types/entities/Progress';

// FIXME: свитч попробовать поменять на объект
export function getInputNameByType(type: ProgressPhotoType) {
  switch (type) {
    case ProgressPhotoType.BACK:
      return 'Вид сзади';
    case ProgressPhotoType.FRONT:
      return 'Вид спереди';
    case ProgressPhotoType.SIDE:
      return 'Вид сбоку';
  }
}
