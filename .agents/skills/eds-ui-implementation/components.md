# Components

## Tables and data grids

- All tables and data grids must use AG Grid Community. Do not implement tables with native `<table>` markup or another grid library.
- Follow the AG Grid implementation guidelines in `implementation.md`, including the required imports, module registration, `legacy` theme configuration, EDS theme classes, filtering defaults, and token-based styling rules.

### Table toolbar

- Place the table toolbar directly above the AG Grid and use `var(--sl-spacing-small)` for the gap between the toolbar and grid.
- Structure the toolbar with two containers: a `filters` area on the left and an `actions` area on the right.
- The left `filters` area must always include the item count. Add filters only when the table needs them; use `sl-radio-group` for mutually exclusive filter choices and keep controls ordered by function.
- The right `actions` area includes a search icon button, one content-width `sl-button` with `variant="primary"`, and an overflow menu icon button, in that order. Inputs and buttons use their default medium size.
- Use `sl-icon-button` for familiar icon actions and provide an accessible `label` for every icon button.
- Style the item count with `var(--eds-text-secondary)` and `var(--sl-font-size-small)`.
- Use `var(--sl-spacing-small)` for uniform spacing between controls within both areas.
- When the search icon button is selected, replace it with a standard-size `sl-input` using the placeholder `Search...` and keep focus in the input.
- Set the search input to `clearable` and handle `sl-clear` to reset the AG Grid quick filter.
- Connect the search input to the AG Grid quick filter as the user types. When focus leaves the search input, restore the search icon button while preserving the current filter value.
- Animate the search input when it appears and disappears using a short ease-out transition for width, opacity, and horizontal movement. Expand it to `10rem`; keep the input mounted during the exit transition, then restore the search icon button after the transition completes.

## Radio group

- Use `sl-radio-group` with `sl-radio` children for mutually exclusive selections. Do not build custom radio controls from buttons or divs.
- Always set the `label` attribute on `sl-radio-group`. Do not omit it.
- Set a `value` attribute on each `sl-radio` to identify the selected option.

## Buttons

- Use `sl-button` for button actions unless an explicit requirement states otherwise.
- Always use the default button size is `medium`.
- Use `variant="primary"` for the single main call-to-action; use `variant="default"` for secondary actions; use `variant="text"` for low-emphasis or inline actions.
- Keep button width content-based by default; do not stretch to full width unless explicitly required.
- Keep labels concise and action-oriented (see `content.md`).
- In React, use the literal `class` attribute rather than `className` on Shoelace and EDS custom elements when a CSS class hook is required; verify the rendered custom element has the expected class before relying on that selector.
- Before finalizing a form, verify that every button is content-fit in the rendered layout and that any custom-element CSS hook is present on the element.

## Cards

- Use `eds-button-card` when the entire card triggers one action (for example open details, navigate, or start a flow) and does not represent a persistent selected state.
- Use `eds-selectable-card` when the card itself represents a selectable option or toggleable state.
- Set `heading` for the card title and use `control="checkbox"` or `control="switch"` based on the interaction pattern.
- Do not compose a selectable tile manually from `sl-card` plus a separate checkbox or switch unless a documented component limitation requires it.
- Use generic `sl-card` only for non-selectable, presentational containers.
- Use approved card components (`sl-card`, `eds-selectable-card`, `eds-catalog-card`) based on behavior.
- Use `var(--sl-spacing-large)` for both horizontal and vertical spacing between cards (for example, `column-gap` and `row-gap` in card grids).
- Cards in the same row must render at equal height: set `::part(base) { height: 100%; }` if the `base` part is styleable; otherwise use `grid-auto-rows: 1fr` on the grid, `height: 100%` on the item wrapper, and apply `::part(base) { height: 100%; }` inside the component boundary when possible.
- Verify card heights in the browser on at least two rows before finalizing.
- Enforce card width at grid track level (for example with tokenized `minmax` tracks).

## Panels

