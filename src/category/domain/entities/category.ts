import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
}

export class Category extends Entity<CategoryProperties> {

  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
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

  update(name: string, description: string): void {
    this.name = name;
    this.description = description;
  }

  active(): void {
    this.props.is_active = true;
  }

  deactivate(): void {
    this.props.is_active = false;
  }
}