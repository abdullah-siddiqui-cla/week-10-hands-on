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
   - Set **`document.title`** to something like `Treat Menu` (or include a subtitle), **or**
   - Log a single “app opened” message in dev (remove or guard for production if your instructor prefers).

2. **Effect with dependencies**  
   Add state that **should** drive a side effect (examples: a **“kitchen status”** string, a **selected category**, or **order count** from part 1). Use `useEffect` **with** `[dependency]` (or `[dep1, dep2]`) so that when that value changes, something **outside render** updates — e.g. sync `document.title` to include order count.

3. **Cleanup on unmount**  
   In the same or another effect, subscribe to something that needs teardown, for example:
   - `setInterval` for a **“shop open”** countdown or clock — **clear the interval** in the cleanup function

4. **`useRef` (DOM or stable handle)**
   - **Focus:** After mount, **focus** an input (e.g. fake “promo code” or search) using a ref and a **mount** `useEffect`, **or**

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

1. **Router at the root**  
   Wrap your app (often in `main.jsx` or `App.jsx`) with **`BrowserRouter`** so the whole Treat Menu lives inside the router.

2. **Define routes**  
   Use **`Routes`** and **`Route`** to map paths to components, for example:
   - **`/`** — Home or landing (short intro + link to menu).
   - **`/menu`** — Your existing list of treat **cards** (from part 1), still using `.map()` and keys.
   - **`/treat/:treatId`** — **Detail page** for one treat: `treatId` should match **`id`** fields in your data (e.g. `brownie`, `cookie`).

3. **`Link` for client-side navigation**  
   Replace plain `<a href="...">` **internal** navigation with **`Link to="..."`** so the browser does **not** full-reload. Style links with Tailwind (`underline`, `hover:`, active states if you like).

4. **Parameterized detail page**  
   On `/treat/:treatId`, use **`useParams`** to read `treatId`, **find** the matching object in your treats array, and render **name**, **price**, and maybe a short **placeholder description**. If `treatId` is unknown, show a clear **“Not found”** UI (and optionally a `Link` back to `/menu`).

5. **Connect list → detail**  
   Each card on `/menu` should link to **`/treat/<id>`** (via `Link` or a button wrapped appropriately) so you can drill into a treat.

**Hints to Google:**

- _“React Router v6 BrowserRouter Routes Route”_
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

   Optional: use **`navigate(-1)`** once to mirror “browser back” behavior — compare mentally to a `Link`.

2. **`useLocation`**  
   Use **`useLocation`** in a way that affects UI, for example:
   - A small **breadcrumb** or **page label** derived from **`location.pathname`**, **or**
   - Pass **`state`** via **`navigate('/path', { state: { … } })`** from one screen and read **`location.state`** on the destination (e.g. pass **order count** or **last treat name** to a thank-you page).

**Hints to Google:**

- _“React Router useNavigate”_
- _“React Router useLocation state”_
- _“React Router useHistory vs useNavigate migration”_

**Checklist at the end:** Programmatic navigation works; `useLocation` used meaningfully; written comparison of **`useHistory`** (v5) vs your **v6** usage is present; Tailwind still used for layout and nav; part 1 behavior (cards, state) still makes sense inside routes.

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
