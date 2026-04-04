# Week 10 — React hands-on (3 × 1 hour)

A small, single-page **“Treat Menu”** app: a header, a list of snack cards, and simple interactions. You will **not** add routing, `useEffect`, or data fetching—only what is listed below.

**Prerequisite:** Node.js installed. If you are new to the terminal, search for _“install Node.js LTS”_.

---

## Project setup (do this once, before Phase 1)

Use **Vite** with the React template and add **Tailwind CSS**. Official guides are the most reliable:

- Search: _“Vite React create project”_ → [vite.dev](https://vite.dev)
- Search: _“Tailwind CSS Vite React”_ → [tailwindcss.com/docs](https://tailwindcss.com/docs)

**Useful APIs and docs (bookmark these):**

- [react.dev](https://react.dev) — main React documentation

**Styling rule for this exercise:** Prefer **Tailwind** utility classes on `className`. Use **inline `style={{ ... }}`** only if Tailwind cannot express something simply.

---

## The app you are building (outcome)

By the end of **Phase 3**, your app should roughly include:

1. A **header** (title + short subtitle) as its own component.
2. A **list of treat cards** (each card is a component).
3. Each card shows at least a **name**, **price**, and a **button**.
4. Clicking the button updates something visible on the page (using **state**).
5. The page uses **conditional rendering** (with `**if` / `else` logic\*\*) so the UI changes when there is “nothing to show” vs “something to show” (you choose the exact rule: e.g. empty cart vs items, or details hidden vs visible).

---

## Phase 1 — Components, JSX, and Tailwind

**Goals:** Break the UI into **functional components**, write valid **JSX**, and lay out the page with **Tailwind**.

**Tasks:**

1. In `App.jsx` (or `App.tsx`), render a layout that will become your treat menu (you can use placeholder text first).
2. Create at least **two** separate files for components, e.g. a **header** component and a **card** component. Import and use them inside `App`.
3. In JSX, practice:

- Returning a **single root** element (or a React **Fragment** `<>...</>` if you need multiple roots—search: _“React Fragment”_).
- Embedding JavaScript values with `**{ }`\*\* (e.g. a string variable or a number).

4. Style with Tailwind: spacing (`p-`, `m-`), typography (`text-`, `font-`), layout (`flex`, `gap`), and simple colors (`bg-`, `text-`).
5. For this phase, it is OK if card content is **hardcoded** in JSX (you will replace that with props in Phase 2).

**Hints to Google:**

- _“React function component”_
- _“JSX rules curly braces”_
- _“Tailwind flexbox gap”_

**Checklist before Phase 2:** Page looks intentional (not default browser styles); at least two custom components; no console errors.

---

## Phase 2 — Props, lists, and events

**Goals:** Pass data with **props**, render lists with `**.map()`**, and respond to **DOM events\*\* (e.g. clicks).

**Tasks:**

1. Define a **small array** of treat objects in `App` (e.g. `id`, `name`, `price`). Search: _“JavaScript array of objects”_ if needed.
2. Use `**.map()`** to render one **card component per object**. Give each list item a stable `**key`\*_ prop (search: _“React list key prop”\*).
3. Extend your card component so it **receives data via props** (e.g. `name`, `price`) instead of hardcoding text inside the card file.
4. Add a **button** on each card. Use `**onClick`\*_ (search: _“React onClick handler”\*). For now, the handler can:

- `console.log` something useful, **or**
- call a **function passed from the parent** as a prop (search: _“React pass function as prop”_)—this prepares you for Phase 3.

5. Keep using Tailwind on the button (`cursor-pointer`, hover styles, etc.).

**Hints to Google:**

- _“React props destructuring”_
- _“map render list React”_
- _“React event object preventDefault”_ (optional; useful later)

**Checklist before Phase 3:** Cards show correct data from the array; clicking does something you can observe (console or parent function).

---

## Phase 3 — State and conditional rendering

**Goals:** Use `**useState`** for memory inside a component, and show different UI with `**if`/`else`-style logic\*\*.

**Tasks:**

1. Pick **one clear piece of state** for the whole exercise, for example:

- a **count** of how many times treats were “ordered”, **or**
- which treat is **currently selected**, **or**
- whether a simple **panel** is open or closed.

2. Import and use `**useState`\*_ from React in the component that should own that state (usually `App` at first). Search: _“React useState hook”\*.
3. Connect your Phase 2 `**onClick`** so it **updates state\*_ with the setter function (search: _“React setState functional update”\* if you need to derive the next value from the previous one).
4. **Conditional rendering:** Use real branching logic, not only shortcuts:

- Either use `**if` / `else` before `return`** in the component, **or\*\*
- Assign JSX to a variable with `if` / `else`, then render that variable.
- You may also mention ternaries (`condition ? a : b`) in comments for yourself, but the exercise asks you to practice `**if` / `else`\*\* clearly at least once.

5. Show **two different meaningful UIs** depending on state (e.g. “Your order is empty” vs “You have ordered X items”; or “Pick a treat” vs “Selected: …”).

**Hints to Google:**

- _“React useState beginner”_
- _“conditional rendering if else React”_
- _“React onClick update state”_

**Checklist at the end:** State changes when you click; the screen reflects the new state; at least one place uses `**if` / `else`\*\* for what gets rendered; still no `useEffect` or router.

---

## Suggested pacing

| Phase | Focus                                        |
| ----- | -------------------------------------------- |
| 1     | Structure + look (components, JSX, Tailwind) |
| 2     | Data in + hands on UI (props, map, events)   |
| 3     | Memory + decisions (state, conditional UI)   |
