/* 
 * Finds nested property in Object or Array
 * @author Denis Reshetniak <reshetnjak@gmail.com>
 * @param {Object | Array[any]} obj - where to look for a property
 * @param {string} propString - path to needed property
 * @return undefined | any - found value or undefined
 */
function getProp(
    obj: Object | Array<any>,
    propString: string
): any {
    
    if (typeof propString !== 'string') {
        throw new TypeError('propString argument should be a string type');
    }
    if (!Array.isArray(obj) && !isObject(obj)) {
        throw new TypeError('obj argument should be an object or array');
    }

    return propString
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
                    return acc[accessor];
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
