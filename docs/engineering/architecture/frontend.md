# Frontend Architecture

This document defines the high-level architectural assumptions of the Trena frontend.

## Scope

- Runtime environment and platform assumptions
- Architectural boundaries between routing, modules, and shared code

## Assumptions

- The frontend is a client application consuming a backend API.
- Routing is file-based and declarative.
- Business logic is module-owned, not globally shared.
- UI primitives are dependency-free and reusable.

## Non-Goals

- Detailed folder structure (see structure/frontend.md)
- Styling or UX decisions
- Component-level conventions
