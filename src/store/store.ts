import graphics from './graphics';
import canvas from './canvas';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        canvas,
        graphics
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
