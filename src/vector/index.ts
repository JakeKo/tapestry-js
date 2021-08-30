export type Vector = { x: number, y: number };

function scale(v: Vector, scalar: number): Vector {
    return { x: v.x * scalar, y: v.y * scalar };
}

function add(v1: Vector, v2: Vector): Vector {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}

function towards(v1: Vector, v2: Vector): Vector {
    return { x: v2.x - v1.x, y: v2.y - v1.y }
}

export {
    scale,
    add,
    towards,
};
