import {
  type SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult
} from '../../../@seedwork/domain/repository/repository-contract';
import { type Category } from '../entities/category';

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams {}

  export class SearchResult extends DefaultSearchResult<Category, Filter> {}

  export interface Repository extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> {}
}

export default CategoryRepository;
