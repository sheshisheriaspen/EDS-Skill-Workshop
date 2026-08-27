# EDS Accessibility Guidelines

Use these guidelines whenever you build, review, or restyle UI in this repository.

This document focuses on WCAG developer practices you apply directly in code and component design. It is not a replacement for formal accessibility audits.

## Core rules
- Meet WCAG 2.x Level AA expectations for all UI states and flows.
- Treat accessibility as a default requirement from the start.
- Do not rely on color alone to communicate meaning, status, selection, or errors.
- Prefer semantic HTML and native controls before custom ARIA-based widgets.

## Navigation
### Keyboard support
- All functionality must be usable by keyboard only.
- Ensure every interactive control is focusable.
- Keep tab order logical and aligned with the visual order.
- For custom widgets, implement expected key behavior (for example arrow keys to navigate options and Enter/Space to activate).

### Skip links and landmarks
- Provide a skip link to jump to the main content region.
- Use semantic landmarks: header, nav, main, aside, and footer.
- Keep landmark structure clear and avoid incorrect nesting.
- Treat landmarks/regions as structural containers, not interactive controls; avoid making entire regions focusable.

### Headings
- Use one H1 for the page title.
- Use heading levels in order (H2 under H1, H3 under H2, and so on).
- Do not use headings for visual style only.

## Semantics
- Use native elements where possible: button, a, form, table, ul/ol/dl.
- Avoid generic div/span with role when a native element exists.
- Use sectioning elements to communicate page structure.

## Visual requirements
### Contrast and color
- Keep text contrast at least 4.5:1 for normal text and 3:1 for large text.
- Validate contrast with tooling during implementation.
- Add non-color cues for meaning (text, icon, pattern, or shape).

### Text resize and reflow
- Content must remain readable and usable at 200% text resize.
- Content should reflow without horizontal scrolling at high zoom where expected (for example 400% on narrow viewports).
- Use relative sizing and flexible layouts; avoid fixed widths/heights that clip content.

### Token-only styling
- Use EDS and Shoelace tokens for spacing, typography, focus, and color.
- Avoid hardcoded accessibility colors and arbitrary sizing in accessibility-related styling.
- Prefer these tokens: var(--eds-text-default), var(--eds-text-secondary), var(--eds-text-link), var(--eds-border-default), var(--eds-background-default), var(--eds-background-weak).
- Use tokenized spacing and type scales such as var(--sl-spacing-medium), var(--sl-spacing-x-large), var(--sl-font-size-small), var(--sl-font-size-medium), var(--sl-font-size-large), var(--sl-font-size-2x-large).

## Content and media
### Text alternatives
- Provide alt text for informative images.
- Use empty alt (alt="") for decorative images.
- Ensure controls have accessible names (visible label, aria-label, or aria-labelledby).
- Provide captions/transcripts for audio and video where applicable.

### Sensory characteristics
- Avoid instructions based only on color, shape, size, location, or sound.
- Include explicit text labels or additional cues.

## Forms and interactions
### Labels and input help
- Every form control must have a programmatically associated label.
- Do not use placeholder text as the only label.
- Associate helper and error text with fields using aria-describedby when needed.

### Grouping and required fields
- Group related controls semantically.
- Use fieldset and legend for grouped native form controls when appropriate.
- Mark required fields visually and semantically.

### ARIA usage
- Use ARIA only when native semantics are unavailable.
- Use aria-expanded and aria-controls for disclosure patterns.
- Use aria-hidden="true" for decorative elements.
- Use role="alert" for urgent messages that must be announced immediately.

### Error handling
- Make error text visible and understandable.
- Programmatically associate errors to fields.
- Move focus to the first invalid field after failed submit.
- Explain how to fix each error.

### Dynamic content and focus
- Announce updates using live regions where needed (status/alert).
- Manage focus for dialogs and other dynamic UI: move focus in on open and restore on close.
- Preserve visible focus indicators for all interactive controls.

## Localization
- Set the page language with the lang attribute on html.
- Update language metadata when language changes dynamically.
- Mark inline language changes on specific content when needed.

## EDS component expectations
- Use EDS and Shoelace form components first: eds-input, eds-textarea, eds-select, eds-option, eds-checkbox, sl-radio, sl-radio-group, eds-switch, eds-button.
- Keep keyboard access and visible focus intact when styling components.
- Use AG Grid Community for interactive grids.
- Bind ECharts colors and typography to EDS theme tokens.

## Review checklist
- Keyboard-only flow works end to end.
- Skip link and landmarks are present and correct.
- Heading order is valid and semantic structure is clear.
- Labels, help text, and errors are programmatically associated.
- Required fields are both visual and semantic.
- Errors are visible, announced, and actionable.
- Focus is visible and correctly managed during dynamic changes.
- Contrast and non-color cues meet requirements.
- Zoom/reflow behavior remains readable and operable.
- Language metadata is set correctly.
