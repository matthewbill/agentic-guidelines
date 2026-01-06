# Component Guidelines

This directory contains detailed implementation guidelines for specific UI components.

## Available Component Guidelines

- [Data Table Guidelines](./data-table-guidelines.md) - Data table implementation patterns and best practices
- [Form Guidelines](./form-guidelines.md) - Form design and implementation standards

Each component guideline provides detailed specifications for implementation, accessibility, and UX patterns.

## Skeletons

All components should also have a skeleton state which displays. This prop should be isLoading set to false when the actual content is ready to be displayed. By default the skeleton is not shown, so that controls can decide thmselves if they want to show loading state.

```jsx
isLoading={false}
```
