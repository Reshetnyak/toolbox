import * as mocha from 'mocha';
import * as chai from 'chai';
import { getProp } from './getProp';

const expect = chai.expect;
describe('getProp function', () => {

  describe('traversing functionality', () => {

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
      }
    };
    
    const arr = [
      1,2,3,
      [
        4,5,6,
        [
          [
            7,8,
            {
              inner: [
                9, 10,
                {
                  deepest: 'found'
                }
              ]
            }
          ]
        ]
      ]
    ]
    
    it('should be able to find a top level property', () => {
      expect(getProp(obj, 'topLevelProp')).to.equal(obj.topLevelProp);
    });
    
    it('should be able to find element by index from array', () => {
      expect( getProp(arr, '[2]') ).to.equal(arr[2]);
    });
    
    it('should find deep nested property from ARRAY', () => {
      expect( getProp(arr, '[3][3][0][2].inner[2].deepest') )
      .to.equal(arr[3][3][0][2].inner[2].deepest)
    });
    
    it('should find deep nested property from OBJECT', () => {
      expect( getProp(obj, 'first.second.third.fours.fifs.sixs.found') )
      .to.equal(obj.first.second.third.fours.fifs.sixs.found);
    });
    
    it('should not look in prototypes', () => {
      expect( getProp(obj, 'first.second.third.fours.fifs.sixs.valueOf') )
      .to.equal(undefined);
    })
    
  });

  describe('received arguments', () => {
    it('should throw if called with neither object nor array as a first argument', () => {
      expect(() => getProp.call('wrong attr', 'a') ).to.throw(TypeError);
    });

    it('should throw if path to property is not a string', () => {
      expect( () => getProp.call({}, true) ).to.throw(TypeError);
    });

    it('should throw if path is an empty string', () => {
      expect( () => getProp.call({}, '') ).to.throw(Error);
    });
  });
});