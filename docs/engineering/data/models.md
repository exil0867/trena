# Data Models

This document defines the currently implemented domain entities in Trena.

## Scope

- Existing domain entities
- Ownership and invariants

## Current Entities

### User

Represents a persistent account in the Trena system.

Core fields:
- `id`
- `email` (required, unique)
- `username` (required, unique)
- `createdAt`
- `updatedAt`

Notes:
- Users own all fitness-related data.
- Authentication details are not part of the domain model.

## Evolution

New entities are added to this document only when implemented.
