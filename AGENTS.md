# Repository Agent Instructions

## Purpose

This file defines the repository-wide engineering contract for all agents working in this codebase.

Read this file before planning or changing code. Then load the relevant specialist skill from `.agents/<specialist>/SKILL.md` for domain-specific execution.

This file sets global rules. Specialist skills add domain depth. If a future subdirectory contains its own `AGENTS.md`, that local file refines instructions for files in that subtree, but this root file still applies globally.

## Repository overview

This is a production-oriented TypeScript repository with a multi-agent workflow.

Core areas:
- Frontend: React + Vite + TypeScript
- Backend: Node.js + TypeScript
- QA/Test Engineering
- DBA/Data Architecture
- DevOps/Platform
- Tech Lead / Agent Orchestrator

Primary goal:
- deliver minimal, clean, scalable changes
- preserve maintainability
- validate before concluding work
- avoid unnecessary architectural churn

## Instruction hierarchy

Use instructions in this order:
1. This root `AGENTS.md`
2. The relevant specialist skill in `.agents/<specialist>/SKILL.md`
3. Any more local `AGENTS.md` that applies to the files being changed
4. Existing repository conventions already present in the code

If rules conflict:
- follow the more local file for local implementation details
- follow this root file for repository-wide engineering standards
- escalate cross-cutting ambiguity to the Tech Lead skill

## Collaboration model

### Tech Lead / Agent Orchestrator
Use for broad, ambiguous, or cross-functional work. This role breaks work into streams, sequences dependencies, routes to the right specialists, and keeps architecture coherent.

### Frontend specialist
Owns user-facing React/Vite/TypeScript implementation, component architecture, accessibility, responsiveness, UI consistency, and frontend integration patterns.

### Backend specialist
Owns API design, backend architecture, validation, business logic placement, persistence coordination, error handling, and service quality.

### QA specialist
Owns validation strategy, risk-based testing, acceptance criteria verification, regression protection, and quality gates.

### DBA specialist
Owns database selection guidance, data modeling, schema quality, relationships, constraints, indexes, migration thinking, and persistence-layer design input.

### DevOps specialist
Owns CI/CD, environment safety, secrets handling, build/release workflows, deployment safety, and infrastructure-aware operational practices.

## When to stay global vs when to defer to a specialist

Stay within global repository guidance when:
- the change is small and local
- the work follows an existing pattern with low domain risk
- no architectural, data, infrastructure, or cross-layer decision is being introduced

Defer to a specialist skill when:
- UI structure, design translation, accessibility, or responsive behavior changes
- API shape, validation, business logic, or persistence behavior changes
- data model, database choice, indexes, migrations, or integrity concerns arise
- test scope, regression risk, or validation strategy needs explicit design
- CI/CD, environment, release, secrets, or operational safety is affected
- the task spans multiple layers or introduces a new pattern

Use the Tech Lead skill when:
- the request is broad
- multiple specialists are needed
- there are competing technical directions
- sequencing matters
- acceptance criteria are incomplete or unclear

## Planning before implementation

For anything beyond a small local fix, create a brief plan before editing:
- objective
- affected areas
- dependencies
- risks and assumptions
- validation approach

Do not start wide refactors or architecture changes without a clear reason tied to the requested outcome.

## Engineering contract

### Scope discipline
- Keep changes focused on the requested problem.
- Do not refactor unrelated areas unless necessary for correctness or maintainability.
- Prefer extending existing patterns over introducing parallel ones.
- Make the smallest change that solves the problem well.
- Preserve backward compatibility unless the task explicitly requires a breaking change.

### Architecture discipline
- Prefer simple, explicit, composable designs.
- Keep responsibilities separated by layer and domain.
- Do not mix UI, transport, business rules, persistence, and infrastructure concerns.
- Avoid clever abstractions that hide behavior or make debugging harder.
- Introduce new architectural patterns only when the current approach clearly fails the use case.

