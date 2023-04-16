import { deepFreeze } from "./object"

describe('object Unit Tests', () => {
  it('should not freeze a scalar value', () => {
    const str = deepFreeze('a');
    expect(typeof str).toBe('string');

    let boolean = deepFreeze(true);
    expect(typeof boolean).toBe('boolean');
    boolean = deepFreeze(false);
    expect(typeof boolean).toBe('boolean');

    const number = deepFreeze(2);
    expect(typeof number).toBe('number');
  })

  it('should be a immutable object', () => {
    const obj: any = deepFreeze({ prop1: 'value1', deep: { prop2: "value2", prop3: new Date() } });

    expect(() => obj.prop1 = 'teste').toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
    expect(() => obj.deep.prop2 = 'teste').toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
    expect(obj.deep.prop3).toBeInstanceOf(Date);
    expect(typeof obj).toBe('object');
  })
})