- Use `eds-appbar` for the app shell header (breadcrumb, page info, right-side actions); use `eds-page-header` for page-level headings inside content regions.
- Match this slot structure for `eds-appbar`:
  - `breadcrumb` slot: use `sl-breadcrumb`.
  - Add a separator with `<span slot="separator">/</span>`.
  - Use `sl-breadcrumb-item` entries for path segments.
  - `page-info` slot: use `eds-page-info` and set `heading`.
  - `right` slot: place utility actions such as `sl-icon-button` and `sl-avatar`.
- Keep appbar actions concise and content-width.
- Always use `eds-panel-layout` for panel content that must stay contained inside layout slots (for example, `slot='left-panel'` or `slot='right-panel'` in `eds-application-layout`).
- Do not place raw content directly in left/right slots; wrap slot content with `eds-panel-layout`.
- When using `eds-panel-layout` inside a slot container, remove extra container padding because `eds-panel-layout` already includes internal spacing.
- For `eds-panel-layout` with `closable`, close the parent slot panel on the `eds-close` event.
- Use `eds-panel` for fixed drawer overlay UI that should float over content rather than remain constrained by slot boundaries.
- Do not use `eds-panel` when the panel must remain visually contained inside the left or right slot region.
- For `eds-panel` overlays, manage visibility via its open state and close behavior via the `eds-hide` event.

## Dialogs

- Use `sl-dialog` for modal dialogs.
- Set a clear `label` attribute for the dialog title.
- Open dialogs with `show()` only on explicit user actions (for example, button click).
- Close dialogs with `hide()` from explicit footer actions or dismiss events (Esc key works by default).
- Always include a footer with two buttons in this order:
  1. `<sl-button>` with variant `default` for "Cancel"
  2. `<sl-button>` with variant `primary` for the confirmation action (for example, "Add", "Save", "Delete")
- Use a `<div slot="footer">` wrapper for footer actions with flex layout for right alignment.

## Tabs

- Use `sl-tab-group` with `sl-tab` only.
- Never use `sl-tab-panel` components.
- Keep tab labels short, scannable, and sentence case.
- For horizontal tabs, use default placement unless a requirement specifies otherwise.
- For vertical tabs, always use `placement="end"`.
- Vertical tabs should always fill the container width.
- Keep active-tab styling token-based; avoid hard-coded colors when EDS tokens exist.

## Sidenav

- Use `eds-sidenav` for app-level navigation inside `eds-shell-template` via `slot="sidenav"`.
- Do not add custom sidebar styling by default (no inline style/class hooks or sidenav-specific CSS overrides) unless a clear requirement exists.
- Set `header-text` and `logo` when app branding/context is required.
- Build navigation entries with `eds-sidenav-item` and use sentence case labels.
- Use `type="node"` for standard sidebar navigation items.
- To add a new sidebar section, place `<sl-divider></sl-divider>` after the previous group, then add `<eds-sidenav-item type="heading" label="Section name"></eds-sidenav-item>` before that section's items.
- Keep a single source of truth for nav items (for example, an array of `{ page, label, icon }`) and render items from it.
- For hash or client-side routing, keep the active item state synchronized with the current route.

## Tree

- Use `sl-tree` with `sl-tree-item` for hierarchical tree navigation. Do not build custom tree controls from buttons or divs.
- Set `selection="single"` on `sl-tree` for single-item selection; use `"multiple"` or `"leaf"` only when the interaction explicitly requires it.
- Add a `value` attribute to each `sl-tree-item` to identify the node on selection and query events.
- Nest `sl-tree-item` elements directly inside a parent `sl-tree-item` to create child levels; `sl-tree` manages expand/collapse controls automatically.
- Do not set `expanded` or `selected` as declarative React props — re-renders will overwrite the component's internal state. Set initial values imperatively after mount by querying `sl-tree-item[value="id"]` inside a `window.customElements.whenDefined('sl-tree-item').then(...)` callback.
- Listen to `sl-selection-change` on the `sl-tree` ref to update React state. Access the selected node via `e.detail.selection[0]` and read its `value` attribute.
- When the tree in `slot='left-panel'` drives main-region content, derive the `eds-page-header` heading from the same selected state.

