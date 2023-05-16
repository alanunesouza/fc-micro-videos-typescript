import { Category } from "../../domain/entities/category";
import CategoryInMemoryRepository from "./category-in-memory.repository";

describe('CategoryInMemoryRepository Unit Tests', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  })

  describe('apllyFilter method', () => {

    it('should no filter items when filter param is null', async () => {
      const items = [new Category({ name: 'test' }), new Category({ name: 'test2' })]
      const spyFilterMethod = jest.spyOn(items, 'filter');
      const itemsFiltered = await repository['applyFilter'](items, null);

      expect(itemsFiltered).toHaveLength(2);
      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toBeCalled();
    })

    it('should filter using a filter param', async () => {
      const items = [
        new Category({ name: 'test', description: 'test3 20' }),
        new Category({ name: 'a', description: 'test3 10' }),
        new Category({ name: 'test3', description: 'test3 5' })
      ]
      const spyFilterMethod = jest.spyOn(items, 'filter');

      let itemsFiltered = await repository['applyFilter'](items, 'test');
      expect(itemsFiltered).toStrictEqual([items[0], items[2]]);
      expect(spyFilterMethod).toBeCalledTimes(1);

      itemsFiltered = await repository['applyFilter'](items, '3');
      expect(itemsFiltered).toStrictEqual([items[2]]);
      expect(spyFilterMethod).toBeCalledTimes(2);

      itemsFiltered = await repository['applyFilter'](items, 'no-filter');
      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toBeCalledTimes(3);
    })
  })

  describe('applySort method', () => {
    it('should sort items default (sort=created_at and sort_dir=desc)', async () => {
      const created_at = new Date();
      const items = [
        new Category({ name: 'test', created_at }),
        new Category({ name: 'test2', created_at: new Date(created_at.getTime() + 1) }),
        new Category({ name: 'test3', created_at: new Date(created_at.getTime() + 2) })
      ]

      const itemsSorted = await repository['applySort'](items, null, null);
      expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
    })

    it('should sort items by name', async () => {
      const items = [
        new Category({ name: 'test' }),
        new Category({ name: 'test2' }),
        new Category({ name: 'test3' })
      ]
      
      const itemsSorted = await repository['applySort'](items, "name", "asc");
      expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
    })
  })
})