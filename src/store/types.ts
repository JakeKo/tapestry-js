export type GraphicsState = Record<string, any>;
export type CanvasState = { cursor: string, cursorLock: boolean };

export type AppState = {
    graphics: GraphicsState;
    canvas: CanvasState;
};
