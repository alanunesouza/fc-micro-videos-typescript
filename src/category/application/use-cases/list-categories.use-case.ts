import UseCase from "../../../@seedwork/application/use-case";
import CategoryRepository from "../../domain/repository/category.repository";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input.dto";
import { PaginationOutputDto } from "@seedwork/application/dto/pagination-output.dto";
import { CategoryOutput } from "../dto/category-output.dto";

export default class ListCategoryUseCase implements UseCase<Input, Output> {

  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepo.search(params);
    return {
      items: searchResult.items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        is_active: item.is_active,
        created_at: item.created_at
      })),
      total: searchResult.total,
      current_page: searchResult.current_page,
      per_page: searchResult.per_page,
      last_page: searchResult.last_page,
    }
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;