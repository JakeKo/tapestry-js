import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CanvasState } from './types';

const canvas = createSlice({
    name: 'canvas',
    initialState: {
        cursor: 'default',
        cursorLock: false
    } as CanvasState,
    reducers: {
        setCursor(state, action: PayloadAction<string>) {
            if (!state.cursorLock) {
                state.cursor = action.payload;
            }
        },
        setCursorLock(state, action: PayloadAction<boolean>) {
            state.cursorLock = action.payload;
        }
    }
});

export default canvas.reducer;
export const { setCursor, setCursorLock } = canvas.actions;
