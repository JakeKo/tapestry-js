import { towards, Vector } from "../vector";

function graphicUtils({ origin }: { origin: Vector }) {
    return {
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
