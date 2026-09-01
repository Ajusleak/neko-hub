# AGENTS.md

## NEOS AI Contributor Operating Guide

**Document ID:** NEOS-AGENTS-001  
**Status:** Draft — Release 0.1  
**Version:** 0.1.0  
**Authority:** NEOS Repository Operating System  
**Applies to:** AI coding assistants and autonomous engineering agents  
**Conformance:** NEOS repository governance, documentation governance, and applicable project-level engineering standards

## 1. Purpose

This document defines the operating rules for AI agents working in the NEIKOS HUB engineering repository.

Its purpose is to ensure that AI-assisted engineering work is governed, traceable, consistent, reviewable, architecture-aware, documentation-aware, and safe to baseline.

> **Core rule:** Discover first. Plan second. Implement third. Validate fourth. Review before baseline.

## 2. Scope

These instructions apply whenever an AI agent creates or modifies repository files, proposes architecture, edits specifications, changes repository structure, modifies workflows or governance, adds or removes dependencies, updates documentation, prepares a release or baseline, or reviews another agent's work.

## 3. Authority and Precedence

When guidance conflicts, the higher-authority source governs:

1. Project Constitution
2. Engineering Charter
3. Repository Governance
4. Documentation Standard
5. Approved architecture specifications
6. Approved domain and platform specifications
7. Operational guides and contributor instructions
8. Draft proposals and working notes

For unresolved conflicts, the agent must stop the affected work, identify the conflicting sources, record the conflict, determine whether an approved higher-authority source resolves it, escalate when necessary, and update the authoritative documentation before proceeding.

## 4. Mandatory Repository Discovery

Before making a material change, the agent must establish repository context.

### 4.1 Entry sequence

Review, in order:

1. `README.md`
2. `CLAUDE.md`, when present
3. `AGENTS.md`
4. `00_ENGINEERING_INDEX.md`, when present
5. applicable repository governance
6. applicable documentation standards
7. affected specifications
8. dependencies and related documents

### 4.2 Discovery objectives

Identify the current NEOS release and baseline, applicable governance, authoritative specifications, affected components, dependencies and dependents, required documentation changes, validation gates, risks, and unresolved assumptions.

### 4.3 Discovery exit criteria

Discovery is complete only when the agent can explain what is changing, why it is changing, which authoritative documents govern it, what may be affected, what must be validated, and what remains uncertain.

No implementation should begin when a material architectural or governance dependency remains unknown.

## 5. Planning Before Implementation

Before implementation, establish a concise change plan containing objective, scope, affected files or systems, governing specifications, dependencies, risks, assumptions, validation requirements, and expected documentation updates.

Avoid scope expansion without justification. Material ambiguity affecting architecture, security, compatibility, or data behavior requires clarification or review before implementation.

## 6. Single Source of Truth

Do not create competing definitions of the same engineering rule. Prefer references over duplication, authoritative specifications over summaries, shared terminology over local terminology, and stable document identifiers over ambiguous titles.

## 7. Documentation Conformance

Every specification or governance document created or materially changed must follow the repository documentation standard once baselined. At minimum, maintain document identity, purpose, status, version, ownership, dependencies, conformance information, revision history, and required references.

Documentation changes are engineering changes when they alter requirements, architecture, interfaces, workflows, or governance.

## 8. Architecture Boundaries

Preserve approved architectural boundaries. Do not introduce undocumented subsystems, redefine interfaces without impact analysis, bypass established boundaries, create undocumented coupling, replace approved architecture with inference, or turn implementation details into architectural standards without review.

## 9. Dependency and Impact Analysis

Before material changes, identify relevant code, API/interface, data, configuration, documentation, test, deployment, and operational dependencies. Assess direct and reasonably foreseeable indirect impact.

## 10. Assumptions

Assumptions must be explicit, necessary, appropriately low-risk or reviewed, consistent with authoritative guidance, and recorded when they could affect future work.

Material architectural, security, compliance, data, or compatibility assumptions require review before becoming authoritative.

## 11. Implementation Rules

During implementation:

- make the smallest coherent change that satisfies the approved scope;
- preserve existing behavior unless change is required;
- avoid unrelated cleanup;
- follow repository naming and structural conventions;
- update dependent documentation;
- maintain traceability to requirements or specifications; and
- avoid undocumented behavior.

Generated content receives the same review standards as manually authored content.

## 12. Validation

Every change must pass applicable validation gates:

1. **Discovery** — repository and governance discovery is complete.
2. **Technical** — requirements, interfaces, architecture, and behavior are correct.
3. **Documentation** — affected documentation, references, metadata, and conformance are correct.
4. **Consistency** — terminology, standards, dependencies, and cross-references remain coherent.
5. **Review Readiness** — scope, risks, assumptions, changes, and outstanding issues are documented.

