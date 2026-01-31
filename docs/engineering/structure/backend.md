# Backend Code Structure

This document defines how backend code is organized.

## Core Concepts

- Transport, domain logic, and infrastructure are separated.
- Domain logic must not depend on HTTP framework details.
- Authentication is handled at the boundary, not inside domain logic.

## Rules

- HTTP handlers are thin adapters.
- Business rules live outside route definitions.
- Shared utilities must not encode domain assumptions.
