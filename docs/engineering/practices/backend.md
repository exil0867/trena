# Backend Practices

This document describes backend coding conventions and habits.

## Principles

- Validate input at the boundary.
- Keep handlers small and composable.
- Fail early and explicitly.

## Validation

- Request validation is mandatory.
- Domain logic must assume validated input.
