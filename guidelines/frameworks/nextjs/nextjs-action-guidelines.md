# Next Server Action Guidelines

- Next server actions should only be used for quick prototypes or functional requests that do not into a REST paradigm.
- Where Next server actions are used, they are responsible for handling authentication and authorization.

## Entity Server Actions

Create one file per service named `[table-name]-actions.ts`. By default it should mirror the service layer functions.

These should be stored in `/src/actions`.

## Page Server Actions

Entity actions should be used wherever possible.

When there is need for page specific actions, such as sending down a single page view model where the query is complex or performance needs to be optimised with a single request, create a file called `page-actions.ts` in the same router folder as the `page.ts` which has actions used specifically by that page.

## Requirements

- Use `"use server"` directive
- Proper TypeScript typing for all functions
- Include error handling and validation with try-catch blocks
- Add JSDoc comments for key functions
- Authenticated users are authenticated by calling the `checkUserAuthenticated` function in the `/src/lib/auth-utils.ts` file. This file handles user authentication and authorization. It can also be used to get the current organisationId of the current user.
