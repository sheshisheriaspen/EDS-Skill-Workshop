# Frontend Coding Best Practices and Design System Implementation

Use this file as a practical implementation guide for writing maintainable, consistent frontend code in this repository.

## 1) Plan before coding

- Reuse existing EDS and Shoelace patterns before introducing new composition.
- Keep scope tight: implement only what is requested unless a dependency requires additional work.
- Prefer incremental, verifiable changes over large rewrites.

## 2) Component architecture

- Build small, single-responsibility components.
- Keep rendering logic simple and predictable.
- Prefer composition over inheritance and avoid tightly coupled component trees.
- Do not add new components, wrappers, or CSS classes unless an existing structure or selector cannot express the required behavior or styling clearly.
- Extract repeated UI or behavior into shared components/utilities.
- Keep props and public APIs minimal, explicit, and stable.

## 3) State and data flow

- Keep state as local as possible and lift only when sharing is required.
- Derive computed values instead of duplicating state.
- Prefer one-way data flow and predictable update paths.
- Normalize API data before rendering when shapes are inconsistent.
- Handle loading, empty, success, and error states explicitly.

## 4) Framework-agnostic web component integration

- Verify custom elements receive host attributes correctly (including class hooks for styling).
- Use component properties and events according to the web component contract.
- Ensure event listeners are registered and cleaned up according to framework lifecycle.
- Use each framework's native class/prop/event binding mechanism and confirm rendered DOM output.
- Use imperative APIs (for example refs or element handles) only when declarative bindings are insufficient.
- Validate behavior in the browser when integrating slots, parts, and imperative APIs.

Framework implementation notes:
- React: confirm host attributes render correctly on custom elements and map custom events explicitly when needed.
- Angular: prefer class or ngClass for host classes and verify template bindings map to element properties/events.
- Vue: use v-bind and v-on for custom element props/events and confirm attribute versus property behavior.
- Other frameworks: follow the same contract-first approach, then verify real DOM output and interaction behavior.

## 5) Styling and theming

- Use EDS and Shoelace tokens for color, size, spacing, typography, border, and elevation.
- Avoid hardcoded visual values unless there is no token alternative and the exception is justified.
- Reuse existing class hooks and component APIs before creating new classes; add a new class only when it has a clear, necessary responsibility.
- Keep spacing and sizing consistent with token scale.
- Co-locate styles with the component they affect and keep selectors narrowly scoped.
- Preserve visual consistency with existing app patterns unless restyling is explicitly requested.

## 6) Figma and EDS conflicts

- Treat Figma as the source of visual intent for layout, hierarchy, content, and interaction states.
- When Figma conflicts with EDS components, design tokens, accessibility, or responsive requirements, EDS constraints take precedence.
- Preserve the closest possible Figma appearance using the approved EDS component or token rather than recreating a control or hardcoding a visual value.
- Record meaningful visual deviations in the implementation summary when an exact match is not possible.

## 7) Performance and reliability

- Avoid unnecessary re-renders by keeping props/state stable.
- Memoize expensive computations only when profiling justifies it.
- Defer non-critical work to improve initial render responsiveness.
- Guard against null/undefined data in render paths.
- Fail gracefully with user-visible recovery guidance where possible.

## 8) Testing and verification

- Validate core user flows after each meaningful UI change.
- Add or update tests for new behavior, regressions, and critical edge cases.
- Prefer behavior-focused tests over implementation-detail tests.
- Verify responsive layouts on common viewport sizes.
- Run a final self-check against design, accessibility, and content guidance.

## 9) Code review checklist

- EDS/Shoelace components were used where appropriate.
- Styling is token-based and consistent with existing patterns.
- Accessibility requirements are satisfied for keyboard, semantics, and contrast.
- UI copy follows content standards and uses consistent terms.
- States are complete: loading, empty, success, and error.
- Code is readable, scoped, and free from avoidable complexity.

## 10) Third-party UI libraries

### ECharts

- Bind chart colors and text to EDS tokens.
- Do not use default ECharts palette or typography.
- Start with this order: interactive default, interactive hover, text link.

### AG Grid

**Required imports (order matters):**
```js
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import '@aspentech/pf-ui-core/integrations/eds-aggrid.css'
```
Note: `@aspentech/pf-ui-core/main.css` is already imported globally — do not import it again per component or module.

**Module registration** — call once at application or module level, before the grid is created:
```js
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])
```

**Container element** — apply both classes together on the grid host element:
```html
<div class="ag-theme-quartz eds-aggrid-theme"></div>
```
`ag-theme-quartz` loads the base icon SVGs and structural styles. `eds-aggrid-theme` overrides typography, color, spacing, and row styling with EDS tokens. Omitting either class causes broken icons or unstyled rows.

**Grid configuration** — always set `theme: 'legacy'` and `filter: true` in `defaultColDef`:
```js
const gridOptions = {
  theme: 'legacy',
  defaultColDef: {
    sortable: true,
    resizable: true,
    filter: true,
  },
  // ...columnDefs, rowData, etc.
}
```
`theme: 'legacy'` tells AG Grid 35+ to use the class-based CSS theming path instead of the new programmatic Theming API. This is required for `eds-aggrid-theme` to apply.

**Framework wiring:**
- **Vanilla JS**: `createGrid(containerEl, gridOptions)`
- **React**: use `<AgGridReact theme="legacy" defaultColDef={...} />` from `ag-grid-react`; keep static column defs and row data outside the component or in `useMemo` when they depend on state
- **Angular**: use `<ag-grid-angular [theme]="'legacy'" [defaultColDef]="defaultColDef" />` from `ag-grid-angular`
- **Vue**: use `<ag-grid-vue :theme="'legacy'" :default-col-def="defaultColDef" />` from `ag-grid-vue3`

**Rules:**
- Do not add custom `--ag-*` CSS variable overrides; all visual tokens are defined in `eds-aggrid-theme`.
- Do not use any other AG Grid built-in theme class (`ag-theme-alpine`, `ag-theme-balham`, etc.).
- Use pagination only when explicitly required.

## 11) Token mapping defaults

Use these as first-choice tokens:

- Primary action color: `var(--eds-interactive-default)`
- Backgrounds: `var(--eds-background-default)`, `var(--eds-background-weak)`, `var(--eds-background-card)`
- Borders: `var(--eds-border-default)`
- Text: `var(--eds-text-default)`, `var(--eds-text-secondary)`, `var(--eds-text-link)`
- Typography: `var(--sl-font-sans)`, `var(--sl-font-size-small)`, `var(--sl-font-size-medium)`, `var(--sl-font-size-large)`, `var(--sl-font-size-2x-large)`
- Spacing scale: `var(--sl-spacing-3x-small)` through `var(--sl-spacing-x-large)`
