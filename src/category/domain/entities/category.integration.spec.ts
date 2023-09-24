import { ValidationError } from "#seedwork/domain/errors/validation-error.error";
import { Category } from "./category";

describe('Category Integration Tests', () => {

  describe('create method', () => {
    it('should a invalid category using name property', async () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      })

      expect(() => new Category({ name: "" })).containsErrorMessages({
        name: [
          "name should not be empty"
        ]
      })

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      })

      expect(() => new Category({ name: "t".repeat(256) })).containsErrorMessages({
        name: [
          "name must be shorter than or equal to 255 characters"
        ]
      })
    });

    it('should a invalid category using description property', async () => {
      expect(() => new Category({ description: 5 } as any)).containsErrorMessages({
        description: ['description must be a string']
      })
    });

    it('should a invalid category using is_active property', async () => {
      expect(() => new Category({ is_active: 5 } as any)).containsErrorMessages({
        is_active: ['is_active must be a boolean value']
      })
    });
      
  })

  describe('update method', () => {
    it('should a invalid category using name property', async () => {
      const category = new Category({ name: "Movie" })
      expect(() => category.update(null, null)).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      })

      expect(() => category.update("", null)).containsErrorMessages({
        name: [
          "name should not be empty",
        ]
      })

      expect(() => category.update(5 as any, null)).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      })

      expect(() => category.update("t".repeat(256), null)).containsErrorMessages({
        name: [
          "name must be shorter than or equal to 255 characters"
        ]
      })
    });

    it('should a invalid category using description property', async () => {
      const category = new Category({ name: "Movie" })

      expect(() => category.update(null, 5 as any)).containsErrorMessages({
        description: [
          "description must be a string",
        ]
      })
    });
  })
})