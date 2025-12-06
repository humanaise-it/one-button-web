# OneButton – Development Guidelines (Enterprise Edition)

These guidelines MUST be followed by Copilot, Claude, and any AI assistant.

---

## 1. React Coding Standards
- Functional components ONLY.
- Use React hooks (no classes).
- Each component must be small and focused.
- Side effects handled only inside `useEffect`.
- Custom hooks go into `/src/hooks`.

---

## 2. Styling Standards
- Black & white UI.
- Minimalistic pure CSS.
- No Tailwind, no UI libraries.
- CSS selectors must be semantic, not utility-based.

---

## 3. Naming Conventions
- Components: `PascalCase`
- Hooks: `useCamelCase`
- Files: `kebab-case`
- Variables/functions: `camelCase`
- Constants: `UPPER_CASE`

---

## 4. Error Handling
Every async function MUST:
- try/catch around external calls
- throw meaningful errors
- never swallow exceptions

---

## 5. Testing Standards
### Unit Tests (Vitest)
- Every hook must have tests.
- Components with logic must have tests.
- Tests must:
  - mock external APIs
  - verify edge cases
  - verify success cases

### E2E Tests (Playwright)
- Login flow test
- Microphone permission test
- Recording toggle test

---

## 6. Commit Standards
Conventional commits:

feat: new feature
fix: bug fix
refactor: code improvement
test: adding or fixing tests
docs: documentation updates
chore: build tools / misc


---

## 7. Folder Structure Rules
Do NOT create new folders unless justified.
Files must remain small and cohesive.

---

## 8. Security Rules
- NEVER commit .env files.
- API keys must ONLY live in environment variables.
- No direct Deepgram keys exposed.

---

## 9. Accessibility
- Buttons must have aria-labels.
- Text must be readable at all zoom levels.

---

## 10. AI Assistant Behavioral Rule
If Copilot or Claude generate code:
- It MUST follow these guidelines.
- If not possible, the assistant must ask for clarification.
