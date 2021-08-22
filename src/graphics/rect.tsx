import { MouseEvent } from "react";
import { dispatch, EVENT } from "../events";

function Rect(args) {
    const { props } = args;
    const {
        origin,
        dimensions,
        fill,
        strokeWidth,
        strokeColor,
        rotation
    } = props;

    function onMouseDown(event: MouseEvent): void {
        event.stopPropagation();
        dispatch(EVENT.GRAPHIC_MOUSE_DOWN, {
            baseEvent: event,
            graphic: args
        })
    }

    return <rect
        x={origin?.x ?? 0}
        y={origin?.y ?? 0}
        width={dimensions?.x ?? 50}
        height={dimensions?.y ?? 50}
        fill={fill ?? '#000000FF'}
        strokeWidth={strokeWidth ?? 0}
        stroke={strokeColor ?? '#000000FF'}
        rotate={rotation ?? 0}

        onMouseDown={onMouseDown}
    />;
}

export default Rect;
