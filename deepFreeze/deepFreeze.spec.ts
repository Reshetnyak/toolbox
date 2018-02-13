import * as mocha from 'mocha';
import * as chai from 'chai';
import { deepFreeze } from './deepFreeze';

// TODO: add tests for JS version. Because behavior is not the same as with TS
// JS will throw only with 'use strict'; enabled. Without strict mode it would just not allow to 
// change the property of freezed object.

const expect = chai.expect;
describe('deepFreeze function', () => {
    const obj = {
        topLevelProp: 'hello',
        first: {
            second: {
                third: {
                    fours: {
                        fifs: {
                            sixs: {
                                found: true
                            }
                        }
                    }
                }
            }
        },
        1: [true, false],
    };

    describe('freezing functionality', () => {
        it('should return the same object', () => {
            expect(deepFreeze(obj)).to.equal(obj);
        });

        it('should throw when trying to add new property to freezed object', () => {
            const freezed = deepFreeze(obj);
            // result in js would be different
            expect(() => freezed['newProperty'] = 10).to.throw(TypeError);
        });

        it('should throw when trying to change property of freezed object', () => {
            const freezed = deepFreeze(obj);
            // result in js would be different
            expect(() => freezed['fir' + 'st'] = 10).to.throw(TypeError);
        });

        it('should throw when trying to change deep nested property of freezed object', () => {
            const freezed = deepFreeze(obj);
            // result in js would be different
            expect(() => freezed.first.second.third.fours.fifs['six' + 's'] = 10).to.throw(TypeError);
        });
    });

    describe('received arguments', () => {
        it('should throw if called with not an object', () => {
            // use .call because of typescript checking
            expect(() => deepFreeze.call('wrong attr')).to.throw(TypeError);
        });

        it('should throw if called without arguments', () => {
            // use .call to avoid tslint errors. 
            expect(() => deepFreeze['ca' + 'll']()).to.throw(TypeError);
        });
    });
});