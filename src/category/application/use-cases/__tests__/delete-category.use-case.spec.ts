import NotFoundError from '../../../../@seedwork/domain/errors/not-found.error';
import { Category } from '../../../domain/entities/category';
import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import DeleteCategoryUseCase from '../delete-category.use-case';

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(async () => await useCase.execute({ id: 'fake id' })).rejects.toThrow(new NotFoundError('Entity Not Found using ID fake id'));
  });

  it('should delete a category', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const entity = new Category({ name: 'Movie' });
    const entity2 = new Category({ name: 'Movie 2' });

    repository.items = [entity, entity2];
    
    await useCase.execute({ id: entity.id });
    expect(spyDelete).toBeCalledTimes(1);
    expect(repository.items).toEqual([entity2]);
  });
});
