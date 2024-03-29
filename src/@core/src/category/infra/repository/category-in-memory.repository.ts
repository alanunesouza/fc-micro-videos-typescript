import { Category } from "../../domain/entities/category";
import { InMemorySearchableRepository } from "#seedwork/domain/repository/in-memory.repository";
import CategoryRepository from "#category/domain/repository/category.repository";

export default class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository.Repository {
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(items: Category[], filter: CategoryRepository.Filter): Promise<Category[]> {
    if (!filter) {
      return Promise.resolve(items);
    }

    return Promise.resolve(items.filter(i => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    }));
  }

  protected async applySort(items: Category[], sort: string, sort_dir: string): Promise<Category[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }

}