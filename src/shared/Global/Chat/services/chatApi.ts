import $api from "../../../../http";
import axios from "axios";

const chatUrl = process.env.REACT_APP_CHAT_URL;

export const chatApi = {
    token: '',
    setToken(token: string) {
        this.token = token;
    },
    async fetchDialog(dialogId: number): Promise<Dialog> {
        const {data} = await $api.get('/dialogs/' + dialogId);
        return data;
    },
    async fetchDialogs(): Promise<Dialog[]> {
        const result = await axios.get(chatUrl + '/dialogs', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })

        return result.data
    },
    async create(userId: number): Promise<Dialog> {
        const result = await axios.post(chatUrl + '/dialogs', {
            userId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })

        return result.data
    }
}