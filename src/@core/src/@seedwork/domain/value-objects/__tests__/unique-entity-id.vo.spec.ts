import { v4 } from "uuid";
import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";

describe('UniqueEntityId Unit Tests', () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  beforeEach(() => {
    validateSpy.mockClear();
  })

  it('should generate id automatically', () => {
    const vo = new UniqueEntityId();
    expect(vo.value).not.toBeNull();
    expect(vo).toBeInstanceOf(UniqueEntityId);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })

  it('should throw error when uuid is invalid', () => {
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })

  it('should accept a uuid passed in constructor', () => {
    const uuid = v4();
    const vo = new UniqueEntityId(uuid);
    expect(vo).toBeInstanceOf(UniqueEntityId);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })
})