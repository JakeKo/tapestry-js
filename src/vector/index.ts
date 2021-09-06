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

function apply(v1: Vector, v2: Vector, func: (a: number, b: number) => number): Vector {
    return { x: func(v1.x, v2.x), y: func(v1.y, v2.y) };
}

function transform(v: Vector, func: (a: number) => number): Vector {
    return { x: func(v.x,), y: func(v.y) };
}

export {
    scale,
    add,
    towards,
    apply,
    transform,
};
