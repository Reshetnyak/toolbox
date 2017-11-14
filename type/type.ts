/* 
 * Insure to have unique action types in redux app.
 * @author Denis Reshetniak <reshetnjak@gmail.com>
 * @param {string} type - action type
 * @return string - action type if wasn't registered previosly
 */

export const type: (type: string) => string = typeFnFactory();
// for tests
export function typeFnFactory(): (type: string) => string {
    const CASHE: {[key: string]: string} = {};
    
    return (type: string): string => {
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
