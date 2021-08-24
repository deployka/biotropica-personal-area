import classNames from 'classnames';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import s from './SidebarChat.module.scss';
import {InnerChat} from './InnerChat/InnerChat';
import {User} from "../../../store/ducks/user/contracts/state";
import {Dialog} from "../../../services/ChatService";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {fetchDialog, fetchDialogs, setCurrentDialog} from "../../../store/ducks/chat/actionCreators";
import {selectChatDialogs, selectDialog} from "../../../store/ducks/chat/selectors";
import {DialogList} from "./DialogList/DialogList";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}


export const SidebarChat = ({open, setOpen}: Props) => {
    const user = useSelector(selectUserData) as User;
    const dialogs = useSelector(selectChatDialogs) as Dialog[];
    const selectedDialog = useSelector(selectDialog);
    const dispatch = useDispatch()

    function closeDialog() {
        dispatch(setCurrentDialog())
    }

    function openDialog(dialog: Dialog) {
        dispatch(fetchDialog(dialog.id))
    }

    useEffect(() => {
        dispatch(fetchDialogs())
    }, [])

    return (
        <>
            <div
                onClick={() => setOpen(false)}
                className={(open && s.sidebar__background) || ''}
            />
            <div
                className={classNames({
                    [s.sidebar__chat__wrapper]: true,
                    [s.open]: open,
                })}
            >
                <div className={s.sidebar__chat}>
                    {selectedDialog ?
                        <InnerChat
                            options={selectedDialog}
                            id={selectedDialog.id}
                            onClose={() => closeDialog()}
                        /> :
                        <DialogList
                            dialogs={dialogs}
                            currentUser={user}
                            onClose={() => setOpen(false)}
                            onOpenDialog={openDialog}
                        />}
                </div>
            </div>
        </>
    );
};
