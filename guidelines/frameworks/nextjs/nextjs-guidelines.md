# Next.js Guidelines

## Inherited Guidelines

- [TypeScript Guidelines](../lanaguages/typescript/typescript-guidelines.md)
- [React Guidelines](../lanaguages/react/react-guidelines.md)

## Architecture Requirements

- Next server actions should only be used for quick prototypes or functional requests that do not into a REST paradigm.
- Next server actions must never be used for GET requests
- Implement three-layer architecture: server host(api/actions) → services → repositories → Prisma → database
- Follow consistent naming conventions throughout
- All methods must include try-catch error handling

## File Structure

All should be under the `/src` directory, organized as follows:

```

/app/api/
  └── [entity]/
      ├── route.ts
      └── [id]/
          └── route.ts
/actions/
  ├── user-actions.ts
  ├── organization-actions.ts
  └── [table-name]-actions.ts

/services/
  ├── users-service.ts
  ├── organizations-service.ts
  └── [table-name]-service.ts

/repositories/
  ├── users-repository.ts
  ├── organizations-repository.ts
  └── [table-name]-repository.ts

```
