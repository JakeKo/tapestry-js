function Rect({
    props: {
        origin,
        dimensions,
        fill,
        strokeWidth,
        strokeColor,
        rotation
    }
}) {
    return <rect
        x={origin.x}
        y={origin.y}
        width={dimensions.x}
        height={dimensions.y}
        fill={fill}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        rotate={rotation}
    />;
}

export default Rect;
