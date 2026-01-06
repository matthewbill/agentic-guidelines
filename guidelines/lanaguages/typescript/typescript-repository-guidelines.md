# TypeScript Repository Guidelines

Create one repository class per table named [table-name (plural)]-repository.ts:

- Store in the /src/repositories folder.
- Repositories handle all direct Prisma database operations
- Export a default class with methods matching the service layer
- Include proper error handling with try-catch blocks and transaction support
- Handle relationships between tables appropriately
- All Prisma code should be contained within repositories

## Standard Methods

- create - returns the created entity
- findById - returns an entity or null
- findAll - returns a PaginatedResult
- update - returns the updated entity or null
- delete - returns a boolean indicating success
- deleteMany - returns a boolean indicating success
- findOptions - returns id and value used for dropdowns and selecting of options.
