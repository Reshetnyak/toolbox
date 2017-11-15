/* 
 * Insure to have unique action types in redux app.
 * @author Denis Reshetniak <reshetnjak@gmail.com>
 * @param {string} type - action type
 * @return string - action type if wasn't registered previously
 */

export const type: <T>(type: T) => T = typeFnFactory();
// for tests
export function typeFnFactory(): <T>(type: T) => T {
    const CASHE: {[key: string]: string} = {};
    
    return <T>(type: T): T => {
        // to avoid wrong usage in runtime
        if (typeof type !== 'string') { 
            throw new TypeError('Argument \'type\' should be a string');
        }
        // to avoid problems with case ('Load_Book' and 'LOAD_BOOK'),
        // spaces and underscores ('Book load' and 'Book  load')
        const unifiedType = type.toLowerCase().replace(/\s|_/g, '');
    
        if (CASHE[unifiedType]) {
            throw new Error(`Trying to register '${type}', but similar type '${CASHE[unifiedType]}' is already being used in application`);
        } else {
            CASHE[unifiedType] = type;
            return type;
        }
    }
}
