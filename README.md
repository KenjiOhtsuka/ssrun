# ssrun — Scenario & Suite Runner CLI

`ssrun` is a lightweight command‑line runner for API testing based on **Scenarios** and **Suites**.  
It allows you to describe API flows declaratively and execute them as ordered or parallel sequences.

- Scenario execution (multiple requests forming a flow)  
- Suite execution (multiple scenarios forming a larger flow)  
- Parallel execution blocks  
- Context isolation per scenario  
- JSON‑only request output support  
- Simple YAML/JSON configuration files  
- Deterministic normalize → validate → execute pipeline

`ssrun` is designed for developers who want to test API behavior as **flows**, not isolated calls.

---

## ✨ Features

- **Scenario Runner**  
  Execute a sequence of API requests with shared context.

- **Suite Runner**  
  Execute multiple scenarios in order, or in parallel blocks.

- **Parallel Execution**  
  Consecutive steps marked with `parallel: true` are executed concurrently.

- **Context Isolation**  
  Each scenario receives its own context instance derived from the global context.

- **JSON Output Support**  
  Request output parsing currently supports **JSON only**.

---

## 📦 Installation

Global installation:

```bash
npm install -g ssrun
```

Or run via npx:

```bash
npx ssrun --project ./sample --run scenario:login-profile
```

---

## ▶ Usage

### Run a Scenario

```bash
ssrun --project ./sample --run scenario:login-profile
```

### Run a Suite

```bash
ssrun --project ./sample --run suite:full-flow
```

---

## 📁 Project Structure

A typical project layout:

```
sample/
  endpoints/
    user.yaml
  scenarios/
    login-profile.yaml
  suites/
    full-flow.yaml
  config.yaml
```

---

## 🧩 Scenario Definition Example

```yaml
name: login-profile
steps:
  - request:
      endpoint: user.login
      input:
        username: "kenji"
        password: "secret"
      save:
        token: "$.token"

  - request:
      endpoint: user.profile
      input:
        token: "{{ token }}"
```

---

## 🧩 Suite Definition Example

```yaml
name: full-flow
steps:
  - scenario: login
  - scenario: profile

  - parallel: true
    scenario: fetch-orders

  - parallel: true
    scenario: fetch-notifications

  - scenario: finalize
```

Parallel steps are grouped and executed concurrently.

---

## ⚙ Request Output Format

Currently, only **JSON** output is supported:

```yaml
output:
  format: json
  save:
    userId: "$.id"
```

---

## 🛠 Development

Build the CLI:

```bash
npm run build
```

This generates the executable files under `dist/`.

---

## 📜 License

MIT