### TypeScript standards
- Use TypeScript as a design tool, not just a compiler gate.
- Prefer explicit types at boundaries and inferred types internally when clear.
- Avoid `any`. Use `unknown` at unsafe boundaries and narrow it properly.
- Avoid broad type assertions unless they are justified and localized.
- Model domain concepts with clear names and stable shapes.
- Keep shared types intentional; do not create accidental tight coupling across layers.

### Naming conventions
- Use clear domain-driven names.
- Prefer full words over cryptic abbreviations.
- Use:
  - `PascalCase` for React components, classes, and type/interface names
  - `camelCase` for functions, variables, hooks, and object properties
  - `UPPER_SNAKE_CASE` for environment-derived constants
  - `kebab-case` for non-component filenames unless the framework or existing repo pattern dictates otherwise
- Name modules by responsibility, not implementation trivia.

### Folder organization
- Follow existing repository structure first.
- Keep code organized by stable boundaries such as app, feature, or domain.
- Keep related files close together.
- Separate shared code from feature-specific code.
- Avoid dumping unrelated logic into broad utility folders.
- Prefer predictable locations for tests, types, validation, and configuration.

### Documentation expectations
- Update documentation when behavior, setup, contracts, or operations change.
- Record important architectural decisions when introducing or changing shared patterns.
- Document migrations, environment changes, and manual rollout steps when relevant.
- Keep docs concise and operationally useful.

## Code quality expectations

All code should be:
- readable without hidden assumptions
- easy to test
- easy to remove or extend
- safe at boundaries
- aligned with repository conventions

Prefer:
- small focused modules
- thin transport layers
- explicit validation
- centralized configuration handling
- reusable primitives over duplication
- targeted comments explaining why, not narrating what

Avoid:
- giant files
- overly generic helper dumping grounds
- hidden side effects
- duplicated business rules across layers
- dead code
- commented-out code
- TODOs without context or tracking

## Validation requirements before concluding work

Run the repository’s standard validation commands for every impacted area. At minimum, verify the changed scope with the repo’s actual tooling for:
- formatting or linting
- type checking
- automated tests relevant to the change
- build/compile success for the affected package or app

Also verify behavior-specific concerns:
- frontend changes: states, responsiveness, accessibility basics, and console cleanliness
- backend changes: validation, error paths, contract consistency, and relevant test coverage
- data changes: schema correctness, migration safety, and query/index impact
- DevOps changes: build/release implications, environment safety, and rollback awareness

Do not report work as complete if required validation was skipped. If something could not be run, state exactly what was not verified and why.

## Git hygiene, commits, and pull request expectations

### Commits
- Keep commits focused and logically grouped.
- Prefer small, reviewable changes over large mixed commits.
- Use clear commit messages.
- Use Conventional Commits for every commit created by any agent working in this repository.
- All commit headers must be written in English.
- Use this format:
  - `type(scope): subject`
- Use lowercase `type` and `scope`.
- Write `subject` in English, in the imperative mood, without a trailing period.
- `scope` is required whenever the affected area is identifiable, such as `frontend`, `backend`, `auth`, `users`, `ui`, `shared`, `qa`, `devops`, `build`, or `repo`.
- Each commit must represent one logical and reviewable unit of work.
- Do not mix unrelated feature, refactor, cleanup, and infrastructure work in the same commit unless there is a clear dependency that makes separation misleading.

Use these commit types consistently:
- `feat`: add a new feature or expand user-visible behavior
- `fix`: correct a bug or broken behavior
- `refactor`: change internal structure without intended behavior change
- `docs`: create, update, or remove documentation
- `test`: add or adjust automated tests or validation assets
- `build`: change build tooling, bundling, compiler, or package build behavior
- `ci`: change CI/CD workflows or automation
- `chore`: repository maintenance, housekeeping, or non-functional support work
- `perf`: improve performance without changing intended behavior
- `style`: formatting-only changes with no behavioral impact
- `revert`: revert a previous commit

