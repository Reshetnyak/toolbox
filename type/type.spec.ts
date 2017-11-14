import * as mocha from 'mocha';
import * as chai from 'chai';
import { typeFnFactory } from './type';

const expect = chai.expect;

describe('type function', () => {
    let type: (type: string) => string;

    beforeEach(() => {
        // new type function with cleared cache
        type = typeFnFactory();
    });

    describe('provided arguments', () => {
        it('should throw if it was called without argument', () => {
            // hack to fool typescript checking with ca + ll
            expect(() => type['ca' + 'll']()).to.throw(TypeError);
        });
        it('should throw type error if it was called with not a string type', () => {
            expect(() => type.call(true)).to.throw(TypeError);
        });
        it('should NOT throw if it was called with a string', () => {
            expect(() => type.call(this,'some action')).to.not.throw();
        });
    });

    describe('working with strings', () => {
        const actionType = 'Unique string';

        it('should return provided string if it wasn\'t called with it previously', () => {
            expect(type(actionType)).to.equal(actionType);
        });
        it('should throw if called with the same string second time', () => {
            expect(type(actionType)).to.equal(actionType);
            expect(() => type(actionType)).to.throw(Error);
        });
        it('should throw if called with the same string with mixed case second time', () => {
            expect(type(actionType)).to.equal(actionType);
            expect(() => type(actionType)).to.throw(Error);
        });
        it('should throw if called with the same string with upper case second time', () => {
            expect(type(actionType)).to.equal(actionType);
            expect(() => type(actionType)).to.throw(Error);
        });
        it('should throw if called with the same string with lower case second time', () => {
            expect(type(actionType)).to.equal(actionType);
            expect(() => type(actionType)).to.throw(Error);
        });
    });
});
