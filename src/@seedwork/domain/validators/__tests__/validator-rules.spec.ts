import {ValidationError} from "../../errors/validation-error.error";
import ValidatorRules from "../validator-rules";

type Values = {
  value: any;
  property: string;
}

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
}

function assertIsInvalid({ value, property, rule, error, params = [] }: ExpectedRule) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    //@ts-ignore
    method.apply(validator, params);
  }).toThrow(error);
}

function assertIsValid({ value, property, rule, error, params = [] }: ExpectedRule) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    //@ts-ignore
    method.apply(validator, params);
  }).not.toThrow(error);
}

describe('ValidatorRules Unit Tests', () => {
  it('values method', () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  })

  it('required method', () => {
    const arrangeError: Values[] = [
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
      { value: '', property: 'field' },
    ]

    arrangeError.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: 'required',
        error: new ValidationError(`The ${item.property} is required`),
      })
    })

    const arrangeSuccess = [
      { value: "test", property: 'field' },
      { value: 5, property: 'field' },
      { value: 0, property: 'field' },
      { value: new Date(), property: 'field' },
    ]
  
    arrangeSuccess.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: 'required',
        error: new ValidationError(`The ${item.property} is required`),
      })
    })
  })

  it('string method', () => {
    const arrangeError: Values[] = [
      { value: 5, property: 'field' },
      { value: {}, property: 'field' },
      { value: false, property: 'field' },
    ]

    arrangeError.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: 'string',
        error: new ValidationError(`The ${item.property} must be a string`),
      })
    })

    const arrangeSuccess = [
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
      { value: "test", property: 'field' },
      { value: "a", property: 'field' },
      { value: "5", property: 'field' },
    ]
  
    arrangeSuccess.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: 'string',
        error: new ValidationError(`The ${item.property} must be a string`),
      })
    })
  })

  it('maxLength method', () => {
    const arrangeError: Values[] = [
      { value: "12345", property: 'field' },
    ]

    arrangeError.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: 'maxLength',
        error: new ValidationError(`The ${item.property} must be less or equal than ${4} characters`),
        params: [4],
      })
    })

    const arrangeSuccess = [
      { value: "12345", property: 'field' },
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
    ]
  
    arrangeSuccess.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: 'maxLength',
        error: new ValidationError(`The ${item.property} must be less or equal than ${5} characters`),
        params: [5],
      })
    })
  })

  it('boolean method', () => {
    const arrangeError: Values[] = [
      { value: 5, property: 'field' },
      { value: {}, property: 'field' },
      { value: "test", property: 'field' },
    ]

    arrangeError.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: 'boolean',
        error: new ValidationError(`The ${item.property} must be a boolean`),
      })
    })

    const arrangeSuccess = [
      { value: true, property: 'field' },
      { value: false, property: 'field' },
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
    ]
  
    arrangeSuccess.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: 'boolean',
        error: new ValidationError(`The ${item.property} must be a boolean`),
      })
    })
  })

  it('should trhow a validation error when combine two or more validation rules', () => {
    const arrangeError: Values[] = [
      { value: 5, property: 'field' },
      { value: {}, property: 'field' },
      { value: "test", property: 'field' },
    ]
    let validator = ValidatorRules.values(null, 'field');
    expect(() => { validator.required().string()}).toThrow(new ValidationError('The field is required'))
    
    validator = ValidatorRules.values(5, 'field');
    expect(() => { validator.required().string()}).toThrow(new ValidationError('The field must be a string'))

    validator = ValidatorRules.values("123456", 'field');
    expect(() => { validator.required().string().maxLength(5)}).toThrow(new ValidationError('The field must be less or equal than 5 characters'))
  })
  
})