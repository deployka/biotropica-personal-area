import {Modals} from "../modals/Modals";
import {Sidebar} from "../shared/Global/Sidebar/Sidebar";
import {SidebarNotifications} from "../shared/Global/SidebarNotifications/SidebarNotifications";
import {Header} from "../shared/Global/Header/Header";
import React, {useState} from "react";
import {selectIsAuth, selectUserData} from "../store/ducks/user/selectors";
import {useSelector} from "react-redux";
import {User} from "../store/ducks/user/contracts/state";
import { Chat } from "../shared/Global/Chat/Chat";

interface Props {
    children: React.ReactNode;
}

export function PrivateLayout(props: Props) {
    const isAuth = useSelector(selectIsAuth);
    const currentUser = useSelector(selectUserData) as User;

    const [page, setPage] = useState<string>('Главная');
    const [sidebarNotificationsOpen, setSidebarNotificationsOpen] =
        useState<boolean>(false);
    const [chatNotificationsOpen, setSidebarChatOpen] = useState<boolean>(false);

    return <div className="global__container">
        <Modals/>
        <Sidebar
            setSidebarNotificationsOpen={setSidebarNotificationsOpen}
            setSidebarChatOpen={setSidebarChatOpen}
            chatNotificationsOpen={chatNotificationsOpen}
            setPage={setPage}
        />
        <Chat
            isOpened={chatNotificationsOpen}
            isAuth={isAuth}
            token={localStorage.getItem('token') as string}
            currentUser={currentUser}
            onClose={() => setSidebarChatOpen(false)}
        />
        <SidebarNotifications
            open={sidebarNotificationsOpen}
            setOpen={setSidebarNotificationsOpen}
        />
        <div className="container">
            <Header
                setSidebarChatOpen={setSidebarChatOpen}
                setSidebarNotificationsOpen={setSidebarNotificationsOpen}
                page={page}
            />
            {props.children}
        </div>
    </div>
}