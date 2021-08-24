import {Action} from "redux";
import {Dialog, Message} from "../../../../services/ChatService";

export enum ChatActionsType {
    SET_DIALOGS = 'chat/SET_DIALOGS',
    SET_SELECTED_DIALOG = 'chat/SET_SELECTED_DIALOG',
    ADD_MESSAGE = 'chat/ADD_MESSAGE',
    UPDATE_MESSAGE = 'chat/UPDATE_MESSAGE',
    FETCH_DIALOGS = 'chat/FETCH_DIALOGS',
    FETCH_DIALOG = 'chat/FETCH_DIALOG',
}

export interface SetDialogActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.SET_DIALOGS;
    payload: Dialog[];
}

export interface FetchDialogsActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.FETCH_DIALOGS;
}

export interface FetchDialogActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.FETCH_DIALOG;
    payload: { id: number }
}

export interface SetSelectedDialogActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.SET_SELECTED_DIALOG;
    payload?: Dialog;
}


export interface AddMessageActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.ADD_MESSAGE;
    payload: {
        message: Message;
        dialogId: number;
    }
}

export interface UpdateMessageActionInterface extends Action<ChatActionsType> {
    type: ChatActionsType.UPDATE_MESSAGE;
    payload: {
        message: Message;
        dialogId: number;
    }
}

export type ChatActions =
    SetDialogActionInterface
    | SetSelectedDialogActionInterface
    | AddMessageActionInterface
    | UpdateMessageActionInterface
