import { GraphicsState } from "./types";

const initialState = {};
const ACTION_TYPE = {
    CREATE_GRAPHIC: 'graphics/createGraphic',
    REMOVE_GRAPHIC: 'graphics/removeGraphic'
};

type Action = { type: keyof typeof ACTION_TYPE, payload: any };

function createGraphic(payload: { id?: string, props: any }) {
    return {
        type: ACTION_TYPE.CREATE_GRAPHIC,
        payload: { ...payload, id: payload.id ?? '' }
    };
}

function removeGraphic(payload: { id: string }) {
    return {
        type: ACTION_TYPE.REMOVE_GRAPHIC,
        payload
    };
}

function reducer(state: GraphicsState = initialState, action: Action) {
    const { type, payload } = action;
    if (type === ACTION_TYPE.CREATE_GRAPHIC) {
        return {
            ...state,
            [payload.id]: payload.props
        };
    } else if (type === ACTION_TYPE.REMOVE_GRAPHIC) {
        const { [payload.id]: _, ...newState } = state;
        return newState;
    }
}

export default reducer;
export {
    createGraphic,
    removeGraphic
}