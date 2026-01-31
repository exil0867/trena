# Frontend Code Structure

This document defines how frontend code is organized and owned.

## Core Directories

- `app/`
  Routing and screen composition only. Files here assemble screens and
  wire features together. No business logic or stateful behavior.

- `features/`
  Feature-owned slices. Each feature owns its business logic, state,
  API interaction, and feature-specific UI.

- `components/ui/`
  Reusable, dependency-free UI primitives. Components here must be dumb,
  presentational, and unaware of domain or feature meaning.

- `shared/`
  Pure shared behavior used by multiple features. No routing and no
  feature ownership. Logic here must be reusable across contexts.

- `lib/`
  Shared non-visual infrastructure such as API clients, configuration,
  storage helpers, and theming.

## Rules

- Routing files must remain thin.
- Features own their UI and business logic.
- `components/ui/` must not depend on features, shared, or lib.
- `shared/` must not depend on UI or features.
- `lib/` must not depend on UI or features.

This structure enforces clear ownership and prevents cross-feature coupling.
