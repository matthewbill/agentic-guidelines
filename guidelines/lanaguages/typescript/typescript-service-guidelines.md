# TypeScript Service Guidelines

Services can call multiple repositories or to other services. The service layer encapulates all the business logic and rules that take place for certain events. For example, adding a new user might also email them, whilst the users repository will just update the users datastore.

The service layer might provide shortcut methods to the repository layer for common use cases to find entities, such as getByX which could internally call find on the repository.

The service layer assumes that authentication and authorization are handled before it is called, and services should not contain any authentication logic.

The verb get is used whenever a result is expected and it should throw an error if it doesn't exist. Find is used more for search operations where no result may be returned.

- Create one service class per table named [table-name (plural)]-service.ts unless it is a simple joining table with no business logic of its own. In this case any methods should be on the primary joining table. For example addUserToGroup should be in the groupsService:

- Store in the /src/services folder.
- Services act as a thin layer between actions and repositories
- Keep service methods minimal to allow for business logic addition
- Services call repository methods and handle business rules
- Include proper error handling with try-catch blocks
- Handle cross-table business logic and validation

## Standard Methods

- add[TableName] - returns the created entity
- get[TableName]ById - returns an entity or null
- find[TableName]s - returns a PaginatedResult
- update[TableName] - returns the updated entity or null
- delete[TableName] - returns a boolean indicating success
- get[TableName]List - returns id and name/title fields for dropdowns

## Service Responsibilities

### Responsible For

- caching
- calling multiple repositories or other services
- business logic

### Not Responsible For

- authentication
- authorization
- direct database access (repositories handle this)
