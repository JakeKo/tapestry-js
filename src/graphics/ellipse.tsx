import { memo } from "react";
import { decorateGraphicEvents } from "../events";
import { objectLayer } from "../utils";
import { add, scale } from "../vector";
import { graphicUtils } from "./utils";

function Ellipse(args) {
    const fullArgs = objectLayer({
        props: {
            origin: { x: 0, y: 0 },
            dimensions: { x: 0, y: 0 },
            fill: '#000000FF',
            strokeWidth: 0,
            strokeColor: '#000000FF',
            rotation: 0
        },
        meta: {},
    }, args);
    const {
        origin,
        dimensions,
        fill,
        strokeWidth,
        strokeColor,
        rotation
    } = fullArgs.props;

    const center = add(origin, scale(dimensions, 0.5))
    const eventPayload = {
        graphic: fullArgs,
        utils: graphicUtils({ origin, dimensions }),
    };

    return <ellipse
        cx={center.x}
        cy={center.y}
        rx={dimensions.x / 2}
        ry={dimensions.y / 2}
        fill={fill}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        transform={`rotate(${rotation} ${center.x} ${center.y})`}
        {...decorateGraphicEvents(eventPayload)}
    />;
}

export default memo(Ellipse);
