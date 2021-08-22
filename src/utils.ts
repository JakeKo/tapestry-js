function objectMap<T = any>(obj: Record<string, any>, transform: ([string, any]) => ([string, T])): Record<string, T> {
    return Object.entries(obj).reduce((newObj, [key, value]) => {
        const [newKey, newValue] = transform([key, value]);
        return { ...newObj, [newKey]: newValue };
    }, {});
}

export {
    objectMap
};
