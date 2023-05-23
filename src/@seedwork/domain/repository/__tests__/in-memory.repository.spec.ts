import { v4 } from "uuid";
import Entity from "../../entity/entity";
import NotFoundError from "../../errors/not-found.error";
import {InMemoryRepository} from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {}

class StubeInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubeInMemoryRepository;

  beforeEach(() => {
    repository = new StubeInMemoryRepository();
  })

  it('should inserts a new entity', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 100
    })
    await repository.insert(entity)
    expect(repository.items).toHaveLength(1);
    expect(entity.toJson()).toStrictEqual(repository.items[0].toJson());
  })

  it('should throws error when entity not found', () => {
    expect(repository.findById('fake id')).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));

    const uuid = v4();
    expect(repository.findById(uuid)).rejects.toThrow(new NotFoundError(`Entity Not Found using ID ${uuid}`));
  })

  it('should finds a entity by id', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 100
    })
    await repository.insert(entity);
    expect(repository.items).toHaveLength(1);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJson()).toStrictEqual(entityFound.toJson());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJson()).toStrictEqual(entityFound.toJson());
  })

  it('should returns all entities', async() => {
    const entity = new StubEntity({
      name: 'test',
      price: 100
    })
    const entity2 = new StubEntity({
      name: 'test2',
      price: 50
    })
    await repository.insert(entity);
    await repository.insert(entity2);

    const entities = await repository.findAll();
    expect(entities).toHaveLength(2);
    expect(entities).toStrictEqual([entity, entity2]);
  })

  it('should throws error on update when entity not found', () => {
    const entity = new StubEntity({
      name: 'test',
      price: 100
    })
    expect(repository.update(entity)).rejects.toThrow(new NotFoundError(`Entity Not Found using ID ${entity.id}`));
  })

  it('should updates an entity', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 100
    })
    await repository.insert(entity);

    const entityUpdated = new StubEntity({
      name: 'updated',
      price: 1
    }, entity.uniqueEntityId)
    await repository.update(entityUpdated);
    expect(repository.items).toHaveLength(1);
    expect(entityUpdated.toJson()).toStrictEqual(repository.items[0].toJson());
  })

  it('should throws error when entity not found', () => {
    expect(repository.delete('fake id')).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));

    const uuid = v4();
    expect(repository.delete(uuid)).rejects.toThrow(new NotFoundError(`Entity Not Found using ID ${uuid}`));
  })

  it('should deletes an entity', async () => {
    const entity = new StubEntity({
      name: 'test',
      price: 100
    })
    await repository.insert(entity);
    expect(repository.items).toHaveLength(1);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    expect(repository.items).toHaveLength(1);

    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  })
})