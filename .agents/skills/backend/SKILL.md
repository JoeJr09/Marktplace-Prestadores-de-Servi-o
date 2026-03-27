---
name: backend
description: Use this skill for Node.js + TypeScript backend work including API design, controller/service/repository architecture, request validation, error handling, persistence coordination, configuration, and maintainable service evolution.
---

# Backend Specialist

## Purpose

Own the design and implementation of a production-grade Node.js + TypeScript backend.

Build APIs and backend services that are explicit, validated, testable, and easy to evolve. Keep transport, business logic, persistence, and configuration concerns cleanly separated. Prefer simple, scalable patterns over overengineered frameworks.

## When to use this skill

Use this skill for:
- new API routes or endpoint changes
- request/response contract design
- controller/service/repository organization
- backend domain logic implementation
- input validation and error modeling
- authentication-aware behavior when relevant
- persistence integration and repository design
- pagination/filtering/sorting patterns
- backend refactors to improve maintainability
- observability, logging, and operationally aware backend behavior

## Ownership boundaries

This skill owns:
- API route design
- controller/service/repository separation
- request validation and parsing
- response consistency
- status code correctness
- backend-side business rule placement
- repository contracts and data access coordination
- backend configuration patterns
- backend logging and basic observability practices
- backend testability and maintainable evolution of APIs

## Non-responsibilities

This skill does not own:
- final database engine selection or schema strategy without DBA involvement
- frontend UI concerns
- CI/CD or infrastructure policy
- release management ownership
- product prioritization

Coordinate with DBA, Frontend, QA, DevOps, and Tech Lead when those concerns matter.

## Backend philosophy

Design the backend around clear boundaries.

Default layering:
- route
- controller
- service
- repository
- domain/schema/validation modules as needed

Principles:
- controllers translate transport concerns
- services own business logic and orchestration
- repositories own persistence access
- validation happens at boundaries
- configuration is centralized and typed
- errors are modeled intentionally
- responses are consistent within an API family

Avoid:
- business rules hidden in controllers
- persistence details leaking into route handlers
- direct database access scattered through services and controllers
- unvalidated input reaching domain logic
- ad hoc response shapes from endpoint to endpoint
- deep abstractions with little payoff

## Recommended organization

Follow the repository’s existing layout first. When creating or extending backend structure, keep it explicit and predictable.

### Routes
- define endpoint paths and middleware wiring
- keep routes thin
- avoid embedding business logic in route definitions

### Controllers
- parse request input already validated or narrowed
- call services
- map service results to transport responses
- do not embed business rules or persistence logic
- keep controller code straightforward and shallow

### Services
- own use-case logic and orchestration
- enforce business rules
- coordinate repositories, external services, and domain logic
- return stable result shapes or domain errors
- do not depend on HTTP details unless the architecture explicitly requires it

### Repositories
- own data access
- expose methods framed in domain terms, not raw query fragments
- keep persistence concerns localized
- do not leak database-specific assumptions further up the stack without need
- collaborate with DBA on query patterns, indexes, and model constraints

### Schemas and validation
- validate external input at the boundary
- validate params, query, body, and relevant headers as needed
- use the repository’s established validation approach consistently
- when establishing a pattern, prefer typed schema validation
- reject invalid requests early with clear error responses

### Domain modules
- keep domain rules explicit
- use clear types and data shapes
- avoid stuffing all logic into generic service utilities

## Request validation standards

Every externally sourced input should be treated as untrusted.

Validate:
- path parameters
- query parameters
- request bodies
- webhook or third-party payloads
- auth-derived claims if assumptions are critical to behavior

Good validation should:
- fail early
- return actionable client-facing error information without leaking internals
- narrow types for downstream code
- prevent invalid data from entering business logic

Do not rely on TypeScript types alone for runtime safety.

## Response consistency standards

Within a given API surface, keep responses consistent and predictable.

Use existing repository conventions first. If no pattern exists, use:
- success: resource payload directly for simple reads, or `{ data, meta }` when metadata matters
- error: `{ error: { code, message, details? } }`

