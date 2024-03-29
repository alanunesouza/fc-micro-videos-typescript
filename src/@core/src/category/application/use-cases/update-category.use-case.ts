import { default as DefaultUseCase }  from "#seedwork/application/use-case";
import { type CategoryRepository } from '../../domain/repository/category.repository';
import { type CategoryOutput, CategoryOutputMapper } from '../dto/category-output';


export namespace UpdateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor (private readonly categoryRepo: CategoryRepository.Repository) {}
  
    async execute (input: Input): Promise<Output> {
      const entity = await this.categoryRepo.findById(input.id);
      entity.update(input.name, input.description || null);
  
      if (input.is_active === true) {
        entity.active();
      }
  
      if (input.is_active === false) {
        entity.deactivate();
      }
  
      await this.categoryRepo.update(entity);
      return CategoryOutputMapper.toOutput(entity);
    }
  }
  
  export interface Input {
    id: string
    name: string
    description?: string
    is_active?: boolean
  }
  
  export type Output = CategoryOutput;
}
