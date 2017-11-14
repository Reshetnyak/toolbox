import * as mocha from 'mocha';
import * as chai from 'chai';
import { type } from './type';

const expect = chai.expect;
// need to be copied to clear function's cashe.
const copyFunction = (func: Function): Function => {
    const stringifiedFn = func.toString();
    const params = (stringifiedFn.match(/function\s*\((.*)\)/) || ['',''])[1].split(/\,\s?/);
    const body = (stringifiedFn.match(/[^\{]+\)\s*\{([\s\S]+)\}$/) || ['',''])[1];
    // add cashe to functions closure;
    return new Function(...params, 'const CASHE = {}; return (type) => {' + body + '}')();
}

describe('type function', () => {
    let typeFn: Function;
    beforeEach(() => {
        // new type function with cleaned cache
        typeFn = copyFunction(type);
    });

    describe('provided arguments', () => {
        it('should throw if it was called without argument', () => {
            // hack to fool typescript checking with ca + ll
            expect(() => typeFn['ca' + 'll']()).to.throw(TypeError);
        });
        it('should throw type error if it was called with not a string type', () => {
            expect(() => typeFn.call(true)).to.throw(TypeError);
        });
        it('should NOT throw if it was called with a string', () => {
            expect(() => typeFn.call(this,'some action')).to.not.throw();
        });
    });

    describe('working with strings', () => {
        it('should return provided string if it wasn\'t called with it previously', () => {
            const actionType = 'Unique string';
            expect(typeFn(actionType)).to.equal(actionType);
        });
        it('should throw if called with the same string second time', () => {
            expect(typeFn('Unique string')).to.equal('Unique string');
            expect(() => typeFn('Unique string')).to.throw(Error);
        });
        it('should throw if called with the same string with mixed case second time', () => {
            expect(typeFn('Unique string')).to.equal('Unique string');
            expect(() => typeFn('UnIquE sTrIng')).to.throw(Error);
        });
        it('should throw if called with the same string with upper case second time', () => {
            expect(typeFn('Unique string')).to.equal('Unique string');
            expect(() => typeFn('UNIQUE STRING')).to.throw(Error);
        });
        it('should throw if called with the same string with lower case second time', () => {
            expect(typeFn('Unique string')).to.equal('Unique string');
            expect(() => typeFn('UNIQUE STRING')).to.throw(Error);
        });
    });
});
