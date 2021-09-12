import { add, scale, towards, Vector } from "../vector";

function graphicUtils({ origin, dimensions }: { origin: Vector, dimensions: Vector }) {
    return {
        center: () => add(origin, scale(dimensions, 0.5)),
        box: () => ({
            topLeft: origin,
            topRight: add(origin, { x: dimensions.x, y: 0 }),
            bottomLeft: add(origin, { x: 0, y: dimensions.y }),
            bottomRight: add(origin, dimensions),
        }),
        cursorOffset: (event: MouseEvent): Vector => {
            const position = { x: event.clientX, y: event.clientY };
            return towards(position, origin);
        },
        drag: (event: MouseEvent, cursorOffset: Vector): any => {
            return {
                props: {
                    origin: {
                        x: event.clientX + cursorOffset.x,
                        y: event.clientY + cursorOffset.y,
                    },
                },
            };
        }
    }
}

export {
    graphicUtils,
};
