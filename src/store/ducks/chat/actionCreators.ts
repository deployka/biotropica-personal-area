import {
  AddMessageActionInterface,
  ChatActionsType, FetchDialogActionInterface, FetchDialogsActionInterface,
  SetDialogActionInterface, SetSelectedDialogActionInterface, UpdateMessageActionInterface,
} from './contracts/actionTypes';
import {Message} from "../../../services/ChatService";

export const setDialogs = (
  payload: Dialog[]
): SetDialogActionInterface => ({
  type: ChatActionsType.SET_DIALOGS,
  payload,
});

export const setCurrentDialog = (
  payload: Dialog | undefined = undefined
): SetSelectedDialogActionInterface => ({
  type: ChatActionsType.SET_SELECTED_DIALOG,
  payload,
});

export const addMessage = (
  dialogId: number,
  message: Message
): AddMessageActionInterface => ({
  type: ChatActionsType.ADD_MESSAGE,
  payload: {
    dialogId,
    message
  },
});

export const updateMessage = (
  dialogId: number,
  message: Message
): UpdateMessageActionInterface => ({
  type: ChatActionsType.UPDATE_MESSAGE,
  payload: {
    dialogId,
    message
  },
});

export const fetchDialogs = (): FetchDialogsActionInterface => ({
  type: ChatActionsType.FETCH_DIALOGS,
});

export const fetchDialog = (id: number): FetchDialogActionInterface => ({
  type: ChatActionsType.FETCH_DIALOG,
  payload: {
    id
  }
});
