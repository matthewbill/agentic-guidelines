# Components Folder Structure

## Top Level

`/src/components/app` - For app specific components, such as a card that displays a list of trademarks

`/src/components/gloss` - For generic components, which could be used across all apps. For example, a combobox component, which is then utilised for a trademark combo and added to the app level folder.

## Reserved

These are reserved folders, which custom code should not be added to and the contents should never be modified:

/components/ui - for shadcn components

## Components

/components

/components/details - for details view components
/components/inputs - for input components. This should include comboboxes
/components/fields - for form field components, which make use of inputs

/components/columns - columns for data-tables

## Blocks

- The goal for blocks is for them to be easily interchangeable between pages.
- Config for the blocks should sit alongside them.

**Folders**

/components/blocks

/components/blocks/data-tables - for tables such as user table
/components/blocks/data-table-forms - for data tables, which also have an add/edit form

/components/blocks/forms - for forms such as user form
/components/blocks/card-grids - for lists such as user list or blog list

/components/blocks/item-lists

/components/blocks/modals - for modals such as an new/edit modal or image browser.
/components/blocks/popover - for popover components

/components/blocks/cards - for card components. These will likely inherit and just be a wrapper for other blocks item lists, tables, or forms.

/components/blocks/charts

## Pages

/components/pages - complete pages to use on a page

## Templates

/components/templates

## Hooks

/components/hooks - custom hooks
/components/hooks/data - hooks for data fetching and mutations

## Providers

/components/providers - react context providers
