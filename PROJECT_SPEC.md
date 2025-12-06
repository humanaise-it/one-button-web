# OneButton – Project Technical Specification (Enterprise Edition)

## 1. Vision
OneButton is a minimalistic AI-powered meeting assistant.
The MVP purpose is:
- Login
- Press one button
- Live transcription with Deepgram Flux
- Clean and distraction-free UI

No summaries, no analytics, no backend logic yet beyond authentication.

---

## 2. Technology Stack
- **Frontend:** React + Vite + PWA
- **Auth:** Supabase Auth (email & password for MVP)
- **Realtime Transcription:** Deepgram Flux via WebSocket (client → Deepgram)
- **State Management:** React hooks & context only
- **Styling:** Pure CSS → black & white minimal
- **Deployment:** Vercel (recommended)
- **Testing:** Vitest (unit) + Playwright (E2E) — *patterns defined below*

---

## 3. Architecture Overview
Minimal architecture:

/src
/auth
/components
/hooks
/pages
App.jsx
main.jsx


- No global state manager.
- No backend server.
- All logic local except Supabase and Deepgram.
- UI driven.
- Code must be clean, declarative, easy to extend.

---

## 4. User Flow

### 1. Login
- User enters email + password.
- If authenticated → redirect to recorder screen.

### 2. Recorder Screen
- White background, thin black border.
- Circular microphone button at center.
- If recording → red pulsing animation.
- Live transcription displayed under the button.
- Pressing button toggles recording.

---

## 5. Functional Requirements

### Auth
- Persistent session via Supabase.
- useAuth hook must manage:
  - user state
  - loading state
  - login
  - logout
  - session persistence

### Transcription
- Must stream raw audio chunks to Deepgram WebSocket.
- Must handle incremental transcription events.
- Must display text live with minimal latency.

### UI
- Typography: monospace for transcription.
- Strict black-and-white design (no color UI except mic red).
- Zero distractions.

---

## 6. Non-Functional Requirements

### Performance
- App loads in < 150ms on Vercel.
- Audio streaming must not exceed 100ms buffering.

### Reliability
- Recorder must fail gracefully.
- If microphone not available → show error message.

### Security
- No tokens in frontend code (environment variables only).
- Never store sensitive user data.

---

## 7. Future Extension (for the agent, NOT MVP)
- Chunked audio storage
- Batch Nova-3 processing
- Summaries and action items
- Slack integration
- Cross-device sync
- Multi-user projects

This spec must be respected by all code-generating agents.
