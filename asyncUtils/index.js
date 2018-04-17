//TODO: add somehow "namespace" from interfaces.
// I.e., there is ForEachCallback in lib.dom.d.ts but I would
// like to use this name here.
async function* filter(iterable, callback) {
    let index = -1;
    for await (const value of iterable) {
        if (callback(value, ++index)) {
            yield value;
        }
    }
}
async function forEach(iterable, callback) {
    let index = -1;
    for await (const value of iterable) {
        callback(value, ++index);
    }
    // for types compatibility
    return true;
}
async function* map(iterable, callback) {
    let index = -1;
    for await (const value of iterable) {
        yield callback(value, ++index);
    }
}
/* [start] Example of usage */
// TODO: Add async calls (promises, request to data base, fetch calls);
// TODO: Add nested calls exapmles, parallel, sequences, delayed calls
const evenNums = filter([1, 2, 3], isEven);
const doubled = map(evenNums, double);
forEach(doubled, console.log);
function isEven(v, i) {
    return v % 2 === 0;
}
function double(v) {
    return v * 2;
}
/* [end] Example of usage */
