/* 
 * Finds nested property in Object or Array
 * @author Denis Reshetniak <reshetnjak@gmail.com>
 * @param {string} propString - path to needed property
 * @param {Object | Array[any]} obj - where to look for a property
 * @param {Boolean} lookForUndefined - provide true if you are looking for undefined property
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

        // split query 'users[1].messages[1][3].to' to array ['users', '[1]', 'messages', '[1]', '[3]', 'to'];
        .match(/([\w\s\-]+)|(\[\d+\])/g)

        // transform to [{name: 'users'}, {index: 1}, {name: 'messages'}, ...]
        // it is needed for differentiation between arrays and objects accessors.
        // separation to numbers and strings is not enough because there can be object like {'1': {'22': {'333': 333}}}
        .map(function(accessor) {
            var index = (accessor.match(/\[(\d+)\]/) || ['', ''])[1];

            return index ? { index: parseInt(index, 10) } : { name: accessor };
        })

        // traverse trhough accessors array
        .reduce(
            function(acc, accessor) {

                var isArray  = Object.prototype.toString.call(acc) === '[object Array]';
                var isObject = Object.prototype.toString.call(acc) === '[object Object]';

                // if array is needed and current property is array
                if (accessor.hasOwnProperty('index') && isArray) {

                    // get element of array
                    return acc[accessor.index];

                // if object is needed and current property is object
                } else if (accessor.hasOwnProperty('name') && isObject) {

                    // get object property
                    return acc[accessor.name];
                
                // nothing was found
                } else {
                    return lookForUndefined ? getPropIfExist.notFound : void 0;
                }
            },
            obj // Object or Array containing needed property or element
        );
}

// make unique refference for returning in nothing found case
getPropIfExist.notFound = {}; 