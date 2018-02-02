//TODO: add somehow "namespace" from interfaces.
// I.e., there is ForEachCallback in lib.dom.d.ts but I would
// like to use this name here.

interface AsyncFilterCallback<T> {
    (value: T, index?: number): boolean;
}

async function* filter<T>(
    iterable: Iterable<T> | AsyncIterable<T>,
    callback: AsyncFilterCallback<T>
): AsyncIterableIterator<T> {
    let index = -1;
    for await (const value of iterable) {
        if (callback(value, ++index)) {
            yield value;
        }
    }
}

interface AsyncForEachCallback<T> {
    (value: T, index?: number): void;
}

async function forEach<T>(
    iterable: Iterable<T> | AsyncIterable<T>,
    callback: AsyncForEachCallback<T>
): Promise<boolean> {
    let index = -1;
    for await (const value of iterable) {
        callback(value, ++index);
    }
    // for types compatibility
    return true;
}

interface AsyncMapCallback<T> {
    (value: T, index?: number): T
}

async function* map<T>(
    iterable: Iterable<T> | AsyncIterable<T>,
    callback: AsyncMapCallback<T>
): AsyncIterableIterator<T> {
    let index = -1;
    for await (const value of iterable) {
        yield callback(value, ++index);
    }
}

/* [start] Example of usage */
// TODO: Add async calls (promises, request to data base, fetch calls);
// TODO: Add nested calls exapmles, parallel, sequences, delayed calls
const evenNums = filter<number>([1,2,3], isEven);
const doubled = map<number>(evenNums, double);

forEach<number>(doubled, console.log);

function isEven(v, i) {
    return v % 2 === 0;
}

function double(v) {
    return v * 2;
}
/* [end] Example of usage */
