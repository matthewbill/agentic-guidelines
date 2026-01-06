# TypeScript Guidelines

## General

- use the alias "@/_": ["./_"] in tsconfig.json
- Never use implicit any
- use Types for business objects and entities
- use kebab-case for all file and folder names
- use camelCase for all variables
- use PascalCase for all classes
- document with jsdoc

## Types

- Every type should have its own file

## Constansts

- use UPPER_SNAKE_CASE for all constants

## Logging

- use the logger from @/packages/common/logging/logger
- log function entry and exit with logger.debug
- log errors with logger.error

## Metrics

- use the metrics from @/packages/common/metrics/metrics

## Repositories

[TypeScript Repositories](../architecture/repositories.md)

## Services

[TypeScript Services](../architecture/services.md)
