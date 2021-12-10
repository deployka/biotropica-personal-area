import $api from "../../../../http";

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
        const {data} = await $api.get('/dialogs/');
        return data;
    },
    async create(userId: number): Promise<Dialog> {
        const result = await $api.post('/dialogs', {
            userId
        })

        return result.data
    }
}