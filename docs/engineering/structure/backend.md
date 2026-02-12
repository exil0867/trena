# Backend Code Structure

This document defines how backend code is organized and owned.

## Mental Model

The backend is a feature-modular monolith.

Each feature is isolated in its own module and owns:
- its routes
- its business logic
- its persistence access
- its validation and types

There is no global business logic layer.

## Core Directories

- `modules/`
  Feature modules. Each module represents a bounded feature and owns
  all code related to that feature.

  Inside a module:
  - `routes/` — HTTP handlers and request adaptation
  - `logic/` — business rules and workflows
  - `repo/` — persistence access for the feature
  - `validation/` — request and input validation
  - `types/` — feature-specific types
  - `impl/` — infrastructure helpers specific to the feature

- `middleware/`
  Cross-cutting HTTP concerns such as authentication and request context.
  No business logic.

- `lib/`
  Shared infrastructure such as database clients and environment handling.

- `infrastructure/`
  External system setup such as database migrations and low-level tooling.

- `shared/`
  Generic, domain-agnostic helpers reused across modules.

- `index.ts`
  Application entry point and wiring.

## Rules

- Routes must remain thin and delegate to module logic.
- Business rules live in `modules/<feature>/logic`.
- Feature logic must not leak into other modules.
- `shared/` must not contain domain or business rules.
- Infrastructure must not depend on feature logic.

This structure minimizes global coupling and keeps feature ownership explicit.
