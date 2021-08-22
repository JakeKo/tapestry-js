import { useDispatch } from 'react-redux';
import { objectMap } from '../utils';
import * as graphics from './graphics';

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

export {
    useTapestryStore
};

