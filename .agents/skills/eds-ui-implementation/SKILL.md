---
name: eds-ui-implementation
description: "Use when building, modifying, reviewing, or restyling UI with the Emerson Design System, including forms, layouts, sidebars, headers, cards, dialogs, tables, charts, responsive UI, and accessibility fixes."
---

# EDS UI Implementation Skill

Use this skill whenever the task involves building, modifying, reviewing, or restyling UI in this repository using the Emerson Design System.

## When to use
- Creating or editing forms
- Building page layouts, headers, sidebars, cards, dialogs, tables, or charts
- Applying responsive styling or accessibility fixes to UI
- Reviewing whether UI follows EDS standards

## When not to use
- Backend-only changes
- Non-UI build tooling changes
- Pure data/model refactors with no rendered UI impact

## Required rules
- Use EDS and Shoelace components first
- Use token-only styling
- Use AG Grid Community for interactive data grids
- Use ECharts only with EDS theme binding
- Meet WCAG AA expectations
- Follow content guidelines for all UI language and communication displayed in UI components

## Required supporting files
- Read design.md
- Read accessibility.md
- Read content.md
- Read components.md

## Mandatory execution order
1. Read all four supporting files before proposing or writing UI code.
2. Extract required component rules for the specific request and list them in working notes.
3. Implement with EDS/Shoelace components first, then apply token-only styling.
4. Run a compliance self-check against the required component rules before finalizing.

## Definition of done for UI changes
- Required EDS components are used where mandated by `components.md` and `design.md`.
- No custom composition is used where an explicit EDS component requirement exists.
- Styling uses EDS/Shoelace tokens only for color, spacing, and typography.
- Accessibility and content checks from `accessibility.md` and `content.md` are satisfied.
