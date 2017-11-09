/* 
 * Finds nested property in Object or Array
 * @author Denis Reshetniak <reshetnjak@gmail.com>
 * @param {Object | Array[any]} obj - where to look for a property
 * @param {string} path - path to needed property
 * @return undefined | any - found value or undefined
 */

export function getProp(
    obj: {[key: string]: any} | Array<any>,
    path: string
): any {
    if (typeof path !== 'string') {
        throw new TypeError('path argument should be a string type');
    }
    if (typeof path === 'string' && path.length === 0) {
        throw new Error('path couldn\'t be an empty string');
    }
    if (!Array.isArray(obj) && !isObject(obj)) {
        throw new TypeError('obj argument should be an object or array');
    }

    return path
        .match(/[\w\s\-]+|\[\d+\]/g)
        .map((accessor: string): number | string => {
            const index: string = (accessor.match(/\[(\d+)\]/) || ['', ''])[1];

            return index ? parseInt(index, 10) : accessor;
        })
        .reduce((acc: Object | Array<any>, accessor: number | string): any => {
            if (typeof accessor === 'number') {
                if (Array.isArray(acc)) {
                    return acc[accessor];
                } else {
                    console.log(acc, ' is not an Array');
                    return void 0;
                }
            } else if (typeof accessor === 'string') {
                if (isObject(acc)) {
                    if (acc.hasOwnProperty(accessor)) {
                        return acc[accessor];
                    }
                } else {
                    console.log(acc, ' is not an Object');
                    return void 0;
                }
            }
        }, obj);
}

function isObject(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
