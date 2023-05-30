import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import ListCategoriesUseCase from "../list-categories.use-case";
import CategoryRepository from 'category/domain/repository/category.repository';

describe('ListCategoriesUseCase Unit Tests', () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  })

  it('toOutput method', async () => {
    const result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort_dir: null,
      sort: null,
      filter: null,
    })
    useCase['toOutput'](result);
    
  })
})