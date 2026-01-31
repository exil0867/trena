# Backend Architecture

This document defines the high-level architectural assumptions of the Trena backend.

## Scope

- Runtime and execution model
- API responsibility boundaries
- Authentication assumptions

## Assumptions

- The backend is a cloud-hosted service.
- Authentication is stateless and token-based.
- Domain logic is decoupled from transport concerns.
- Persistence is owned by the backend.

## Non-Goals

- HTTP framework specifics
- Database schema details
- Deployment mechanics
