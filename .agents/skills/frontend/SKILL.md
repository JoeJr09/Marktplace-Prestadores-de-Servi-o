---
name: frontend
description: Use this skill for React + Vite + TypeScript frontend work including UI architecture, component design, Figma-to-code implementation, accessibility, responsiveness, performance, and backend API integration.
---

# Frontend Specialist

## Purpose

Own the translation of product and design requirements into production-ready frontend code.

Build React + Vite + TypeScript interfaces that are reusable, accessible, responsive, performant, and maintainable. Favor UI systems over one-off screens. Favor clean composition over large monolithic components.

## When to use this skill

Use this skill for:
- new pages, routes, flows, or screens
- component architecture and reusable UI
- Figma-to-code implementation
- frontend state management decisions
- forms and client-side validation
- frontend API integration
- accessibility and responsiveness improvements
- frontend performance issues
- design consistency and UI cleanup
- refactoring unstable or overgrown frontend code

## Ownership

This skill owns:
- route and page composition
- component decomposition and reusable UI primitives
- frontend folder structure decisions within the existing project style
- frontend state boundaries
- hooks for reusable client-side behavior
- UI-facing service/adaptor layers for backend communication
- styling consistency, spacing, typography, and design-token application
- accessibility and responsive behavior by default
- frontend loading, empty, error, and success states

## Non-responsibilities

This skill does not own:
- backend business logic
- database design
- deployment pipelines or infrastructure
- environment/release policy
- product prioritization
- inventing new API behavior without backend coordination

When those concerns are relevant, coordinate with Backend, DBA, DevOps, QA, or Tech Lead.

## Frontend philosophy

Build interfaces as systems, not screenshots.

Default priorities:
1. correctness and usability
2. maintainability and reuse
3. accessibility and responsiveness
4. visual consistency
5. performance where it matters

Prefer:
- small focused components
- clear boundaries between page, feature, and shared UI
- explicit data flow
- reusable styling and tokens
- composition over giant prop-driven components
- local state first
- stable typed interfaces at boundaries

Avoid:
- giant components that do everything
- feature logic scattered across pages
- styling drift
- hardcoded magic values repeated throughout the UI
- coupling components directly to raw backend transport details
- copying Figma frames literally without extracting reusable patterns

## Default structure guidance

Follow the repository’s existing structure first. If creating or expanding structure, use these defaults consistently:

### Pages
- route-level composition only
- assemble features, layout, and page data needs
- do not bury large business or presentation logic in page files
- keep page files thin and easy to scan

### Components
- use for reusable visual building blocks
- keep one clear responsibility per component
- keep props focused and typed
- prefer composition and explicit variants over boolean-prop explosions
- split components when a file mixes layout, logic, and multiple sub-concerns

### Features
- group feature-specific UI, hooks, types, and service adapters together
- keep feature internals out of shared folders until reuse is real
- promote code to shared only after repeated use is clear

### Hooks
- use for reusable stateful or side-effectful client logic
- prefix with `use`
- keep hooks centered on one concern
- avoid hooks that hide too much behavior or mutate unrelated state
- hooks should not return unstable, confusing APIs

### Services
- isolate API calls, request/response adaptation, and transport concerns
- do not scatter raw `fetch` or client calls throughout components
- normalize backend quirks at the service boundary
- keep services free of JSX and presentational concerns

### Utils
- only for pure helpers with broad reuse
- do not turn `utils` into a dumping ground
- if logic is domain-specific, keep it with the domain or feature

### Types
- define types close to the feature that owns them
- separate API DTOs from UI view models when they differ
- extract shared types only when multiple consumers genuinely need them
- prefer explicit prop and state types over vague object shapes

### Assets
- keep static assets organized and named clearly
- optimize large assets where appropriate
- do not duplicate similar icons/images across features without reason

## Component rules

- Each component should have a clear role: primitive, composed UI block, or page-level composition.
- Keep presentational components as stateless as practical.
- Push non-UI concerns into hooks, services, or feature modules.
- Prefer semantic prop names that reflect domain intent.
- Prefer explicit variants over brittle style condition chains.
- Avoid component APIs that require callers to understand internal implementation details.
- When a component grows large, split by responsibility, not arbitrarily.

A component likely needs to be split when:
- it mixes data fetching, heavy state, layout, and rendering details
- it renders multiple distinct conceptual sections
- prop count keeps growing
- multiple branches handle unrelated behaviors
- it becomes difficult to test or reason about

## State management rules

Use the simplest state model that fits the problem.

Default order:
1. local component state
2. lifted state within a feature or page
3. shared context for stable cross-tree concerns
4. dedicated global state only for true cross-route or app-wide needs

Guidelines:
- keep server state separate from local UI state
- avoid duplicating the same source of truth in multiple places
- derive state when possible instead of storing duplicate computed values
- do not introduce global state for convenience alone
- make state ownership obvious

## Figma-to-code guidance

Do not copy screens blindly.

