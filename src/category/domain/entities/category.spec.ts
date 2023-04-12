import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category } from "./category";

describe('Category', () => {
  it('constructor of category', () => {
    const props = { name: 'Movie', description: 'some description', is_active: true, created_at: new Date() }
    const category = new Category(props);
    
    expect(category.props).toStrictEqual(props);
  });

  it('should generate id automatically', () => {
    let category = new Category({ name:'Movie' })
    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);

    category = new Category({ name:'Movie' }, null)
    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);

    category = new Category({ name:'Movie' }, undefined)
    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);

    const uuidMock = new UniqueEntityId();
    category = new Category({ name:'Movie' }, uuidMock)
    expect(category.id).toEqual(uuidMock);
    expect(category.id).toBeInstanceOf(UniqueEntityId);
  })

  it('constructor of values default', () => {
    let category = new Category({ name: 'Movie' });
    
    expect(category.props).toStrictEqual(expect.objectContaining({
      name: 'Movie',
      description: null,
      is_active: true,
    }));
  })

  it('getter of name field', () => { 
    const props = { name: 'Movie', description: 'some description', is_active: true, created_at: new Date() }
    const category = new Category(props);
    
    expect(category.name).toBe('Movie');
  })
})