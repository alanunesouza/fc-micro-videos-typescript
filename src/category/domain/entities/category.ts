// import ValidatorRules from '../../../@seedwork/domain/validators/validator-rules';
import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
import CategoryValidatorFactory from '../validators/category.validator';
import { EntityValidationError } from '../../../@seedwork/domain/errors/validation-error.error';

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
}

export class Category extends Entity<CategoryProperties> {

  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    Category.validate(props);
    this.description = this.description ?? null;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, description: string): void {
    Category.validate({ name, description });
    this.name = name;
    this.description = description;
  }

  // static validate(props: Omit<CategoryProperties, 'created_at'>) {
  //   ValidatorRules.values(props.name, 'name').required().string().maxLength(255);
  //   ValidatorRules.values(props.description, 'description').string();
  //   ValidatorRules.values(props.is_active, 'is_active').boolean();
  // }

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    
    if (!isValid) {
      throw new EntityValidationError(validator.errors);  
    }
  }

  active(): void {
    this.props.is_active = true;
  }

  deactivate(): void {
    this.props.is_active = false;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }
  
  get is_active() {
    return this.props.is_active;
  }

  get created_at() {
    return this.props.created_at;
  }

  private set name(value) {
    this.props.name = value;
  }

  private set description(value) {
    this.props.description = value;
  }

  private set is_active(value) {
    this.props.is_active = this.props.is_active ?? true;
  }

  private set created_at(value) {
    this.props.created_at = this.props.created_at ?? new Date();
  }
}