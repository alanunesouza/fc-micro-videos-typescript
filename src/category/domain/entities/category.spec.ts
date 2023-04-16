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

    category = new Category({ name:'Movie' }, null)
    expect(category.id).not.toBeNull();

    category = new Category({ name:'Movie' }, undefined)
    expect(category.id).not.toBeNull();

    const uuidMock = new UniqueEntityId();
    category = new Category({ name:'Movie' }, uuidMock)
    expect(category.id).toEqual(uuidMock.value);
  })

  it('constructor of values default', () => {
    let category = new Category({ name: 'Movie' });
    
    expect(category.props).toStrictEqual(expect.objectContaining({
      name: 'Movie',
      description: undefined,
      is_active: true,
    }));
  })

  it('getter of name field', () => { 
    const props = { name: 'Movie', description: 'some description', is_active: true, created_at: new Date() }
    const category = new Category(props);
    
    expect(category.name).toBe(props.name);
  })

  it('should update category', () => {
    const props = { name: 'Movie', description: 'some description', is_active: true, created_at: new Date() }
    const category = new Category(props);
    expect(category.name).toBe(props.name);
    expect(category.description).toBe(props.description);

    const newName = 'Serie';
    const newDescription = 'new description';
    category.update(newName, newDescription);
    expect(category.name).toBe(newName);
    expect(category.description).toBe(newDescription);
  })

  it('should activate and deactivate category', () => {
    const props = { name: 'Movie', description: 'some description', is_active: true, created_at: new Date() }
    const category = new Category(props);
    expect(category.is_active).toBe(true);
    category.deactivate();
    expect(category.is_active).toBe(false);
    category.active();
    expect(category.is_active).toBe(true);
  })
})