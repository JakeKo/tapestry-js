import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { objectLayer } from "../utils";
import { GraphicsState } from "./types";

const graphics = createSlice({
    name: 'graphics',
    initialState: {} as GraphicsState,
    reducers: {
        createGraphic(state, action: PayloadAction<{ id: string, type: string, props: any }>) {
            state[action.payload.id] = action.payload;
        },
        updateGraphic(state, action: PayloadAction<{ id: string, props: any, meta: any }>) {
            state[action.payload.id] = objectLayer(state[action.payload.id], action.payload);
        },
        removeGraphic(state, action: PayloadAction<string>) {
            delete state[action.payload];
        }
    }
});

export default graphics.reducer;
export const {
    createGraphic,
    updateGraphic,
    removeGraphic
} = graphics.actions;
