function deepFreeze<T>(obj: T): T {
    // Freeze properties before freezing self
    Object.keys(obj).forEach((name: keyof T) => {
        const prop = obj[name];

        // Freeze prop if it is an object
        if (Object.prototype.toString.call(prop) === '[object Object]') {
            deepFreeze(prop);
        }
    });

    // Freeze self (no-op if already frozen)
    return Object.freeze(obj);
}
