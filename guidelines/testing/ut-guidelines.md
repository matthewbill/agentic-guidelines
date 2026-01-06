# UT Guidelines

## Folder Structure

/**tests** - Place all unit tests in this folder, mirroring the src structure.
/**mocks** - Place all mock files in this folder, mirroring the src structure.

## Principles

- Each test should be independent and self-contained.
- Tests should be deterministic; they should produce the same result every time they run.
- Tests should be as simple as possible while still effectively testing the functionality.
- There should only be one test file per source file.
- Tests should share code pragmatically to avoid duplication, but not at the cost of clarity.

## Naming Conventions

- Test files names should be named based on the file they are testing.
- Test files should be named with a `.test.ts` suffix (e.g., `my-service.test.ts`).
- Describe blocks should use the name of the function being tested.
- It blocks should describe the specific behavior being tested.
- Test names should follow the pattern: `should [expected behavior] when [condition]`.

## AuthN and AuthZ

- Tests should include scenarios for both authenticated and unauthenticated users. (AuthN)
- Tests should include scenarios for both users who do have access to resources and those who do not. (AuthZ)

## Test Errors

- Always test for error conditions, including edge cases and invalid inputs.

## Mocks

- Use Jest's built-in mocking capabilities.

## Utils

- Wherever possible, use shared utilities for common testing tasks.
- Place shared testing utilities in a dedicated `utils` folder within the `tests` directory.

## Layer Guidelines

These are instructions and guidelines of what to do for different layers. For example the serrvice layer, and the repository layer.

### Repository Layer

#### General

- Throws standardized error using BaseRepository.getErrorMessage(methodName, errorMessage) format
- Error includes the method name for traceability

#### Create Methods

- Success case - Returns created entity when operation succeeds
- Database error - Throws standardized error when database operation fails
- Method returns the expected type (entity, array, null, boolean, paginated result, etc.)
- Transformed/mapped data matches the declared return type
- logFunctionCall is invoked at method start (logs {RepositoryName}.{methodName} called)
- logFunctionReturn is invoked on success (logs {RepositoryName}.{methodName} returning)
- logError / throwFunctionError is invoked on failure (logs {RepositoryName}.{methodName} failed)

Note: If you want to verify logging, you'll need to mock the logger:

```ts
jest.mock("@/packages/common/logging/logger", () => ({
  logger: {
    debug: jest.fn(),
    error: jest.fn(),
  },
}));
```

#### GetById / FindFirst Methods

- Success case - Returns entity with relations when found
- Not found - Returns null when entity doesn't exist
- Soft delete filtering - Excludes records where deletedAt is not null
- Database error - Throws standardized error when database operation fails

#### FindMany / List Methods (with pagination/filtering)

- Success case - Returns paginated result with items, totalCount, pageSize, pageIndex
- Search term - Applies case-insensitive contains filter on searchable field
- Column filters - Test each supported filter type:
- Status/enum filters (single value and array)
- Date range filters (from only, to only, both)
- Related entity ID filters
- Related entity name filters
- Special filters (TLD suffix, null value handling)
- Sorting - Test each sortable field (asc and desc)
- Nested sorting - Sorting by related entity fields works
- Default sort - Applied when no sorting specified
- Pagination calculation - Skip/take derived correctly from pageIndex/pageSize
- Database error - Throws standardized error when database operation fails

#### GetList / Options Methods (for dropdowns)

- Success case - Returns transformed list items with expected shape
- Organization scoping - Query includes org filter
- Null value handling - Null optional fields default to appropriate values (0, null, etc.)
- Filters - Test each supported filter (trademarkId, brandId, companyId, search, etc.)
- Limit enforcement - Respects limit parameter with min/max bounds
- Explicit ID inclusion - Requested IDs are fetched even if not in initial results
- Database error - Throws standardized error when database operation fails

#### Update Methods

- Success case - Returns updated entity
- Soft delete filtering - Only updates records where deletedAt is null
- Not found (P2025) - Returns null when entity doesn't exist
- Other database errors - Throws standardized error for non-P2025 errors

#### Delete Methods (Soft Delete)

- Success case - Sets deletedAt and deletedBy, returns true
- Not found (P2025) - Returns false when entity doesn't exist
- Other database errors - Throws standardized error for non-P2025 errors

#### GetByRelatedId Methods (e.g., getByTrademarkId)

- Success case - Returns entities filtered by related ID
- Organization authorization - Validates related entity belongs to org before querying
- Unauthorized rejection - Throws error when related entity doesn't belong to org
- Database error - Throws standardized error when database operation fails

#### Statistics / Aggregate Methods

- Success case - Returns correct aggregate values (counts, sums)
- Organization scoping - All queries include org filter
- Date range filter - Applies date range when provided
- Null aggregate handling - Returns 0 when aggregate values are null
- Transaction usage - Uses transaction for multiple queries
- Database error - Throws standardized error when database operation fails

#### Time Series / Grouped Data Methods

- Success case - Returns correctly grouped and aggregated data
- Organization scoping - Query includes org filter
- Date range filter - Uses provided range or calculates default from days parameter
- Date boundary handling - Start of day (00:00:00) and end of day (23:59:59.999) applied correctly
- Grouping logic - Multiple records on same date are aggregated
- Null value handling - Null numeric fields treated as 0
- Status counting - Error/failure counts based on status field
- Database error - Throws standardized error when database operation fails

#### KPI / Calculated Metrics Methods

- Success case - Returns correctly calculated metrics
- Organization scoping - All queries include org filter
- Date range filter - Applies when provided
- Zero division handling - Returns 0 when divisor is 0 (no scans, no permutations)
- Null date handling - Excludes records with null dates from time calculations
- Rounding - Values rounded to appropriate decimal places
- Database error - Throws standardized error when database operation fails

#### Distinct Value Methods (for filter options)

- Success case - Returns unique values sorted appropriately
- Organization scoping - Query includes org filter
- Null filtering - Excludes null values from results
- Extraction logic - Correctly extracts values (e.g., TLD from domain name)
- Database error - Throws standardized error when database operation fails
