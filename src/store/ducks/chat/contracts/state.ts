import {User} from "../../user/contracts/state";

export type Message= {
    uuid: string;
    text: string;
    author: User;
}

export type ChatState = {
    dialogs: Dialog[];
    currentDialog?: Dialog;
}
