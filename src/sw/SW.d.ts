declare function importScripts(path: string): void;
declare const firebase: {
    initializeApp(config: object): void;
    messaging(): void;
}