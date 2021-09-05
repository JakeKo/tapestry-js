export type GraphicsState = Record<string, any>;
export type CanvasState = { cursor: string, cursorLock: string };

export type AppState = {
    graphics: GraphicsState;
    canvas: CanvasState;
};
