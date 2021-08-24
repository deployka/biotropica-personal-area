import {User} from "../../user/contracts/state";
import {Dialog} from "../../../../services/ChatService";

export type Message= {
    uuid: string;
    text: string;
    author: User;
}

export type ChatState = {
    dialogs: Dialog[];
    currentDialog?: Dialog;
}
