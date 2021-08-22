import { memo, StrictMode } from 'react';
import { Provider, } from 'react-redux';
import store from './store/store';
import App from './App';

function Tapestry() {
    return <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>;
}

export default memo(Tapestry);
