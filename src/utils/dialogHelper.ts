export function getOpponent(
  dialog: Dialog,
  currentUser: ChatUser,
): ChatUser | undefined {
  return dialog.participants.filter(it => it.id !== currentUser?.id)[0];
}
