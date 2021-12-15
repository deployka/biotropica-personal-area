export function emitAppModuleEvent(eventKey: string, value?: any) {
    window.parent.postMessage({
        event: eventKey,
        value
    }, "*");
}