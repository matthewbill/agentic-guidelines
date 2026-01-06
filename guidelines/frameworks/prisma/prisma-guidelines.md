# Prisma Guidelines

TYPE INFERENCE RULES:
Infer appropriate types based on field names and context:

- IDs: Always use `String @id @default(cuid())` for primary keys
- Foreign Keys: Use `String` for references to other tables
- Names/Titles: `String` (add length constraints if specified)
- Emails: `String`
- Dates: `DateTime @db.Date` for dates, `DateTime` for timestamps
- Amounts/Prices: `Decimal @db.Decimal(10, 2)`
- Status/Enum fields: `String` (mention enum consideration in comments)
- Boolean indicators: `Boolean @default(false)`
- Descriptions/Text: `String?` (nullable)
- Counts/Numbers: `Int @default(0)`

OUTPUT REQUIREMENTS:

1. Model naming: Always use PascalCase singular for model names (e.g., `User`, `Order`)
2. If the following scripts do not already existing in the package.json file then add them

```
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev",
    "db:format": "prisma format",
    "db:reset": "prisma migrate reset --force",
    "db:pull": "prisma db pull",
    "db:push": "prisma db push",
    "db:push:force": "prisma db push --force-reset",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:migrate:dev": "prisma migrate dev",
    "db:seed": "prisma db seed"
```

1. Table mapping: Always use `@@map("plural_snake_case")` (e.g., `@@map("users")`, `@@map("orders")`)
2. Field naming: Use camelCase for fields with `@map("snake_case")` mapping
3. Always include metadata fields with comment:

   ```
   // Meta Data
   createdAt DateTime @default(now()) @map("created_at")
   updatedAt DateTime @updatedAt() @map("updated_at")
   createdBy String?  @map("created_by")
   updatedBy String?  @map("updated_by")

   ```

4. Table purpose comment: Add a comment above each model explaining its purpose
5. Group up the tables where it makes sens

   ```
   //
   // Section
   //
   ```

6. Relations with comments:

   ```
   // Relations
   organization Organization @relation(fields: [orgId], references: [id], onDelete: NoAction, onUpdate: NoAction)
   user         User         @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction)

   // Reverse Relations
   orders Order[]

   ```

MANY-TO-MANY RELATIONSHIPS:
For models representing many-to-many relationships (e.g., OrgUser, OrgUserRoles, GroupUser, GroupUserRole):

1. Composite unique constraints - Add `@@unique([field1, field2])` to prevent duplicate relations
2. Explicit relation names - Use descriptive names to avoid Prisma relation conflicts
3. Careful onDelete/onUpdate - Evaluate each relationship:
   - `Cascade` - When parent is deleted, delete related records
   - `Restrict` - Prevent deletion if related records exist
   - `NoAction` - Database handles it (default safe choice)
   - `SetNull` - Set foreign key to null when parent is deleted

IMPORTANT: User IDs are external auth tool IDs, so never treat `userId` fields as foreign keys to a User model or create a User model.

Example many-to-many pattern:

```
// Junction table linking organizations and users with roles
model OrgUserRole {
  id       String @id @default(cuid())
  orgUserId String @map("org_user_id")
  orgRoleId String @map("org_role_id")

  // Meta Data
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt() @map("updated_at")
  createdBy String?  @map("created_by")
  updatedBy String?  @map("updated_by")

  // Relations
  orgUser OrgUser @relation("OrgUserToRoles", fields: [orgUserId], references: [id], onDelete: Cascade, onUpdate: NoAction)
  orgRole OrgRole @relation("OrgRoleToUsers", fields: [orgRoleId], references: [id], onDelete: Restrict, onUpdate: NoAction)

  @@unique([orgUserId, orgRoleId])
  @@map("org_user_roles")
}

```

ADDITIONAL GUIDELINES:

- Wherever possible try to make the schema generic so it could be used in other applications. For example a comment table. Split the file into two so the top of the schema is the generic tables and the bottom the app specific. Use comments to mark them:
  ```
  //
  // GENERIC
  //
  ```
- Use intelligent field name recognition (e.g., "userRef" → foreign key to appropriate model)
- Add helpful comments for potential enums or constraints
- Carefully evaluate onDelete/onUpdate constraints based on business logic
- Make reasonable assumptions about field requirements and nullability
- Use descriptive relation names in camelCase to avoid conflicts
- Generate only the model definitions, not generator or datasource blocks
- Add thoughtful table purpose comments based on the model name and fields
- For userId fields: these are external auth IDs, not foreign keys to User models
- Never create a seed file, backend code to interact with prisma, or any prisma boiletplate code. Just update the schema

EXAMPLE OUTPUT:

```
// Stores user account information and profile data
model User {
  id        String   @id @default(cuid())
  name      String   @map("name")
  email     String   @unique @map("email")
  birthdate DateTime @db.Date @map("birthdate")

  // Meta Data
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt() @map("updated_at")
  createdBy String?  @map("created_by")
  updatedBy String?  @map("updated_by")

  // Reverse Relations
  orders Order[]

  @@map("users")
}

// Stores customer orders and purchase transactions
model Order {
  id     String  @id @default(cuid())
  amount Decimal @db.Decimal(10, 2) @map("amount")
  status String  @map("status") // Consider using enum
  userId String  @map("user_id")

  // Meta Data
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt() @map("updated_at")
  createdBy String?  @map("created_by")
  updatedBy String?  @map("updated_by")

  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@map("orders")
}

```

## Seed Data

- Create some example test seed data for the database which can be used to populate the database for development, testing, and demonstration purposes.
- The seed data should be stored in /testing/fixtures/[table-name].ts
- This should be used by the seed script to populate the database with initial data.
