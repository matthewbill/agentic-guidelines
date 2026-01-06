# Data Hooks

`use-<entity>.ts` - for data hooks related to a specific entity, such as use-trademarks.ts

Responsible for:

- defining query and state keys
- querying data (feteching)
- mutations (creating, updating, deleting)
- local state management (setting state based on changes)
- optimistic updates
- error handling (rollback changes on error)
- subscribing to webhooks (such as pusher) which update the local state based upon messages coming through.

Should Not:

- contain any UI code

Implementation:

- Uses CollectionQuery for data fetching.
- Actions should never be used for data fetching as this will dramatically reduce performance.

## Unit Tests

All data hooks should have full unit test coverage.
