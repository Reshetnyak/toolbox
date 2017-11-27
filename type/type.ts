/* 
 * Insure to have unique action types in redux app.
 * @author Denis Reshetniak <reshetnjak@gmail.com>
 * @param {string} type - action type
 * @return string - action type if wasn't registered previously
 */

export const type: <T>(type: T) => T = typeFnFactory();
// for tests
export function typeFnFactory(): <T>(type: T) => T {
    const CACHE: {[key: string]: string} = {};
    
    return <T>(type: T): T => {
        // to avoid wrong usage in runtime
        if (typeof type !== 'string') { 
            throw new TypeError('Argument \'type\' should be a string');
        }
        // to avoid problems with case ('Load_Book' and 'LOAD_BOOK'),
        // spaces and underscores ('Book load' and 'Book  load')
        const unifiedType = type.toLowerCase().replace(/\s|_/g, '');
    
        if (CACHE[unifiedType]) {
            const message = [
                'Trying to register ',
                type,
                ', but similar type ',
                CACHE[unifiedType],
                ' is already being used in application'
            ].join('');
            throw new Error(message);
        } else {
            CACHE[unifiedType] = type;
            return type;
        }
    }
}