## Expand and collapse

- Use `sl-details` for expandable and collapsible content sections.
- Do not build custom disclosure controls from standalone icons or buttons when the behavior is expand/collapse.
- Use the `summary` slot to render the section header content. Don't add custom headings.
- In the `content` slot, use `gap: var(--sl-spacing-medium);` for spacing between child elements.

## Theme selector

- Place the theme selector in the appbar `right` slot using `sl-icon-button`.
- Use the default outlined Material icons: `dark_mode.svg` when the current theme is light and `light_mode.svg` when the current theme is dark.
- Give the icon button an accessible label that describes the next action, such as "Switch to dark mode" or "Switch to light mode".
- Apply the selected theme to the portal root and `eds-shell-template` using the EDS theme classes and the shell `theme` property.


## Errors and alerts

### Alerts

- Use the alert component for alert messages.
- Set alerts to stretch to 100% of their containing section.
- Place `eds-alert` above the section it relates to, typically at the top of the page below the page header or at the top of a dialog body.
- Do not use the `heading` property in `eds-alert`.
- Always set `closable` on `eds-alert` elements with the `primary`, `neutral`, or `warning` variant.
- Never set `closable` on an `eds-alert` with the `danger` variant.
- Use the `success` variant only in dialogs; use a toast for success messages in the main page area.

### Toasts

- Always use `eds-toast` for toast notifications.
- Keep toast text short, specific, and action-result oriented (see `content.md`).
- Set message content with `text`.
- Use default lifetime (3000 ms) unless there is a clear product requirement to override it.
- Position the toast at bottom center by styling `::part(base)` with bottom offset `var(--sl-spacing-2x-large)`.
- Use a short ease-out entry transition with `transition` + `@starting-style` on `::part(base)`: animate `transform` and `opacity` together while preserving horizontal centering, starting at `translate(-50%, var(--sl-spacing-medium))` and `opacity: 0.5`, then ending at `translate(-50%, 0)` and `opacity: 1`. Note: `@starting-style` requires Chrome 117+, Firefox 129+, Safari 17.5+ — verify browser targets before using.
- Do not use CSS `animation` on `::part(base)` because it can break the built-in fade-out.
- Keep toasts non-blocking (no focus trap and no required interaction).
- Imperative usage is required: create the element on trigger with `document.createElement('eds-toast')` and `appendChild`; never render toast as static markup.

# AVA

## Layout

- Use `ava-layout` as the primary container for AVA chat-style experiences.
- Use `header-actions` slot for utility actions such as New chat (`sl-icon-button`, optionally wrapped with `sl-tooltip`).
- Use `ava-input` in the `footer` slot for message entry and controls.
- Use `ava-welcome-message` for onboarding content and starter actions.
- For welcome actions, use `eds-button-card` buttons in a token-spaced container and append them in `ava-welcome-message` footer slot.
- Use `ava-user-message` and `ava-response-message` for runtime chat messages.
- Keep AVA copy concise and action-oriented per `content.md`; avoid long, dense response text in starter templates.

## Interaction
- Message lifecycle should be imperative: append/remove AVA message elements with DOM APIs rather than static JSX lists.
- On send (`ava-send`), follow this order:
  1. Append the user message element.
  2. Set `ava-layout.waiting = true` and disable `ava-input`.
  3. Append the response element.
  4. Set `ava-layout.waiting = false` and re-enable `ava-input`.
- After message updates, call `ava-layout.scrollToBottom()` in `requestAnimationFrame` to keep the latest message in view.


# Layout

## Layout guidance

