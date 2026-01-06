# Component Structure Guidelines

All components that are not tightly coupled should be put under the /components folder

There are two main folders under this:

## Component Folders

Under /components there are a number of component folders to split out the source and purpose:

/gloss - For generic UI components which could be used on any app

/app - For app specific components

/ui - For shadcn components **THESE SHOULD NEVER BE CHANGED**

## Component Types

Components - The generic name for all these files is components, but in this case components specifically means an individual UI component.

Blocks - Components formed together to create a block.

Pages - Makes use of various blocks and components for a whole page. Usually is the only component on a page.

## Block Types

Shell - Any blocks for the shell, such as the header, footer, side-bar, user menu, etc

Cards -

Card-Grids

Charts

Forms - using form component

Item-Lists - using item-list component

Modals

Popups

Table-Forms - using data-table-form component

Tables - using data-table component

- /components
  - /app
    - /components
      - /fields - utilises inputs or details to be used in forms
      - /inputs
      - /details
      - /columns - columns for the data-table
    - /blocks
      - /shell
        - details panel
      - /cards
        - tables
          - domains-table
        - details
          - details-card
          - item-card
      - /tables
        - domains-table
      - /item-list
        - cases-item-list
        - cases-item-list-config
    - /pages
      - details-page
      - dashboard-page
      - list-page
  - /gloss
    - /core
      - /components
        - /data-table
        - /form
        - /item-list
