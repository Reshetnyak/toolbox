/* 
 * Finds nested property in Object or Array
 * @author Denis Reshetniak <reshetnjak@gmail.com>
 * @param {string} propString - path to needed property
 * @param {Object | Array[any]} obj - where to look for a property
 * @return undefined | any - found value or undefined
 * 
 * @example #1 - Go through objects and arrays
 * var serverResponse = {
 *   users: [
 *     {name: 'John', age: 20, messages: []},
 *     {
 *       name: 'Bob',
 *       age: 30, 
 *       messages: [
 *         'Hello', 
 *         [
 *             'How',
 *             'are', 
 *             'you', 
 *             {
 *               to: [
 *                 {name: 'John'}
 *               ]
 *             }
 *         ]
 *       ]
 *     },
 *   ]
 * }
 * // returns 'John'
 * getPropIfExist('users[1].messages[1][3].to[0].name', serverResponse);
 * 
 * @example #2 - Go through properties with dashes, numbers, spaces and underscores
 * var serverResponse = {
 *   '12_hello - there 00': {
 *     '  first  ': ['found']
 *   }
 * }
 * // returns 'found'
 * getPropIfExist('12_hello - there 00.  first  [0]', serverResponse);
 * 
 * @example #3 Looking for undefined property
 * var users = [{name: undefined}];
 * // returns undefined
 * getPropIfExist('[0].name', users, true)
 * // returns getPropIfExist.notFound
 * getPropIfExist('[0].age', users, true)
 */
function getPropIfExist(propString, obj, lookForUndefined) {

    return propString
        .match(/([\w\s\-]+)|(\[\d+\])/g)
        .map(accessor => {
            const index = (accessor.match(/\[(\d+)\]/) || ['', ''])[1];

            return index ? { index: parseInt(index, 10) } : { name: accessor };
        })
        .reduce(
            (acc, accessor) => {

                const isObject = Object.prototype.toString.call(acc) === '[object Object]';

                if (accessor.hasOwnProperty('index') && Array.isArray(acc)) {

                    return acc[accessor.index];

                } else if (accessor.hasOwnProperty('name') && isObject) {

                    return acc[accessor.name];
            
                } else {
                    return lookForUndefined ? getPropIfExist.notFound : void 0;
                }
            },
            obj
        );
}

getPropIfExist.notFound = Symbol('not foutd');