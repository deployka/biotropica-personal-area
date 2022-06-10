import { BaseUser } from '../@types/entities/BaseUser';
import { Dialog } from '../@types/entities/Chat';

export function getOpponent(
  dialog: Dialog,
  currentUser: BaseUser,
): BaseUser | undefined {
  return dialog.participants.filter(it => it.id !== currentUser?.id)[0];
}
