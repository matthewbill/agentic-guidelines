# Data State Guidelines

## Performance

To ensure optimal performance, data-heavy components should implement the following strategies:

- Get data on the server side wherever possible and pass it down to client components through props.
- Use data hooks (use-<entity> pattern) for whenever you are working with data fetching, mutations, and local state management. [See Data Hooks Guidelines](./../../lanaguages/react/data-hooks.md)
- Cache data locally using tanstack query for a short period of time on the client side using the stale property of useQuery. By default all data is considered stale immediately in tanstack query.
- If caching locally, then only do this for where data cannot change outside of the application/another user or where real-time updates are not critical.
- Queries should call API routes for data fetching and never actions.
- Mutations should call API routes or server actions as appropriate. (Don't refactor existing server actions for mutations unless there is a good reason to do so).
- Client calls to api routes should use the data hooks defined in `/src/components/hooks/data` wherever possible to ensure consistent handling of caching, optimistic updates, and error handling.
