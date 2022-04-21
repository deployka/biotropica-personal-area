export enum WSEvent {
  onMessageReceived = 'onMessageReceived',
}

export class ChatWSService {
  ws?: WebSocket;
  isOnline = false;

  connect(token: string | null = localStorage.getItem('token')): Promise<void> {
    return new Promise(resolve => {
      if (!token) {
        return;
      }
      this.ws = new WebSocket(`${process.env.REACT_APP_WS_URL}?token=${token}`);
      this.ws.onmessage = data => {
        this.listeners.onMessageReceived.forEach(cb => {
          cb(data);
        });
      };
      this.isOnline = true;
      this.ws.onopen = () => {
        resolve();
      };

      this.ws.onclose = () => {
        this.connect();
      };
      this.ws.onerror = () => {
        this.connect();
      };
    });
  }

  disconnect() {
    this.ws = undefined;
    this.listeners = {
      onMessageReceived: [],
    };
    this.isOnline = false;
  }

  listeners: Record<WSEvent, ((e: MessageEvent) => void)[]> = {
    onMessageReceived: [],
  };

  addEventListener(event: WSEvent, callback: (e: MessageEvent) => void) {
    this.listeners[event].push(callback);
  }

  removeEventListener(event: WSEvent, callback: (e: MessageEvent) => void) {
    const index = this.listeners[event].indexOf(callback);
    if (index > -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  async sendMessage(msg: {
    dialogId: number;
    authorId: number;
    uuid: string;
    type: MessageType;
    text?: string;
    fileId?: number;
  }) {
    if ([this.ws?.CLOSED, this.ws?.CLOSING].includes(this.ws?.readyState)) {
      await this.connect();
    }
    const message = {
      ...msg,
    };
    this.ws?.send(JSON.stringify(message));
  }

  async startWritings(dialogId: number) {
    if ([this.ws?.CLOSED, this.ws?.CLOSING].includes(this.ws?.readyState)) {
      await this.connect();
    }
    this.ws?.send(
      JSON.stringify({
        type: 'writing',
        action: 'start',
        dialogId,
      }),
    );
  }

  async stopWritings(dialogId: number) {
    if ([this.ws?.CLOSED, this.ws?.CLOSING].includes(this.ws?.readyState)) {
      await this.connect();
    }
    this.ws?.send(
      JSON.stringify({
        type: 'writing',
        action: 'stop',
        dialogId,
      }),
    );
  }

  async openDialog(dialogId: number) {
    if ([this.ws?.CLOSED, this.ws?.CLOSING].includes(this.ws?.readyState)) {
      await this.connect();
    }
    this.ws?.send(
      JSON.stringify({
        type: 'openDialog',
        dialogId,
      }),
    );
  }

  async closeDialog() {
    if ([this.ws?.CLOSED, this.ws?.CLOSING].includes(this.ws?.readyState)) {
      await this.connect();
    }
    this.ws?.send(
      JSON.stringify({
        type: 'closeDialog',
      }),
    );
  }
}

export const chatWsService = new ChatWSService();
