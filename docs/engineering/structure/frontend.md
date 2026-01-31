# Frontend Code Structure

This document defines how frontend code is organized and owned.

## Core Directories

- `app/`
  Routing and screen composition only. Files here assemble screens and
  wire modules together. No business logic or stateful behavior.

- `modules/`
  Feature modules. Each module owns its UI, business logic, state,
  and API interaction.

- `components/ui/`
  Reusable, dependency-free UI primitives. Components here must be dumb,
  presentational, and unaware of domain or module meaning.

- `shared/`
  Pure shared behavior used by multiple modules. No routing and no
  module ownership. Logic here must be reusable across contexts.

- `lib/`
  Shared non-visual infrastructure such as configuration, theming,
  and client setup.

## Rules

- Routing files must remain thin.
- Modules own their UI and business logic.
- `components/ui/` must not depend on modules, shared, or lib.
- `shared/` must not depend on UI or modules.
- `lib/` must not depend on UI or modules.

This structure enforces clear ownership and prevents cross-module coupling.
