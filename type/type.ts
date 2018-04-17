/* 
 * Insure to have unique action types in redux app.
 * @author Denis Reshetniak <reshetnjak@gmail.com>
 * @param {string} type - action type
 * @return string - action type if wasn't registered previously
 */

export const type: <T>(actionType: T) => T = typeFnFactory();
// for tests
export function typeFnFactory(): <T>(actionType: T) => T {
    const CACHE: {[key: string]: string} = {};

    return <T>(actionType: T): T => {
        // to avoid wrong usage in runtime
        if (typeof actionType !== 'string') {
            throw new TypeError('Argument \'type\' should be a string');
        }
        // to avoid problems with case ('Load_Book' and 'LOAD_BOOK'),
        // spaces and underscores ('Book load' and 'Book  load')
        const unifiedType = actionType.toLowerCase().replace(/\s|_/g, '');

        if (CACHE[unifiedType]) {
            const message = [
                `Trying to register '${actionType}'`,
                `, but similar type '${CACHE[unifiedType]}'`,
                'is already being used in application'
            ].join('');
            throw new Error(message);
        } else {
            CACHE[unifiedType] = actionType;
            return actionType;
        }
    };
}
