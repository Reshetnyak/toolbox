import * as mocha from 'mocha';
import * as chai from 'chai';
import { getProp } from './getProp';

const expect = chai.expect;
describe('getProp function', () => {
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
    1 : [true, false],
    ' with  spaces ': {
      inner: [1,2,3]
    },
    ' with_underscore__': true,
    '-with-dashes-': true,
    ' with mixed_ - symbols 123 ': true
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

  describe('traversing functionality', () => {

    
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
    });

    it('should return undefined if hasn\'t found property from OBJECT', () => {
      expect( getProp(obj, 'first.second.someProp') )
        .to.equal(undefined);
    });

    it('should return undefined if hasn\'t found property from ARRAY', () => {
      expect( getProp(arr, '[3][3][0][2].inner[11]') )
        .to.equal(undefined);
    });

    it('should treat [] as accessor for array', () => {
      expect( getProp({1: { 2: [1,2,3]}}, '1.2[1]') ).to.equal(2);
    });

    it('should NOT get object prop with [] syntax', () => {
      expect( getProp({1: { 2: [1,2,3]}}, '1[2]') ).to.equal(undefined);
    });
  });
  
  describe('special symbols in object key', () => {
    
    it('should parse prop with spaces', () => {
      expect( getProp(obj, ' with  spaces .inner[2]') ).to.equal(obj[' with  spaces '].inner[2]);
    });
    
    it('should parse prop with dashes', () => {
      expect( getProp(obj, '-with-dashes-') ).to.equal(obj['-with-dashes-']);
    });
    
    it('should parse prop with underscores', () => {
      expect( getProp(obj, ' with_underscore__') ).to.equal(obj[' with_underscore__']);
    });
    
    it('should parse combination of symbols [\\s-_]', () => {
      expect( getProp(obj, ' with mixed_ - symbols 123 ')).to.equal(obj[' with mixed_ - symbols 123 ']);
    });

  });

  describe('received arguments', () => {
    it('should throw if called with neither object nor array as a first argument', () => {
      // use .call because of typescript checking
      expect(() => getProp.call('wrong attr', 'a') ).to.throw(TypeError);
    });

    it('should throw if path to property is not a string', () => {
      // use .call because of typescript checking
      expect( () => getProp.call({}, true) ).to.throw(TypeError);
    });

    it('should throw if path is an empty string', () => {
      expect( () => getProp([], '') ).to.throw(Error);
    });

    it('should throw if called without arguments', () => {
      // use .call to avoid tslint errors. 
      expect( () => getProp['ca' + 'll']() ).to.throw(Error);
    });

    it('should throw if called without path', () => {
      expect( () => getProp['ca' + 'll']({}) ).to.throw(Error);
      expect( () => getProp['ca' + 'll']([]) ).to.throw(Error);
    });

    it('should throw if called without arguments', () => {
      expect( () => getProp['ca' + 'll']() ).to.throw(Error);
    });
  });
});