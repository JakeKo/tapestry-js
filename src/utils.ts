function objectMap<T = any>(obj: Record<string, any>, transform: ([string, any]) => ([string, T])): Record<string, T> {
    return Object.entries(obj).reduce((newObj, [key, value]) => {
        const [newKey, newValue] = transform([key, value]);
        return { ...newObj, [newKey]: newValue };
    }, {});
}

function objectLayer(obj: Record<string, any>, ...layers: Record<string, any>[]): Record<string, any> {
    const layered = { ...obj };

    layers.forEach(layer => {
        Object.entries(layer).forEach(([key, value]) => {
            if (Array.isArray(value) || value === null) {
                layered[key] = value;
            } else if (typeof value === 'object') {
                layered[key] = objectLayer(layered[key], value);
            } else {
                layered[key] = value;
            }
        });
    });

    return layered;
}

export {
    objectMap,
    objectLayer
};
