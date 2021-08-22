type EventHandler = (event: Record<string, any>) => void;

const EVENT = {
    GRAPHIC_MOUSE_DOWN: 'tapestry_graphic_mouse_down'
};

const events = {} as Record<string, Record<string, EventHandler>>;

/**
 * Adds the given handler to listen to the given event
 */
function listen(eventId: string, handlerId: string, handler: EventHandler): void {
    if (isListening(eventId, handlerId)) {
        console.warn(`Overshadowing handler (${handlerId}) which was not explicitly unlistened`);
    }

    events[eventId] = { ...events[eventId], [handlerId]: handler };
    document.addEventListener(eventId, ((event: CustomEvent) => handler(event.detail)) as EventListener);
}

/**
 * Adds the given handler to listen to the given event, and removes it after handling the event
 */
function listenOnce(eventId: string, handlerId: string, handler: EventHandler): void {
    if (isListening(eventId, handlerId)) {
        console.warn(`Overshadowing handler (${handlerId}) which was not explicitly unlistened`);
    }

    listen(eventId, handlerId, event => {
        handler(event);
        unlisten(eventId, handlerId);
    });
}

/**
 * Removes the given handler from listening to the given event
 */
function unlisten(eventId: string, handlerId: string): void {
    if (!isListening(eventId, handlerId)) {
        console.warn(`Unlistening handler (${handlerId}) which was not explicitly listened`);
    } else {
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
    dispatch
}