Guidelines:
- keep field names stable
- do not return mixed shapes for the same kind of endpoint without a strong reason
- include pagination metadata where relevant
- use explicit, documented defaults for filtering and sorting
- avoid exposing internal persistence details unless intentionally part of the contract

## Status code standards

Use status codes intentionally:
- `200` for successful reads/updates returning content
- `201` for successful creation
- `204` for successful operations with no body
- `400` for malformed or invalid requests when no more specific code fits
- `401` for unauthenticated access
- `403` for authenticated but unauthorized access
- `404` when the resource truly is not found
- `409` for meaningful conflicts
- `422` when semantic validation rules warrant it and the API already uses it
- `429` for rate-limited behavior when applicable
- `5xx` only for real server-side failures

Do not use `500` as a catch-all for expected business-rule outcomes.

## Error modeling

Model errors deliberately.

Prefer:
- domain/application errors with stable codes
- centralized mapping from internal errors to HTTP responses
- clear separation between expected errors and unexpected failures
- structured logging for unexpected failures

Avoid:
- throwing raw database errors to clients
- endpoint-specific improvised error formats
- swallowing errors without observability
- using exceptions for ordinary control flow when a result type or explicit branch is cleaner

## Pagination, filtering, and sorting

When list endpoints need more than a simple dump:
- define explicit query parameters
- validate allowed fields and values
- set stable defaults
- cap page size or limit
- document sort direction and default ordering
- keep response metadata consistent
- coordinate with DBA when query shape affects indexing or performance

## Configuration and environment handling

- centralize config access
- validate required environment variables at startup
- use typed configuration objects
- avoid reading `process.env` throughout the codebase
- separate environment-specific behavior cleanly
- fail fast when required configuration is missing or malformed

Never:
- hardcode secrets
- log secrets or sensitive configuration
- commit credentials or environment files

## Logging and observability basics

Backend code should support debugging and operations.

Minimum expectations:
- log unexpected failures with enough context to diagnose
- prefer structured logs
- avoid noisy logs for normal control flow
- include request or correlation context when the stack supports it
- do not log sensitive payloads carelessly

For behavior that matters operationally:
- expose meaningful health/readiness behavior if the service pattern requires it
- coordinate with DevOps for metrics, alerts, and deployment-facing implications

## Coordination rules

### DBA
Consult DBA when:
- choosing MongoDB vs PostgreSQL
- creating or changing schemas
- introducing relationships or denormalization
- adding indexes
- changing query-heavy paths
- planning migrations or data backfills

Backend owns repository interfaces and service logic; DBA owns data-model quality and database reasoning.

### Frontend
Coordinate on:
- request and response contracts
- validation error shapes
- pagination/filtering/sorting semantics
- auth-related expectations
- loading/error state support
- backward compatibility during API changes

Do not surprise the frontend with silent contract changes.

### QA
Coordinate on:
- acceptance criteria
- expected behavior for happy paths and failure paths
- what needs unit, integration, or API-level testing
- regression-sensitive changes
- test data/setup needs

### DevOps
Coordinate on:
- environment variables and secrets
- service startup behavior
- deployment-sensitive changes
- migrations in release flow
- logging and operational implications
- container/build/runtime assumptions

### Tech Lead
Coordinate when:
- the task spans multiple domains
- a new backend pattern is being introduced
- the API change has architecture or sequencing implications
- there are unresolved tradeoffs

## Validation checklist

Before considering backend work complete:
- relevant linting passed
- relevant type checking passed
- relevant backend tests passed
- affected app/service build succeeded
- request validation exists for new or changed inputs
- success and failure responses were verified
- status codes are intentional and consistent
- errors are modeled and not leaking internals
- config changes are documented and safe
- repository/data-access changes were reviewed with DBA when needed
- API contract changes were aligned with frontend when relevant
- operational or migration implications were raised to DevOps when relevant

If anything was not validated, state exactly what remains unverified.

## Definition of done

Backend work is done only when:
- the requested backend behavior exists and is correct
- transport, business logic, and persistence concerns are properly separated
- input validation is present and meaningful
- responses and errors are consistent
- configuration handling is safe and maintainable
- data-layer implications were coordinated appropriately
- validation passed for the impacted scope
- the implementation remains simple, clear, and scalable without unnecessary abstraction