- Use `eds-shell-template` for app-level chrome.
- Use `eds-application-layout` for resizable left/right work panels.
- Use `eds-panel-layout` for panel containers with optional header/footer.
- Use `eds-page-header` for page-level context and actions inside content.
- Keep landmark structure clear: nav in sidenav, app actions in appbar, content in main.
- Always confirm the web component host receives a real `class` attribute in rendered DOM.
- React: do not rely on `className` for custom elements when styling hooks are required; verify output on the host element. Use `useRef` to obtain a reference for imperative API calls (for example `ref.current.scrollToBottom()`).
- Angular: use `class` or `[ngClass]` on custom elements so styling hooks bind to the host class list. Use `@ViewChild` for imperative API access.
- If sizing or alignment rules appear ignored, inspect host attributes first (for example `class` vs `classname`) before changing tokenized layout styles.


## Portal layout
- Use portal layout primarily for navigation-focused experiences.
- Portal layout includes a fixed sidenav and appbar without application-level tabs.
- Use `eds-shell-template` for app-level chrome.
- Keep portal page bodies empty unless the user explicitly requests page content, controls, data, or messaging.
- Switch the fixed sidenav to `mode="collapsed"` at the compact breakpoint so navigation icons remain available; allow the EDS sidenav hover behavior to expand it.
- Use filled Material icons for portal sidenav items and register the Material icon library before rendering sidenav items that use `icon`.
- Always include small `sl-avatar` in the appbar with an accessible label and initials or an image.
- Use `eds-application-layout` for resizable left/right work panels.
- Use `eds-panel-layout` for panel containers with optional header/footer.
- Use `eds-page-header` for page-level context and actions inside content.
- Keep landmark structure clear: nav in sidenav, app actions in appbar, content in main.

## Application layout

- For application layout opened from app navigation, use `eds-shell-template` and omit the fixed `sidenav` slot.
- Implement `eds-appbar` in the `appbar` slot with `show-menu-button` and `is-application`.
- In the `icon` slot, use `sl-icon` with the Material icon set for the application glyph.
- In the `breadcrumb` slot, use `sl-breadcrumb` with a separator (`<span slot="separator">/</span>`) and `sl-breadcrumb-item` entries.
- In the `page-info` slot, use `eds-page-info` with `heading` set to the application page heading.
- In `eds-page-info`, place optional menu options in `heading-menu-items` using `sl-menu-item`.
- In `eds-page-info`, place optional state badges in the `badge` slot using `sl-badge`.
- In the `center` slot, use `sl-tab-group` for application-level tabs. Keep tab labels concise and noun-based.
- In the `right` slot, use concise utility actions such as `sl-button` and `sl-icon-button`.
- In the default content area (`main`), implement `eds-application-layout` as the primary layout container.
- For application pages, remove content-area padding and width constraints so the layout is full-bleed.
- Render `eds-application-layout` as a direct child of the application content area (avoid extra wrapper containers that can constrain sizing).
- Ensure `eds-application-layout` takes all available horizontal and vertical space (`inline-size: 100%`, `block-size: 100%`).
- Ensure slotted side panels also stretch vertically (`[slot='left-panel']` and `[slot='right-panel']` with `block-size: 100%`).
- Set `overflow-y: auto` on the left panel's scrollable content container so overflow content scrolls rather than wraps or overflows the panel boundary.
- Keep the right panel hidden by default and open it only from an explicit trigger in the main content area (for example, selecting a card or action item).
- Do not set `open-right` on initial `eds-application-layout` markup; add it only in response to an explicit user action.
- For all application pages, implement a modal `eds-sidenav` (use `mode="modal"`) and keep it hidden by default.
- Trigger the modal sidenav from the appbar menu button: provide a slotted menu button in `eds-appbar` (`slot="menu-button"`) and open the sidenav only on user click using `sidenav.show()`.
- Use the same navigation structure in the modal sidenav as the primary app sidenav (nodes, divider, section headings, and app items) to keep behavior consistent.
- On modal sidenav item click, navigate to the target route and then close the modal with `sidenav.hide()`.
- Support default modal dismissal behaviors (Esc key and outside click) and keep the sidenav focus-managed after opening.
- Prevent default-on-load visibility for modal sidenav (no automatic open during initialization; enforce hidden state before first user interaction).

## Page layout

