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
        x={origin.x}
        y={origin.y}
        width={dimensions.x}
        height={dimensions.y}
        fill={fill}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        rotate={rotation}

        onMouseDown={onMouseDown}
    />;
}

export default Rect;
