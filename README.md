# AI Leaders Micro-Credential Pilot

Toolkit for planning a pilot cohort of the AI Leaders Micro-Credential. It validates program inputs, generates a session schedule, and outputs a pilot report in Markdown or JSON.

## What It Does

- Validates pilot inputs with clear constraints
- Builds a session schedule from modules and weekly cadence
- Estimates facilitation coverage
- Produces a ready-to-share pilot plan

## Quick Start

```bash
npm install
npm run pilot
```

## CLI Usage

```bash
node src/cli.js sample/pilot-config.json
node src/cli.js sample/pilot-config.json --json
```

## Config Shape

See `sample/pilot-config.json` for a full example.

## Tests

```bash
npm test
```

## Lint

```bash
npm run lint
```
