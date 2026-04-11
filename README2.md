# Week 11 — React hands-on, part 2 (3 × 1 hour)

This document **extends** the **Treat Menu** app from [`README.md`](./README.md): same stack (**Vite**, **React**, **Tailwind**), same general look and feel, but you will add **side effects**, **refs**, and **client-side routing**. Treat part 1 as the foundation (components, props, lists, state); here you wire behavior to the **lifecycle of the UI** and **multiple “pages”** without a full reload.

**Prerequisite:** You have a working Treat Menu from part 1 (or equivalent: header, mapped treat cards, stateful interactions). **Node.js** installed.

---

## Project setup (do this once, before Phase 4)

Continue your existing Vite project from part 1, or copy it to a new folder if you prefer a clean slate.

1. Add **React Router** to the same project (search: _“React Router Vite”_ → [reactrouter.com](https://reactrouter.com)).
   - Installation: https://reactrouter.com/start/declarative/installation#introduction
2. Keep **Tailwind** as in part 1.

**Useful APIs and docs (bookmark these):**

- [react.dev](https://react.dev) — `useEffect`, `useRef`
- [reactrouter.com](https://reactrouter.com) — `BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`, `useNavigate`, `useLocation`

**Styling:** Same as part 1 — prefer **Tailwind** on `className`.

---

## The app you are building (outcome)

By the end of **Phase 6**, your Treat Menu should feel like a **small multi-screen app**:

1. **Effects:** At least one `useEffect` that runs **on mount**, at least one with a **cleanup on unmount**, and at least one with a **non-empty dependency array** where the behavior **actually changes** when a dependency changes.
2. **Refs:** At least one **`useRef`** used for something **DOM-related** (focus, scroll, or measuring) — not as a substitute for `useState` for ordinary UI state.
3. **Router shell:** The app is wrapped in **`BrowserRouter`** (or equivalent router provider from your docs).
4. **Navigation:** A small **nav bar** (or clear links) using **`Link`** so navigation does **not** reload the page.
5. **Parameterized route:** A **detail view** for a single treat, e.g. **`/treat/:treatId`**, driven by the same treat data you already use (or a close variant). Unknown IDs should be handled gracefully (e.g. friendly message or redirect).
6. **Programmatic navigation:** At least one user flow that calls **`useNavigate`** (e.g. “Continue”, “Back to menu”, or guard when cart/order state is invalid).
7. **Location:** Use **`useLocation`** at least once in a **meaningful** way (e.g. highlight active `Link` with `NavLink` _or_ read `location.pathname` / `location.state` to adjust UI).

---

## Phase 4 — `useEffect` and `useRef`

**Goals:** Run code when the UI **mounts**, **updates with dependencies**, and **cleans up**; use **`useRef`** for stable DOM or instance handles.

**Concepts:** Mount/unmount effects, dependency array, `useRef`.

**Tasks:**

1. **Mount-only behavior**  
   Use `useEffect` with an **empty dependency array** `[]` to do something once when a screen/component mounts, for example:
   - Set **`document.title`** to something like `Treat Menu` (or include a subtitle)

2. **Effect with dependencies**  
   Add state that **should** drive a side effect (example: **order count** from part 1). Use `useEffect` **with** `[dependency]` (or `[dep1, dep2]`) so that when that value changes, something **outside render** updates — e.g. sync `document.title` to include order count.

3. **Cleanup on unmount**  
   In the same or another effect, subscribe to something that needs teardown, for example:
   - `setInterval` for a **“shop open”** countdown or clock — **clear the interval** in the cleanup function
   - You can create a `Timer` component to practice clearing the interval in the teardown of the component.
   - Hint: Discuss the timer component with me when you reach this point.

4. **`useRef` (DOM or stable handle)**
   - **Focus:** After mount, **focus** an input (e.g. fake “promo code” or search) using a ref and a **mount** `useEffect`.
   - Create a `PromoField` component that focuses the input on `mount`.

   Do **not** store ordinary visible UI state in a ref for this exercise — use **`useState`** for that; use the ref for **imperative** DOM behavior.

**Hints to Google:**

- _“React useEffect empty dependency array”_
- _“React useEffect cleanup function”_
- _“React useRef focus input”_

**Checklist before Phase 5:** You can point to three effects: **mount**, **dependent**, **with cleanup**; one ref used for DOM/imperative behavior.

---

## Phase 5 — `BrowserRouter`, `Link`, parameterized routes

**Goals:** Split the UI into **routes**, navigate with **`Link`**, and read **URL parameters** for the treat detail screen.

**Concepts:** `BrowserRouter`, `Link`, parameterized routes (`:treatId`), `useParams`.

**Tasks:**

1. Wrap your App.jsx component into the BrowserRouter. Hint: https://reactrouter.com/start/declarative/installation#introduction

2. Add a **`pages/`** folder. Create **`HomePage`** and **`MenuPage`** and render your **existing** part 1 components on them (move or re-import what you already had in `App`).

3. Hook up the **router** so you can **move between** those pages (**`BrowserRouter`**, **`Routes`**, **`Route`**, **`Link`**) without a full reload.

4. Add **`TreatDetailPage`**, use **`useParams`** on a **`/treat/:treatId`** route, and from each **`TreatCard`** use a **`Link`** (or similar) on the button / “view details” control to go to **`/treat/<id>`**.

5. Add **`ThanksPage`**. Use **`useLocation`** there to read **`location.state`** and show a thank-you to the user. Pass that **`state`** from the **Place order** (or equivalent) button on **`TreatDetailPage`** when you navigate to thanks.

**Hints to Google:**

- _“React Router BrowserRouter Routes Route”_
- _“React Router Link vs a tag”_
- _“React Router useParams”_

**Checklist before Phase 6:** Changing URL changes the screen without reload; detail URL matches data; invalid id handled.

---

## Phase 6 — `useNavigate`, and `useLocation`

**Goals:** Navigate **from code**, read **where you are** (and optional **state**) in React.

**Concepts:** `useNavigate`, `useLocation`, comparison with **`useHistory`** (v5).

**Tasks:**

1. **`useNavigate`**  
   Add at least one flow that **programmatically** changes the route, for example:
   - On the detail page, a **“Back to menu”** button that calls **`navigate('/menu')`**, **or**
   - After a fake “**Place order**” action, **`navigate('/thanks')`** (you can add a minimal `/thanks` route).

2. **`useLocation`**  
   Use **`useLocation`** in a way that affects UI, for example:
   - A small **breadcrumb** or **page label** derived from **`location.pathname`**, **or**
   - Pass **`state`** via **`navigate('/path', { state: { … } })`** from one screen and read **`location.state`** on the destination (e.g. pass **order count** or **last treat name** to a thank-you page).

**Hints to Google:**

- _“React Router useNavigate”_
- _“React Router useLocation state”_
- _“React Router useHistory vs useNavigate migration”_

---

## Suggested pacing

| Phase | Focus                                         |
| ----- | --------------------------------------------- |
| 4     | Side effects and refs (`useEffect`, `useRef`) |
| 5     | Router shell, `Link`, `/treat/:treatId`       |
| 6     | `useNavigate`, `useLocation`                  |

---

## Stretch ideas (optional — only if you finish early)

These are **not** required topics; skip them if time is tight.

- **`NavLink`** with `end` / active classnames instead of manual `pathname` checks.
- **`useParams` + `useEffect`** to scroll to top when `treatId` changes.
- A **second parameterized route** (e.g. `/category/:slug`) using the same patterns.
