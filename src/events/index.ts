export type EventHandler = (event: Record<string, any>) => void;

const EVENT = {
    CANVAS: {
        MOUSE_DOWN: 'tapestry_canvas_mouse_down',
        MOUSE_MOVE: 'tapestry_canvas_mouse_move',
        MOUSE_UP: 'tapestry_canvas_mouse_up',
    },
    GRAPHIC: {
        MOUSE_DOWN: 'tapestry_graphic_mouse_down',
        MOUSE_MOVE: 'tapestry_graphic_mouse_move',
        MOUSE_UP: 'tapestry_graphic_mouse_up',
    },
};

const events = {} as Record<string, Record<string, EventListener>>;

/**
 * Adds the given handler to listen to the given event
 */
function listen(eventId: string, handlerId: string, handler: EventHandler): void {
    if (isListening(eventId, handlerId)) {
        console.warn(`Overshadowing handler (${handlerId}) which was not explicitly unlistened`);
    }

    const wrappedHandler = ((event: CustomEvent) => handler(event.detail)) as EventListener;
    events[eventId] = { ...events[eventId], [handlerId]: wrappedHandler };
    document.addEventListener(eventId, wrappedHandler);
}

/**
 * Adds the given handler to listen to the given event, and removes it after handling the event
 */
function listenOnce(eventId: string, handlerId: string, handler: EventHandler): void {
    listen(eventId, handlerId, event => {
        handler(event);
        unlisten(eventId, handlerId);
    });
}

/**
 * Removes the given handler from listening to the given event
 */
function unlisten(eventId: string, handlerId: string): void {
    if (isListening(eventId, handlerId)) {
        document.removeEventListener(eventId, events[eventId][handlerId] as EventListener);
        delete events[eventId][handlerId];
        !isHeard(eventId) && delete events[eventId];
    }
}

/**
 * Removes all event handlers listening for the given event
 */
function unlistenAll(eventId: string): void {
    isHeard(eventId) && Object.keys(events[eventId]).forEach(handlerId => unlisten(eventId, handlerId));
}

/**
 * Unlistens the given handler from all events
 */
function unlistenEverywhere(handlerId: string): void {
    Object.keys(events).forEach(eventId => unlisten(eventId as string, handlerId));
}

/**
 * Checks if the given handler is listening to the given event
 */
function isListening(eventId: string, handlerId: string): boolean {
    return events[eventId] && events[eventId][handlerId] !== undefined;
}

/**
 * Checks if the given handler is listening to any event
 */
function isListeningAnywhere(handlerId: string): boolean {
    return Object.values(events).some(event => event[handlerId] !== undefined);
}

/**
 * Checks if the given event has any handlers listening to it
 */
function isHeard(eventId: string): boolean {
    return events[eventId] !== undefined && Object.keys(events[eventId]).length > 0;
}

function dispatch(eventId: string, payload: Object): void {
    document.dispatchEvent(new CustomEvent(eventId, { detail: payload }));
}

function decorateCanvasEvent(event: keyof typeof EVENT.CANVAS, payload: Object = {}): (baseEvent: any) => void {
    return (baseEvent: any): void => {
        baseEvent.stopPropagation();

        const detail = { baseEvent, ...payload };
        dispatch(EVENT.CANVAS[event], detail);
    }
}

function decorateGraphicEvent(event: keyof typeof EVENT.GRAPHIC, payload: Object = {}): (baseEvent: any) => void {
    return (baseEvent: any): void => {
        baseEvent.stopPropagation();

        const detail = { baseEvent, ...payload };
        dispatch(EVENT.GRAPHIC[event], detail);
        dispatch(EVENT.CANVAS[event], detail);
    }
}

export {
    EVENT,
    listen,
    listenOnce,
    unlisten,
    unlistenAll,
    unlistenEverywhere,
    isListening,
    isListeningAnywhere,
    isHeard,
    dispatch,
    decorateCanvasEvent,
    decorateGraphicEvent
}
