import produce, { Draft } from 'immer';
import { ChatState } from './contracts/state';
import { ChatActions, ChatActionsType } from './contracts/actionTypes';

const initialChatState: ChatState = {
  dialogs: [],
  currentDialog: undefined,
};

export const chatReducer = produce(
  (draft: Draft<ChatState>, action: ChatActions) => {
    switch (action.type) {
      case ChatActionsType.SET_DIALOGS: {
        draft.dialogs = action.payload;
        break;
      }
      case ChatActionsType.SET_SELECTED_DIALOG: {
        draft.currentDialog = action.payload;
        break;
      }
      case ChatActionsType.ADD_MESSAGE: {
        const { dialogId, message } = action.payload;
        if (draft.currentDialog?.id === dialogId) {
          const messages = draft.currentDialog.messages.slice();
          const index = messages.findIndex(it => it.uuid === message.uuid);
          if (index === -1) {
            messages.push(message);
          } else {
            messages.splice(index, 1, message);
          }

          draft.currentDialog = {
            id: draft.currentDialog.id,
            createdAt: draft.currentDialog.createdAt,
            participants: draft.currentDialog.participants,
            opponentReading: draft.currentDialog.opponentReading,
            messages,
          };
        }
        break;
      }
      case ChatActionsType.UPDATE_MESSAGE: {
        const { dialogId, message } = action.payload;
        if (draft.currentDialog?.id === dialogId) {
          const messages = draft.currentDialog.messages.slice();
          const index = messages.findIndex(it => it.uuid === message.uuid);
          if (index === -1) {
            return;
          }

          messages.splice(index, 1, message);

          draft.currentDialog = {
            id: draft.currentDialog.id,
            createdAt: draft.currentDialog.createdAt,
            participants: draft.currentDialog.participants,
            opponentReading: draft.currentDialog.opponentReading,
            messages,
          };
        }
        break;
      }
    }
  },
  initialChatState
);