Use subject verbs to make intent explicit:
- creation or addition work should usually start with verbs such as `add`, `create`, `introduce`, or `implement`
- deletion or removal work should usually start with verbs such as `remove`, `delete`, or `drop`
- updates or improvements should usually start with verbs such as `update`, `improve`, `align`, `refine`, or `adjust`
- fixes should usually start with verbs such as `fix`, `correct`, `prevent`, or `handle`

Breaking changes must be explicit:
- use `!` in the header when a commit introduces a breaking change, for example `feat(api)!: rename user identifier field`
- include a `BREAKING CHANGE:` footer in the commit body when the contract impact needs explanation

Commit quality gates for all agents:
- commit only after validation relevant to the changed scope has been run or explicitly reported as unavailable
- QA is the final quality gate for confirming that commit grouping and validation are coherent before concluding the work
- do not create placeholder commits such as `update stuff`, `misc changes`, `wip`, or similar vague messages
- do not hide breaking changes, risky deletions, or cross-layer contract changes behind generic commit text
- do not create personal variations of the commit format; all agents must use the same convention in all repository work

### Pull requests
Every PR should make it easy to understand:
- what changed
- why it changed
- affected areas
- validation performed
- follow-up risk or rollout considerations
- dependency, schema, environment, or migration changes

Do not mix unrelated changes in one PR.

## Dependency changes

- Do not add or upgrade dependencies without a clear reason.
- Prefer existing repository tooling when it solves the need well.
- Evaluate dependency cost: maintenance, bundle size, security, lock-in, and overlap with existing tools.
- Keep dependency changes scoped and documented.
- Coordinate infra-sensitive or shared dependency changes with DevOps and relevant specialists.

## Environment safety and configuration

- Never hardcode secrets, tokens, credentials, or environment-specific values.
- Do not commit `.env` contents or secret material.
- Centralize environment access behind typed configuration where possible.
- Fail fast on missing required configuration.
- Keep development, test, staging, and production concerns separated.
- Treat destructive scripts and production-impacting commands as high risk.

## Security basics

- Validate untrusted input at boundaries.
- Sanitize or encode output where relevant to the layer.
- Apply least-privilege thinking to credentials and service access.
- Do not leak internal stack traces, secrets, or sensitive data in responses or logs.
- Be deliberate about authentication, authorization, and data exposure.
- Flag security-sensitive changes clearly for review.

## Do-not rules

Do not:
- make unrelated architectural changes without justification
- rewrite existing patterns just for preference
- change public contracts silently
- modify database models or indexes without DBA input when the change is non-trivial
- change pipelines, deployment logic, environment semantics, or release behavior without DevOps input
- bypass validation and still claim completion
- add dependencies casually
- commit secrets, credentials, or generated environment files
- leave broken tests, type errors, or lint failures in the changed scope
- mask uncertainty with vague completion statements

## Escalation and delegation rules

Consult the relevant specialist skill when work touches its core domain.

Mandatory specialist involvement:
- Frontend: new screens, reusable component patterns, state architecture, accessibility, Figma translation
- Backend: API routes, validation, service logic, transport boundaries, auth-aware behavior
- DBA: database choice, schema design, relationships, migrations, indexes, query-heavy changes
- QA: significant behavioral changes, acceptance criteria validation, regression-sensitive work
- DevOps: CI/CD, secrets, environments, builds, deployments, containerization, operational workflows
- Tech Lead: ambiguous, cross-functional, or dependency-heavy requests

Escalate to Tech Lead when:
- specialists disagree
- tradeoffs affect multiple layers
- the task would introduce a new repository pattern
- sequencing across teams matters
- acceptance criteria are incomplete

## Definition of done

Work is done only when:
- the requested outcome is implemented
- the solution is scoped, clean, and aligned with existing architecture
- the correct specialist guidance was applied
- affected code is readable and maintainable
- required validation was completed and passed for the impacted scope
- docs/config/migrations/contracts were updated where needed
- risks, limitations, and unverified areas are stated explicitly
- no unnecessary architectural or dependency churn was introduced