When implementing from Figma:
- identify reusable patterns before writing code
- extract design tokens from repeated values: spacing, typography, color roles, radius, shadows, borders, z-index levels
- recognize component variants and states rather than cloning frame-by-frame
- build primitives and composed components that can serve multiple screens
- preserve layout intent, not absolute pixel worship
- account for interaction states: hover, focus, active, disabled, loading, empty, error
- account for responsive behavior, not just a single canvas size
- use semantic HTML even when the design file does not express it
- fill missing design details with system-consistent decisions, not random guesses

Red flags:
- hardcoded one-off spacing values everywhere
- repeated screen-specific wrappers instead of reusable layout primitives
- each page recreates the same button/card/form patterns
- visual fidelity is high but accessibility and responsiveness are weak

## Styling strategy

Follow the styling approach already established in the repository. Do not mix multiple styling paradigms in the same feature without a strong reason.

Regardless of the styling tool:
- centralize design tokens
- use consistent spacing and typography scales
- prefer semantic token names over raw color literals
- avoid magic numbers repeated across files
- keep layout primitives and shared patterns reusable
- avoid inline styles except for tightly scoped dynamic values
- keep styles close enough to the component to remain maintainable

Design-token thinking should cover:
- color roles
- spacing scale
- typography scale
- border radius
- elevation/shadow
- breakpoints
- motion and transition defaults where relevant

## Accessibility requirements

Accessibility is default behavior, not polish work.

At minimum:
- use semantic HTML first
- support keyboard navigation
- keep visible focus states
- associate labels with inputs
- use correct button/link semantics
- provide alt text where appropriate
- add ARIA only when semantic HTML is insufficient
- avoid inaccessible custom controls when native elements fit
- ensure error states and required fields are communicated clearly
- maintain reasonable contrast and readable hierarchy

## Responsiveness requirements

Responsive behavior is required unless the task explicitly says otherwise.

Default expectations:
- support small mobile widths through large desktop widths
- avoid horizontal overflow
- preserve readable spacing and hierarchy across breakpoints
- do not hide broken layouts behind a single desktop implementation
- verify common layout states for forms, lists, cards, tables, and nav patterns
- make touch targets reasonable on smaller screens

## Performance expectations

Optimize where it improves user experience or prevents obvious waste.

Prefer:
- route or feature code-splitting where beneficial
- memoization only when needed, not by habit
- efficient list rendering
- minimizing unnecessary re-renders
- keeping expensive transformations out of render paths
- optimized image and asset usage

Do not trade maintainability for speculative micro-optimizations.

## Backend integration rules

Coordinate API contracts with Backend.

Guidelines:
- keep transport details in services or dedicated adapters
- type request and response boundaries
- handle loading, empty, error, retry, and stale states intentionally
- do not couple UI components directly to raw backend response peculiarities
- document or flag contract mismatches instead of silently coding around them
- when backend contracts are unclear, align before spreading assumptions across the UI

## Naming and file organization

- Keep names aligned with domain language and existing repository patterns.
- Use `PascalCase` for React component files and component/type names.
- Use `camelCase` for hooks, helpers, and variables.
- Use clear, stable filenames based on responsibility.
- Keep tests near the components or features they validate when that matches repository style.
- Avoid deep nesting without meaningful structure.

## Coordination with other specialists

### Backend
Coordinate on:
- API contracts
- validation and error payloads
- pagination/filtering/sorting behavior
- auth-aware UI expectations
- loading/error state semantics

### QA
Coordinate on:
- acceptance criteria
- critical user flows
- edge cases and regression-sensitive areas
- test coverage expectations
- what must be manually verified versus automated

### DevOps
Coordinate on:
- environment-based frontend configuration
- build implications
- asset pipeline concerns
- deployment-sensitive frontend routing or runtime config issues

### Tech Lead
Coordinate when:
- architecture is changing
- work spans multiple layers
- design decisions affect shared patterns
- there are tradeoffs around reuse, deadlines, or implementation strategy

## Validation checklist

Before considering frontend work complete:
- relevant linting passed
- relevant type checking passed
- relevant frontend tests passed
- affected app/build succeeded
- no obvious console errors or warnings in changed flows
- loading, empty, error, and success states were verified where relevant
- keyboard accessibility and focus behavior were checked for changed UI
- responsive behavior was checked for impacted screens/components
- API integration was verified against expected contracts
- changed UI matches design intent without copying screens blindly
- any new reusable patterns are consistent with the existing design system

If any validation could not be run, state exactly what remains unverified.

## Definition of done

Frontend work is done only when:
- the requested experience is implemented correctly
- the UI is composed from clean, reusable, well-named pieces
- state and service boundaries are clear
- Figma or product intent was translated into a maintainable UI system, not a one-off screen copy
- accessibility and responsiveness were treated as defaults
- backend integration is typed and intentional
- validation passed for the impacted scope
- no unnecessary abstractions, dependencies, or styling drift were introduced