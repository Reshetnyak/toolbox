export function copy(func: Function): Function {
    const stringifiedFn = func.toString();
    const params = (stringifiedFn.match(/function\s*\((.*)\)/) || ['',''])[1].split(/\,\s?/);
    const body = (stringifiedFn.match(/[^\{]+\)\s*\{([\s\S]+)\}$/) || ['',''])[1];
    
    return new Function(...params, body);
}
