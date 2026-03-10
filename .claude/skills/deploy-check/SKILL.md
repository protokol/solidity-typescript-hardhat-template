---
description: Pre-deployment checklist — verify contracts compile, tests pass, and deployment config is correct
user-invocable: true
disable-model-invocation: true
---

# /deploy-check

Run a pre-deployment checklist to verify everything is ready for deployment.

## Instructions

Perform each step in order and report results:

### 1. Compile Contracts

Run `npm run compile` and verify all contracts compile without errors or warnings.

### 2. Run Tests

Run `npm run test` and verify all tests pass.

### 3. Run Coverage

Run `npm run coverage` and report the coverage summary. Flag any contracts with low coverage.

### 4. Lint Checks

Run `npm run solhint` and `npm run lint:check` to verify no linting issues.

### 5. Format Check

Run `npm run format:check` and `npm run sol:format:check` to verify formatting is consistent.

### 6. Review Ignition Modules

Read each file in `ignition/modules/` and verify:

- All constructor parameters have sensible defaults
- Parameter names match what the contract expects
- Owner/deployer is set via `m.getAccount(0)`

### 7. Check Network Configuration

Read `hardhat.config.ts` and verify:

- Target network is configured
- Required environment variables are documented in `.env.example`

### 8. Summary Report

Output a summary table:

| Check            | Status    | Notes       |
| ---------------- | --------- | ----------- |
| Compilation      | PASS/FAIL |             |
| Tests            | PASS/FAIL | X/Y passing |
| Coverage         | PASS/WARN | XX%         |
| Solhint          | PASS/FAIL |             |
| ESLint           | PASS/FAIL |             |
| Formatting       | PASS/FAIL |             |
| Ignition Modules | PASS/WARN |             |
| Network Config   | PASS/WARN |             |

Flag any FAIL or WARN items with recommended fixes.