A change is not complete merely because an implementation exists.

## 13. Review and Approval

The standard review lifecycle is:

**Self-review → Technical Review → Architecture Review, when applicable → Consistency Review → Approval → Baseline Eligibility**

An agent must not represent a draft as approved or baselined. Unresolved issues must be clearly identified.

## 14. Multi-Agent Collaboration

When multiple agents participate:

- all agents work against the same known baseline;
- shared documents have an identified authority;
- agents avoid conflicting simultaneous edits;
- changes to shared governance or architecture require coordination;
- one agent's draft is not approved merely because another agent generated it; and
- conflicts are surfaced and resolved before baseline.

## 15. Security and Sensitive Changes

Follow applicable security and privacy requirements. Never expose secrets or credentials, weaken security controls without authorization, bypass access controls, invent security requirements, knowingly introduce insecure defaults, commit sensitive material, or conceal security-relevant uncertainty.

Security-sensitive changes require appropriate review before baseline.

## 16. Standard Operating Procedures

The NEOS repository should maintain governed procedures for new specification creation, specification updates, repository restructuring, governance changes, version changes, deprecation, baseline preparation, and release publication.

These procedures should reference authoritative standards rather than duplicate them.

## 17. Communication and Change Reporting

Completed engineering work should report:

- objective;
- work performed;
- files or specifications changed;
- dependencies affected;
- validation performed;
- assumptions;
- risks;
- unresolved items; and
- recommended next action.

Reports must distinguish clearly between drafted, validated, reviewed, approved, and baselined states.

## 18. Operational Scenarios

### New Specification

Perform repository discovery; confirm an existing specification does not already cover the subject; identify governing documents; define ownership and dependencies; draft using the documentation standard; validate; review; and approve through the release process.

### Existing Specification Update

Identify the authoritative document; analyze dependencies and impact; determine whether dependents require changes; make the smallest coherent update; validate cross-references and version information; then review and approve.

### Governance Change

Identify the governing rule; assess repository-wide impact; update the authoritative governance document; identify affected downstream documents; validate inheritance and consistency; and complete formal review before baseline.

### Repository Restructure

Identify affected paths and references; confirm the proposed structure conforms to repository governance; update the manifest and navigation; validate references and ownership; and review before baseline.

## 19. Release and Baseline Rules

NEOS releases follow:

**Proposal → Planning → Authoring → Technical Review → Architecture Review, when applicable → Consistency Validation → Approval → Baseline Freeze → Publication**

No subsequent release should be treated as active until the preceding release reaches baseline freeze.

A baseline identifies the release version, included artifacts, validation status, approval status, known exceptions, and effective date.

## 20. Completion Definition

AI work is complete only when the objective is satisfied, applicable discovery is complete, dependencies and impacts are assessed, documentation is synchronized, validation gates pass, review requirements are satisfied, and the change is accurately reported as draft, reviewed, approved, or baselined.

## 21. Agent Checklist

### Before implementation

- [ ] Read repository entry points.
- [ ] Identify current baseline.
- [ ] Identify governing documents.
- [ ] Locate authoritative specifications.
- [ ] Analyze dependencies.
- [ ] Assess impact.
- [ ] Record material assumptions.
- [ ] Define validation requirements.

### Before review

- [ ] Scope is satisfied.
- [ ] Architecture is preserved.
- [ ] Documentation is synchronized.
- [ ] Cross-references are valid.
- [ ] Risks are recorded.
- [ ] No unresolved material conflicts remain.

### Before baseline

- [ ] Required reviews are complete.
- [ ] Required approvals are recorded.
- [ ] Version/status metadata is correct.
- [ ] Release artifacts are identified.
- [ ] Baseline state is explicitly declared.

## 22. Glossary

**NEOS** — NEIKOS Engineering Operating System, the repository governance and engineering framework.

**Baseline** — An explicitly approved repository state from which subsequent changes are governed.

**Specification** — An authoritative engineering document defining requirements, architecture, behavior, interfaces, or standards.

**Conformance** — The documented relationship between a document and the standards that govern it.

**Dependency** — A relationship in which one artifact, system, or specification relies upon another.

**Impact Analysis** — Assessment of the direct and indirect effects of a proposed change.

**Agent** — An AI assistant performing governed engineering work within the repository.

## 23. Revision History

| Version | Status | Change |
|---|---|---|
| 0.1.0 | Draft | Initial production-oriented NEOS AI contributor operating guide. |

## 24. Final Authority

This document governs AI-agent behavior only to the extent that it does not conflict with a higher-authority approved repository standard.

When ambiguity remains, the agent must surface the ambiguity rather than manufacture certainty.

**End of AGENTS.md**
