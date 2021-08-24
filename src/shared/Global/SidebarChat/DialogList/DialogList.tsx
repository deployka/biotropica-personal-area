import s from "../SidebarChat.module.scss";
import {BtnClose} from "../../../buttons/BtnClose/BtnClose";
import {DialogItem} from "./DialogItem";
import {getOpponent} from "../../../../utils/dialogHelper";
import React from "react";
import {Dialog} from "../../../../services/ChatService";
import {User} from "../../../../store/ducks/user/contracts/state";

type Props = {
    dialogs: Dialog[];
    currentUser: User;

    onClose: () => void;
    onOpenDialog: (dialog: Dialog) => void;
}

export function DialogList({dialogs, currentUser, onClose, onOpenDialog}: Props) {
    return <div>
        <div className={s.sidebar__header}>
    <div className={s.sidebar__header__title}>Сообщения</div>
        <BtnClose setOpen={onClose} />
    </div>
    <div className={s.sidebar__messages}>
        {(dialogs || []).map((dialog, index) => {
            return (
                <DialogItem
                    key={index}
            options={{
                image: dialog.participants[0].profile_photo,
                    name: currentUser ? getOpponent(dialog, currentUser)?.email : '',
                    content: dialog.participants[0].name,
                    status: dialog.participants[0].name,
            }}
            onClick={() => onOpenDialog(dialog)}
            />
        );
        })}
    </div>
    </div>
}
