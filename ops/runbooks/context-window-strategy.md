# Context Window Strategy (Token-Constrained Execution)

## Goal
Keep progress stable even when chat/context windows are limited.

## Core principles
1. Checkpoint every execution block.
2. Store durable decisions in files, not chat.
3. Keep messages short, stateful, and operational.
4. Prefer scripts/runbooks over repeated ad-hoc commands.
5. Commit frequently with clear intent.

## Checkpoint template (mandatory)
At end of each block, record:

- Block ID:
- Objective:
- Completed:
- Evidence (command/output/URL):
- Current state:
- Next 3 steps:
- Risks / blockers:
- Owner:
- Timestamp (CET):

## Memory layout
- Daily ops log: `memory/YYYY-MM-DD.md`
- Long-term rules/decisions: `MEMORY.md`
- Operational procedures: `ops/runbooks/*.md`
- Repeatable execution: `ops/scripts/*.sh`

## Compression rules
- Summarize only decisions + outcomes.
- Do not duplicate long raw logs in chat.
- Link to file/commit instead of repeating content.
- If context usage >60%, write checkpoint immediately.

## Git discipline
- One logical change per commit.
- Commit message format:
  - `ops: ...`
  - `docs: ...`
  - `feat: ...`
  - `fix: ...`
- Push after each stable checkpoint.

## 10-minute reporting standard
Every 10 minutes provide:
1. Progress since last report
2. Current state
3. Next immediate action
4. Any blocker (if present)

## Anti-regression
- Never place PR body markdown in terminal.
- Never run uncontrolled kill/pkill on OpenClaw processes.
- Keep single master runtime policy active.
