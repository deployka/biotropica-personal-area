import { Dialog } from '../services/ChatService';
import { User } from '../store/ducks/user/contracts/state';

export function getOpponent(
  dialog: Dialog,
  currentUser: User
): User | undefined {
  return dialog.participants.filter(it => it.id !== currentUser?.id)[0];
}
