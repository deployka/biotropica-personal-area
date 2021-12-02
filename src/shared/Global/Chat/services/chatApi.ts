import {string} from "yup";

const chatUrl = process.env.REACT_APP_CHAT_URL;

export const chatApi = {
    token: '',
    setToken(token: string) {
        this.token = token;
    },
    async fetchDialog(dialogId: number): Promise<Dialog> {
        const rawDialog = await fetch(chatUrl + '/dialogs/' + dialogId, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        })
        return rawDialog.json();
    },
    async fetchDialogs(): Promise<Dialog[]> {
        const rawDialogs = await fetch(chatUrl + '/dialogs/', {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        })
        const response = await rawDialogs.json();

        if (response.statusCode) {
            throw response;
        }
        return response
    }
}