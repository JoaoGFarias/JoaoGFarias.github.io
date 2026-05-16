---
title: "Automation Testing E-commerce App"
role: "Test Automation Architect"
period: "2025"
summary: "Reference implementation of an architectural approach to automation in testing — multiple test suites (Java, Kotlin, TypeScript, k6) running against the same e-commerce app behind shared channel and adapter abstractions, gated by a 17-stage CI/CD pipeline."
stack:
  - "Java"
  - "Kotlin"
  - "TypeScript"
  - "Cucumber"
  - "Serenity BDD"
  - "Playwright"
  - "Selenium"
  - "REST Assured"
  - "k6"
  - "WireMock"
  - "GitHub Actions"
  - "Docker"
link: "https://github.com/Joao-Farias-Portfolio/automation-testing-ecommerce-app"
order: 1
---

## What it is

A portfolio repository wrapping a full-stack e-commerce demo (FastAPI + React) with parallel test automation suites that all share the same architecture: **channels** for what's being tested (Web UI vs API) and **adapters** for the tools doing the testing (Selenium vs Playwright, REST Assured vs OkHttp).

The point isn't the e-commerce app — it's that the same Cucumber scenarios run unchanged across Web and API channels, the same step definitions work whether Selenium or Playwright is driving the browser, and the same architecture ports cleanly across Java, Kotlin, and TypeScript.

## Why it exists

Most automation codebases I've seen lock themselves into one tool, one language, and one channel — and then pay for that decision for years. This project demonstrates an alternative: write your scenarios once, abstract the moving parts behind interfaces, and treat tool choice as a swappable detail rather than a foundational commitment.

## What it demonstrates

- **Channel abstraction** — identical BDD scenarios run against Web (UI) and API channels through a common channel interface.
- **Adapter pattern at scale** — Selenium ↔ Playwright and REST Assured ↔ OkHttp are interchangeable behind shared interfaces in Java and Kotlin.
- **Cross-language consistency** — the same architectural decisions (channels, adapters, BDD) implemented identically in Java, Kotlin, and TypeScript.
- **WireMock isolation** for testing the frontend independently of a real backend.
- **k6 performance baseline** as a CI gate, not a separate exercise.
- **17-stage CI/CD pipeline** as a DAG of quality gates: static analysis → unit → integration → API/BDD → E2E → security → performance, with CD to GHCR only after every gate passes on `main`.
- **Weekly cron** to keep security and performance baselines current as dependencies drift.

## Stack

- **App under test**: FastAPI + SQLModel + SQLite (backend), React 18 + TypeScript + Vite + Chakra UI (frontend).
- **Java suite**: Serenity BDD + Cucumber + Selenium/Playwright + REST Assured/OkHttp.
- **Kotlin suite**: Serenity BDD + Cucumber + Selenium + REST Assured.
- **TypeScript suite**: CucumberJS + Playwright + Axios.
- **Performance**: k6 smoke + load.
- **Infrastructure**: GitHub Actions, Docker/GHCR, WireMock, `just` runner, uv.

## Try it

The repo includes a custom Claude Code slash command (`/automation-overview`) that gives a guided tour of the architecture — recruiter-level or engineer-level depending on what you ask for.

[View on GitHub →](https://github.com/Joao-Farias-Portfolio/automation-testing-ecommerce-app)
