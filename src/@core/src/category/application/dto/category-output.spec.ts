import { CategoryOutputMapper } from './category-output';
import { Category } from "../../domain/entities/category"

describe('CategoryOutputMapper  Unit Tests', () => {
  it('should convert a category in output', () => {
    const created_at = new Date();
    const entity = new Category({ name: 'Movie', description: 'some description', is_active: true, created_at });

    const spyToJson = jest.spyOn(entity, 'toJson');
    const output = CategoryOutputMapper.toOutput(entity);

    expect(spyToJson).toHaveBeenCalled();
    expect(output).toEqual({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at,
    })
  })
})