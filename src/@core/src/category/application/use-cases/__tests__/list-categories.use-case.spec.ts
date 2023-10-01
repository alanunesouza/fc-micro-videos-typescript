import CategoryInMemoryRepository from '../../../infra/repository/category-in-memory.repository';
import {ListCategoriesUseCase} from '../list-categories.use-case';
import { CategoryRepository } from '#category/domain/repository/category.repository';
import { Category } from '#category/domain/entities/category';

describe('ListCategoriesUseCase Unit Tests', () => {
  let useCase: ListCategoriesUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase.UseCase(repository);
  });

  it('toOutput method', async () => {
    let result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort_dir: null,
      sort: null,
      filter: null
    });

    //@ts-ignore
    let output = useCase.toOutput(result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1
    });

    const entity = new Category({ name: 'Movie' });
    result = new CategoryRepository.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort_dir: null,
      sort: null,
      filter: null
    });
    //@ts-ignore
    output = useCase.toOutput(result);
    expect(output).toStrictEqual({
      items: [entity.toJson()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1
    });
  });

  it('should returns output using empty input with categories ordered by created_at', async () => {
    const items = [
      new Category({ name: 'test 1' }),
      new Category({ name: 'test 2', created_at: new Date(new Date().getTime() + 100) })
    ];
    repository.items = items;

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].reverse().map(item => item.toJson()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1
    });
  });

  it('should returns output using pagination, sort and filter', async () => {
    const items = [
      new Category({ name: 'a' }),
      new Category({ name: 'AAA' }),
      new Category({ name: 'AaA' }),
      new Category({ name: 'b' }),
      new Category({ name: 'c' })
    ];
    repository.items = items;

    let output = await useCase.execute({ page: 1, per_page: 2, sort: 'name', filter: 'a' });
    expect(output).toStrictEqual({
      items: [items[1].toJson(), items[2].toJson()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2
    });

    output = await useCase.execute({ page: 2, per_page: 2, sort: 'name', filter: 'a' });
    expect(output).toStrictEqual({
      items: [items[0].toJson()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2
    });

    output = await useCase.execute({ page: 1, per_page: 2, sort: 'name', filter: 'a', sort_dir: 'desc' });
    expect(output).toStrictEqual({
      items: [items[0].toJson(), items[2].toJson()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2
    });
  });
});
