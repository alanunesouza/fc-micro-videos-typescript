import { default as DefaultUseCase }  from "#seedwork/application/use-case";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { SearchInputDto } from "#seedwork/application/dto/search-input";
import { PaginationOutputDto, PaginationOutputMapper } from "#seedwork/application/dto/pagination-output";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input);
      const searchResult = await this.categoryRepo.search(params);
      return this.toOutput(searchResult);
    }
    
    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      return {
        items: searchResult.items
          .map(item => CategoryOutputMapper.toOutput(item)),
        ...PaginationOutputMapper.toOutput(searchResult),
      }
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<CategoryOutput>;
}