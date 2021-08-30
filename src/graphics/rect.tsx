import { MouseEvent, memo } from "react";
import { decorateGraphicEvent } from "../events";
import { add, scale, towards, Vector } from "../vector";

function Rect(args) {
    const { props = {} } = args;
    const {
        origin,
        dimensions,
        fill,
        strokeWidth,
        strokeColor,
        rotation
    } = props;

    const center = add(origin, scale(dimensions, 0.5))

    const eventPayload = {
        graphic: args,
        utils: {
            center,
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
        },
    };

    return <rect
        x={origin?.x ?? 0}
        y={origin?.y ?? 0}
        width={dimensions?.x ?? 50}
        height={dimensions?.y ?? 50}
        fill={fill ?? '#000000FF'}
        strokeWidth={strokeWidth ?? 0}
        stroke={strokeColor ?? '#000000FF'}
        transform={[
            `rotate(${rotation ?? 0} ${center.x} ${center.y})`
        ].join(' ')}

        onMouseDown={decorateGraphicEvent('MOUSE_DOWN', eventPayload)}
        onMouseMove={decorateGraphicEvent('MOUSE_MOVE', eventPayload)}
        onMouseUp={decorateGraphicEvent('MOUSE_UP', eventPayload)}
    />;
}

export default memo(Rect);
