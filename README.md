# Horizon

A clickable prototype of **Horizon** — an agent platform for teams that have to answer
to an IT and security function.

**Live:** https://prince-sharma.github.io/horizon/

## What it demonstrates

Horizon is built around one argument: the hard part of an agent platform is not building
the agent, it is being able to prove what the agent did and to stop it doing the wrong thing.

| Surface | What it shows |
|---|---|
| **Home** | Plain-language authoring. You describe the job; Horizon drafts the agent. |
| **Agents** | Templates that arrive with their skills, tool scopes and approval rules already set. |
| **Builder** | Model, connectors, skills, knowledge and guardrails on one page, above the instructions — with a live test panel. |
| **Deploy** | Channels (Slack, schedule, email, API) and a deployment ladder: managed cloud → your VPC → self-hosted. |
| **Skills** | A versioned library, plus improvements the agents propose from their own run history for a human to approve. |
| **Connectors** | Every tool carries the scope it was granted. Nothing is "full access". |
| **Runs** | The step trace: each tool call, its arguments, what came back, how long it took, what it cost. |
| **Governance** | Budgets that pause rather than overbill, argument-conditional approval rules, and an exportable audit trail. |

## Guided tour

The button in the bottom-right corner runs a nine-stop walkthrough that drives the real UI —
it switches screens, opens the deploy dialog, and spotlights the control it is describing.
Arrow keys step through it; `Esc` exits.

## Design decisions worth naming

- **No canvas.** Authoring is a sentence, not a graph.
- **The run log is a first-class screen**, not a debug drawer.
- **Guardrails read the arguments of a tool call**, not the name of the tool. "Ask before
  posting externally" inspects the channel the agent is about to post into.
- **Spend is a trust contract.** Budgets roll over, agents pause at their cap, and every
  step shows what it cost.
- **Model-agnostic**, including bring-your-own-key.

## Running it

It is one static file. Open `index.html`, or:

```bash
python3 -m http.server 8000
```

`index.html` is generated — edit `horizon.body.html` and run `node build.mjs`.

## Status

Prototype. Every agent, ticket, run and number on screen is illustrative.
