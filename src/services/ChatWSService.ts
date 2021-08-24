import {MessageType} from "./ChatService";

export enum WSEvent {
    onMessageReceived = 'onMessageReceived'
};

export class ChatWSService {
    ws: WebSocket;

    constructor(token?: string) {
        if (!token) {
            token = localStorage.getItem('token') as string;
        }
        this.ws = new WebSocket(`${process.env.REACT_APP_WS_URL}?token=${token}`);
        this.ws.onmessage = (data) => {
            this.listeners.onMessageReceived.forEach(cb => {
                cb(data);
            })
        };
    }

    listeners: Record<WSEvent, ((e: MessageEvent) => void)[]> = {
        onMessageReceived: []
    }

    addEventListener(event: WSEvent, callback: (e: MessageEvent) => void) {
        this.listeners[event].push(callback)
    }

    removeEventListener(event: WSEvent, callback: (e: MessageEvent) => void) {
        const index = this.listeners[event].indexOf(callback);
        if (index > -1) {
            this.listeners[event].splice(index, 1);
        }
    }

    sendMessage(msg: {
        dialogId: number;
        authorId: number;
        uuid: string;
        type: MessageType;
        text?: string;
        fileId?: number;
    }) {
        const message = {
            ...msg,
        };
        this.ws.send(JSON.stringify(message));
    }

    startWritings(dialogId: number) {
        this.ws.send(JSON.stringify({
            type: 'writing',
            action: 'start',
            dialogId
        }))
    }

    stopWritings(dialogId: number) {
        this.ws.send(JSON.stringify({
            type: 'writing',
            action: 'stop',
            dialogId
        }))
    }

    openDialog(dialogId: number) {
        this.ws.send(JSON.stringify({
            type: 'openDialog',
            dialogId
        }))
    }

    closeDialog() {
        this.ws.send(JSON.stringify({
            type: 'closeDialog',
        }))
    }
}


export const chatWsService = new ChatWSService();
