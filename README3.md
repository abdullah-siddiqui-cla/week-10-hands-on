# Week 12 — React hands-on, part 3 (3 × 1 hour)

This document **extends** the **Treat Menu** by adding **network data**, **shared context**, **validated forms** (two different styles), and **global client state** with **Zustand**. Parts 1 and 2 are the foundation (components, router, effects, refs); here you practice patterns you will see in real apps: loading remote data, lifting cross-cutting concerns out of prop drilling, and splitting “UI state” from “form state” and “cart state.”

**Prerequisite:** A working Treat Menu from part 2 (or equivalent: `HomePage`, `MenuPage`, routed treat list, detail route, thanks flow). **Node.js** installed.

---

## Project setup (do this once, before Phase 7)

Continue your existing Vite project from part 2.

1. Install **Zod** (schema validation): search _“Zod npm”_ → [zod.dev](https://zod.dev).
2. Install **React Hook Form** and the Zod resolver for uncontrolled-style forms: search _“react-hook-form zod resolver”_ → [@hookform/resolvers](https://github.com/react-hook-form/resolvers).
3. Install **Zustand** (small global store): search _“Zustand React”_ → [docs.pmnd.rs/zustand](https://docs.pmnd.rs/zustand/getting-started/introduction).

**Useful APIs and docs (bookmark these):**

- [react.dev](https://react.dev) — Context (`createContext`, `useContext`, `Provider`)
- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) — `fetch`
- [dummyjson.com/docs](https://dummyjson.com/docs) — **Products** endpoint for sample data
- [zod.dev](https://zod.dev) — schemas, `safeParse`, error messages
- [react-hook-form.com](https://react-hook-form.com) — `useForm`, `register`, `handleSubmit`
- [docs.pmnd.rs/zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) — `create`, selectors, actions

**Styling:** Same as earlier weeks — prefer **Tailwind** on `className`.

**Note on APIs:** [DummyJSON](https://dummyjson.com) is a public demo API. Use it for learning; do not send real passwords or personal data.

---

## The app you are building (outcome)

By the end of **Phase 11**, your app should demonstrate all of the following:

1. **Remote products:** **`MenuPage`** loads **products** from DummyJSON with the **Fetch API** (not a hardcoded treats array). You handle at least **loading** and **error** states in the UI in a simple, honest way (spinner text, “try again”, or similar).
2. **Context:** A **`React` context** (e.g. “is the user logged in?” or another small piece of app-wide state you choose) is **provided** near the top of the tree (typically in or above `App`) and **consumed** in at least one other place — for example the **navigation bar** or header — so the UI can reflect that value or offer actions (e.g. “Sign in” vs “Sign out” label). You are not required to implement a real auth backend; **mock** login/logout is enough.
3. **Controlled form + Zod:** A small **Login** screen with **username** and **password** fields driven by **`useState`** (controlled inputs). On submit, you **validate** with **Zod**; if valid, **`console.log`** the values (or a safe subset). Invalid input should show **field-level or form-level** feedback you can explain to a classmate.
4. **Uncontrolled form + React Hook Form + Zod:** A small **Sign up** screen using **`useForm`** from React Hook Form with the **Zod resolver**. On successful validation, **`console.log`** the submitted values. Keep the fields minimal (e.g. username, password, confirm password — your choice).
5. **Zustand cart:** Items added from the **menu** (or product cards) live in a **Zustand store**, not in `useState` inside `App`. You **remove** the local **`orderCount`** state pattern from part 2 (see the solution’s `App.jsx` around the `useState(0)` order counter) and instead derive “how many items” from **`cartItems.length`** (or equivalent) from the store. Any header, nav badge, or detail page that needs the count should read from the **same store**.

---

## Phase 7 — Fetching data with the Fetch API

**Goals:** Replace static menu data with **async** data from the network; practice **loading**, **success**, and **error** UI.

**Concepts:** `fetch`, `async`/`await`, JSON parsing, conditional UI for pending/failed data.

**Tasks:**

1. Read the DummyJSON **products** documentation and identify the URL that returns a list of products (e.g. paginated JSON with a `products` array).
2. On **`MenuPage`**, when the component should show fresh data (search: _“React useEffect data fetching”_ if you need a reminder from part 2 patterns), call **`fetch`**, **`await` the response**, and **`json()`** the body.
3. Store the result in **`useState`**: at minimum **products** (or mapped shape), **loading**, and **error** (string or `null`).
4. Render **cards or rows** from the fetched list (reuse your card component idea from part 1, but **map** API fields like `title`, `price`, `thumbnail`, `id` — adjust prop names as needed).
5. If the request fails (network or non-OK status), show a **clear message** and optionally a **retry** control.

**Hints to Google:**

- _“fetch API JavaScript json”_
- _“React useEffect fetch data”_
- _“HTTP response ok status”_

**Checklist before Phase 8:** Menu shows **live** DummyJSON products; loading and error are visible states, not a blank screen.

---

## Phase 8 — `useContext` for app-wide state

**Goals:** Share a value (e.g. **logged-in flag** or **current user label**) without threading props through every layer.

**Concepts:** `createContext`, `Provider`, `useContext`, where to place the `Provider` in the tree.

**Tasks:**

1. Create a **context module** (e.g. `AuthContext.jsx` or `AppContext.jsx`) with a default value, a **Provider** component that wraps `useContext`.
2. Wrap the part of your app that needs access (often the whole **`Routes`** tree) with your **`Provider`** from `App.jsx`.
3. Put at least one piece of state in the provider (e.g. `isLoggedIn`) and functions to **toggle** or **set** it (mock login/logout is fine).
4. **Consume** the context in **navigation** or header: show different text, links, or styles based on context (e.g. “Log in” route vs “Hello, …”).

**Hints to Google:**

- _“React createContext useContext”_
- _“React context provider pattern”_

---

## Phase 9 — Controlled form with `useState` and Zod

**Goals:** Own every input value in React state; validate on submit (or on blur if you prefer) with **Zod**.

**Concepts:** Controlled `<input>`, `value` + `onChange`, Zod `object`, `safeParse` or `parse`, displaying `error.flatten()` or `formErrors`.

**Tasks:**

1. Add a **`LoginPage`** (or similar) with **username** and **password** fields. Each field’s **`value`** and **`onChange`** update **`useState`** hooks (or one state object).
2. Define a **Zod schema** for the shape you expect (e.g. `z.object({ username: z.string().min(1), password: z.string().min(8) })` — tune rules to match what you want to teach).
3. On **`onSubmit`**, call **`preventDefault`**, run **`schema.safeParse(formValues)`**, and branch:
   - **Success:** `console.log` the parsed data (passwords in real apps must never be logged in production — here the exercise only asks for learning).
   - **Failure:** keep the user on the page and show **Zod** error messages next to fields or in a summary.
4. Wire the page into **React Router** and a **`Link`** from your nav.

**Hints to Google:**

- _“React controlled input useState”_
- _“Zod safeParse”_
- _“Zod error messages form”_

**Checklist before Phase 10:** Invalid submits never hit the “happy” `console.log`; valid submits do.

---

## Phase 10 — Uncontrolled form with React Hook Form and Zod

**Goals:** Let React Hook Form **register** inputs and manage less boilerplate; still enforce rules with **Zod** via **`@hookform/resolvers/zod`**.

**Concepts:** `useForm`, `register`, `handleSubmit`, `formState.errors`, `zodResolver`.

**Tasks:**

1. Add a **`SignUpPage`** with a few fields (minimum: something like **username**, **password**, **confirmPassword** with a **refine** or **superRefine** so passwords match — search _“Zod password confirm”_).
2. Build a Zod schema and pass it to **`zodResolver`** in **`useForm`**.
3. Use **`register`** on native inputs (or controlled RHF patterns if you already know them — default is fine for this exercise).
4. On **`handleSubmit`**, **`console.log`** the validated payload.
5. Route the page and link it from the nav.

**Hints to Google:**

- _“react-hook-form zod resolver”_
- _“useForm register handleSubmit”_

**Checklist before Phase 11:** Sign up validates with Zod; RHF shows errors without duplicating the same rules in two ad-hoc places.

---

## Phase 11 — Zustand for the cart

**Goals:** Move **cart line items** (or product ids + quantities — your choice) into a **global store**; derive counts from **array length**; stop using **`orderCount`** `useState` in **`App`**.

**Concepts:** `create` from Zustand, immutable updates, selectors, using the store from **any** component (menu, header, detail).

**Tasks:**

1. Create a **`useCartStore`** (or similar) with:
   - State: an **array** of cart entries (shape you define).
   - Actions: e.g. **`addItem`**, **`removeItem`**, **`clearCart`** — keep it small.
2. On **`MenuPage`** (or each product card), **add to cart** by calling the store action instead of lifting callbacks only through `App` props.
3. **Remove** the **`useState`**-based **`orderCount`** (and related prop drilling) from **`App.jsx`** as described in the outcome. Anywhere you used to show a count, read **`items.length`** (or sum of quantities if you model it that way) from Zustand.
4. Update **`document.title`** or nav badges using the **store** (you may still use `useEffect` where it makes sense, or subscribe inside components — pick one clear approach).
5. Ensure **`TreatDetailPage`** (or equivalent) still participates in the cart if your part 2 flow did — now via the **store**, not props from `App`.

**Hints to Google:**

- _“Zustand create store TypeScript JavaScript”_
- _“Zustand useStore selector”_

**Checklist at the end:** No `orderCount` state in `App`; cart count = **`.length`** (or documented equivalent); menu and at least one other view agree on the same cart.

---

## Suggested pacing

| Phase | Focus                                          |
| ----- | ---------------------------------------------- |
| 7     | `fetch`, DummyJSON products, loading/error UI  |
| 8     | Context provider + nav                         |
| 9     | Controlled login + Zod                         |
| 10    | Sign up + React Hook Form + Zod                |
| 11    | Zustand cart; remove `App`-local order counter |

---

## Stretch ideas (optional — only if you finish early)

These are **not** required; skip if time is tight.

- **Pagination or “load more”** for DummyJSON products (`skip` / `limit` query params).
- **Persist** the Zustand cart to **`localStorage`** with a **rehydrate** on load (search: _“Zustand persist middleware”_).
- **React Query** or **SWR** instead of raw `fetch` (compare mental models with your instructor before adopting for coursework).
- Split **Zod schemas** into a `schemas/` folder shared by login and sign-up where it makes sense.
