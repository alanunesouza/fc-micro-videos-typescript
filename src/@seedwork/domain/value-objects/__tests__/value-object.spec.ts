import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}

describe('ValueObject Unit Tests', () => {
  it('should set value', () => {
    let mockValue: any = 'string value'
    let vo = new StubValueObject(mockValue)
    expect(vo.value).toBe(mockValue)

    mockValue = { prop1: 'value1' }
    vo = new StubValueObject(mockValue)
    expect(vo.value).toStrictEqual(mockValue)
  })

  it('should convert to a string', () => {
    const date = new Date()
    let arrange = [
      { received: "", expected: "" },
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      { received: { prop1: 'value1' }, expected: JSON.stringify({ prop1: 'value1' }) },
    ]

    arrange.forEach(value => {
      const vo = new StubValueObject(value.received);
      expect(vo + "").toBe(value.expected)
    })
  })

  it('should be a immutable object', () => {
    const vo: any = new StubValueObject({ prop1: 'value1', deep: { prop2: "value2", prop3: new Date() } });

    expect(() => vo.value.prop1 = 'teste').toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
    expect(() => vo.value.deep.prop2 = 'teste').toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
    expect(typeof vo).toBe('object');
  })
})