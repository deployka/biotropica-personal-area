import {RootState} from "../../store";
import {ChatState} from "./contracts/state";

export const selectChatState = (state: RootState): ChatState => state.chat;

export const selectChatDialogs = (state: RootState): ChatState['dialogs'] => selectChatState(state).dialogs

export const selectDialog = (state: RootState): ChatState['currentDialog'] => selectChatState(state).currentDialog
