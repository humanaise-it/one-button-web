# OneButton – AI Agent Global Rules (Copilot / Claude / LLMs)

These rules MUST ALWAYS be applied when generating code or refactoring.

---

## 1. Always Follow Specs
The agent MUST always use:
- PROJECT_SPEC.md
- DEVELOPMENT_GUIDELINES.md

If something is unclear → agent MUST ask.

---

## 2. Output Requirements
- Code must be complete.
- No pseudo-code unless asked.
- Must include imports.
- Must match file structure.
- Should propose improvements only if aligned with project spec.

---

## 3. Generation Workflow
For every request:
1. Validate understanding.
2. Check if the request contradicts the specs.
3. If specs incomplete → ask before generating.
4. Generate code respecting architecture + guidelines.
5. Provide a short explanation.

---

## 4. React Rules
- Use functional components.
- Use hooks.
- No unused variables.
- No complex components (break down).

---

## 5. Audio & Streaming Rules
- Use MediaRecorder.
- Keep WebSocket logic abstracted in a hook.
- MUST support reconnection if socket drops.

---

## 6. Auth Rules
- Never assume a global user object.
- Always use useAuth hook.
- Redirect unauthorized users automatically.

---

## 7. Error Handling Rules
- NEVER swallow errors.
- Use try/catch in all async calls.
- Provide meaningful error messages.

---

## 8. Ask Before Acting
If the agent is not 100% sure → MUST ask clarifying questions before writing code.

---

## 9. No Creativity on UI
Design must remain:
- minimal
- black/white
- centered layout
- no animations unless requested (except mic pulse)
