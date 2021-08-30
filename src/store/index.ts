import { useDispatch, useSelector } from 'react-redux';
import { objectMap } from '../utils';
import * as graphics from './graphics';
import { AppState, GraphicsState } from './types';

function useTapestryStore() {
    const dispatch = useDispatch();

    const actions = {
        ...graphics
    };

    return objectMap(actions, ([key, action]) => [
        key,
        (...args: Parameters<typeof action>) => dispatch(action(...args))
    ]);
}

function useTapestryQueries() {
    const graphics = useSelector<AppState, GraphicsState>(state => state.graphics);

    function get(id: string): any {
        return graphics[id];
    }

    function find(predicate: () => boolean): any[] {
        return Object.values(graphics).filter(predicate);
    }

    return {
        get,
        find,
    };
}


export {
    useTapestryStore,
    useTapestryQueries,
};

