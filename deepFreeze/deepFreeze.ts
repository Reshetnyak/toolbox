export function deepFreeze<T>(obj: T): T {
    const isObject = value => Object.prototype.toString.call(value) === '[object Object]';
    if (isObject(obj) === false) {
        throw new TypeError('Type of the "obj" argument should be an Object');
    }
    // Freeze properties before freezing self
    Object.keys(obj).forEach((name: keyof T) => {
        const prop = obj[name];

        // Freeze prop if it is an object
        if (isObject(prop)) {
            deepFreeze(prop);
        }
    });

    // Freeze self (no-op if already frozen)
    return Object.freeze(obj);
}