- A page layout should include two clear regions: `page-header` and `page-content`.
- Use `eds-page-header` as the `page-header` region, and do not apply padding to it.
- Place all primary page body elements (cards, tables, forms, lists, charts) inside the `page-content` container.
- Do not place page body content directly beside the header without a `page-content` wrapper.
- Apply horizontal padding to `page-content` using `padding-inline: var(--sl-spacing-x-large)`.
- Apply vertical padding to `page-content` using `padding-block: var(--sl-spacing-large)`.
- Keep page-content spacing tokenized and scoped to the page container to avoid global side effects.
- When using `eds-application-layout` with a left side panel (`slot='left-panel'`), include a view-sidebar icon button in the page header: `<sl-icon-button slot="icon" library="material" name="view_sidebar" label="View sidebar"></sl-icon-button>`.
- The view-sidebar icon button should toggle `open-left` on `eds-application-layout`: remove the attribute when present to collapse the left panel, add it when absent to show the left panel.
- If tabs or a tree in `slot='left-panel'` drive main-region navigation, update the main-region content and the `eds-page-header` heading together from one active state.

## Dashboard layout
- Use dashboard layout to present independent data summaries through charts, tables, and KPIs.
- Organize related summaries in responsive cards that reflow across viewport sizes.
- Dashboard pages should be laid out in a multi-column grid
- Dashboards should be responsive and should wrap to fewer columns at narrow browser widths
- at large viewport widths, the charts themselves should get bigger, and should also grow in height maintaining the same aspect ratio
- KPI cards should be presented in a distinct, compact grid separate from chart cards
- KPI cards should contain a concise metric label, a prominent current value, and an optional status or change indicator
- KPI cards should be flexible width with a max-width of 15rem
- Use ECharts for charts and AG Grid Community for interactive tables.
- Set dashboard layout spacing to `padding-inline: var(--sl-spacing-x-large)`, `padding-block: 0`, and `gap: var(--sl-spacing-large)`.

### Full screen view

- Some card content can be specified to allow full screen view.
- Use a consistent icon button with an accessible label to enter full screen view. Label and tooltip should read "View full screen"
- Use a browser-viewport overlay rather than the monitor-level Fullscreen API.
- The active card must fill the browser viewport, remove rounded corners, and allow its main content to use the available vertical space.
- Replace the entry icon with an X close icon while full screen is active.
- Support Escape as an alternate way to close the full-screen view.

## Grid and Card layout

- Use approved card components (`sl-card`, `eds-selectable-card`, `eds-catalog-card`) based on behavior.
- Use `var(--sl-spacing-large)` for both horizontal and vertical spacing between cards (for example, `column-gap` and `row-gap` in card grids).
- Cards in the same row must render at equal height.
- If the card `base` part is styleable, set `::part(base) { height: 100%; }`.
- If the card is wrapped or its `base` is not directly styleable, use `grid-auto-rows: 1fr` and item wrapper `height: 100%`, then apply `::part(base) { height: 100%; }` inside the component boundary when possible.
- Verify card heights in the browser on at least two rows before finalizing.
- Enforce card width at grid track level (for example with tokenized minmax tracks).
- Keep card sizing and spacing tokenized.
- Use `grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));` for responsive grids that should automatically fit columns to the available width.

## Form layout

- Prefer single-column form flow; expand to two columns only when space and readability support it.
- Keep typical `sl-input`, `sl-select`, and other form controls at `max-width: 30rem`; do not use unconstrained `width: 100%` on the controls unless the design explicitly requires full-width fields.
- Use two spacing levels: section-to-section `var(--sl-spacing-x-large)` and control-to-control `var(--sl-spacing-medium)`. Do not use `var(--sl-spacing-3x-small)` or `var(--sl-spacing-2x-small)` as the default form field gap.
- Use separate wrappers for section spacing vs field spacing: the section wrapper owns `var(--sl-spacing-x-large)`, and the field wrapper owns `var(--sl-spacing-medium)`.
- Before finalizing a form, verify both the rendered control width and the measured vertical gap between two adjacent fields against these rules.