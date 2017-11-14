/* 
 * Insure to have unique action types in redux app.
 * @author Denis Reshetniak <reshetnjak@gmail.com>
 * @param {string} type - action type
 * @return string - action type if wasn't registered previosly
 */

export const type: (type: string) => string = typeFnFactory();
// for tests
export function typeFnFactory(): (type: string) => string {
    const CASHE: {[key: string]: true} = {};
    
    return (type: string): string => {
        // to avoid wrong usage in runtime
        if (typeof type !== 'string') { 
            throw new TypeError('Argument \'type\' should be a string');
        }
        // to avoid case difference problems ('Load_Book' and 'LOAD_BOOK')
        const lowercasedType = type.toLowerCase();
    
        if (CASHE[lowercasedType]) {
            throw new Error(`Action type ${type} is already being used in application`);
        } else {
            CASHE[lowercasedType] = true;
            return type;
        }
    }
}
