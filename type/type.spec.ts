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
        let result: string;

        beforeEach(() => {
            result = type(actionType);
        });

        it('should return provided string if it wasn\'t called with it previously', () => {
            expect(result).to.equal(actionType);
        });

        it('should throw if called with the same string second time', () => {
            expect(() => type(actionType)).to.throw(Error);
        });

        it('should throw if called with the same string with mixed case second time', () => {
            expect(() => type('UnIqUe StRiNg')).to.throw(Error);
        });

        it('should throw if called with the same string with upper case second time', () => {
            expect(() => type('UNIQUE STRING')).to.throw(Error);
        });

        it('should throw if called with the same string with lower case second time', () => {
            expect(() => type('unique string')).to.throw(Error);
        });
    });

    describe('handling sligtly similar strings', () => {
        
        const actionType = 'Unique string';
        let result: string;

        beforeEach(() => {
            result = type(actionType);
        });

        it('should throw if strings differs with spaces', () => {
            expect(() => type('Unique  string')).to.throw(Error);
            expect(() => type(' Unique string ')).to.throw(Error);
            expect(() => type('Un ique str ing')).to.throw(Error);
        });

        it('should throw if strings differs with underscores', () => {
            type('String_with_underscore');
            expect(() => type('String__with_underscore')).to.throw(Error);
            expect(() => type('String_with__underscore')).to.throw(Error);
            expect(() => type('String_with_underscore_')).to.throw(Error);
        });

        it('should throw if "spaced" string differs with underscores', () => {
            expect(() => type('Unique_string')).to.throw(Error);
            expect(() => type('Unique__string')).to.throw(Error);
            expect(() => type('_Unique string_')).to.throw(Error);
        });

        it('should throw if "underscored" string differs with spaces', () => {
            type('String_with_underscore');
            expect(() => type('String with underscore')).to.throw(Error);
            expect(() => type(' String with underscore ')).to.throw(Error);
            expect(() => type(' String_with_underscore')).to.throw(Error);
        });
    });
});
