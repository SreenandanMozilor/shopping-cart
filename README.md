# WebYes Shop — React Shopping Cart

> A full-featured e-commerce single page application built with React, deployed on Vercel.

**Live Demo:** [shopping-cart-livid-two.vercel.app](https://shopping-cart-livid-two.vercel.app)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [The Learning Journey](#the-learning-journey)

---

## Project Overview

WebYes Shop is a fully functional e-commerce web application built as a React learning project. It features a home page, shop page, product detail pages, a shopping cart (with both a sliding drawer and a full page), user authentication, category filtering, search, and more. Products are fetched from the [FakeStore API](https://fakestoreapi.com/).

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| React Router DOM v6 | Client-side routing |
| React Context API | Global state management |
| React Icons | Icon library |
| PropTypes | Runtime prop validation |
| Vitest | Test runner |
| React Testing Library | Component testing |
| CSS (plain) | Styling |
| localStorage | Cart and user persistence |
| FakeStore API | Product data |
| Vercel | Deployment |

---

## Features

### Pages & Routing
- Single Page Application (SPA) with client-side routing via React Router DOM
- Five routes: `/`, `/shop`, `/cart`, `/login`, `/signup`
- Dynamic product detail route: `/product/:id`
- Public-only routes — logged-in users are redirected away from `/login` and `/signup`
- SPA redirect configuration via `vercel.json` so direct URL visits and refreshes work correctly

### Home Page
- Hero section with blue/purple gradient, headline, and CTA buttons
- "Shop Now" button always visible; "Sign Up" button conditionally shown only when logged out
- Shop by Category section with four image cards (Men, Women, Accessories, Electronics), each linking to the filtered shop
- Featured Products section with filter tabs (All, Men's, Women's, Accessories, Electronics)
- Randomly generated discount badges and strikethrough original prices on featured products
- Featured products limited to 8 items for performance and UX
- Footer with brand info, quick links, customer service links, social icons, and newsletter input

### Navbar
- Sticky navbar that persists across all pages
- Logo linking to home
- Navigation links for Home, Men, Women, Accessories, Electronics — each linking to the filtered shop with URL query parameters
- Centered search bar with icon — searches products by title and updates the shop URL
- User icon button that expands to show username when logged in, with a dropdown menu
- Dropdown shows Login/Sign Up when logged out; shows greeting and Logout when logged in
- Cart icon with live badge showing total item quantity — updates in real time
- Clicking outside the dropdown closes it (via `useRef` and `mousedown` event listener)

### Shop Page
- Fetches all products from FakeStore API on mount
- Loading state shown while fetch is in progress
- Error state shown if fetch fails
- Products displayed in a responsive 4-column grid
- Category filtering via URL query parameter (`?category=...`) — shareable and browser-back compatible
- Search filtering via URL query parameter (`?search=...`)
- Page title updates dynamically based on active filter
- "X" button clears active filter

### Product Card
- Displays product image, category, title, and price
- Clicking image or title navigates to the product detail page
- Quantity controls: manual input field, increment (+) and decrement (-) buttons
- Quantity cannot go below 1
- "Add to Cart" button sends the product with selected quantity to the cart

### Product Detail Page
- Fetches individual product from FakeStore API by ID
- Loading state while fetching
- Large product image with discount badge
- Category label, full title, current price, strikethrough original price
- Full product description from API
- Color selector — options vary by category (clothing gets fashion colors, jewelry gets metal finishes, electronics get none)
- Size selector — options vary by category (clothing gets XS–XL, jewelry and electronics get none)
- Color and size pre-selected when navigating from cart (passed via URL params `?color=&size=`)
- "Add to Cart" button — includes selected color, size, and quantity
- Button shows "Added!" confirmation for 2 seconds after clicking
- "Add to Wishlist" button (UI only)
- Product Features section with category-specific bullet points
- Free Shipping and Secure Payment badges
- Back button using `navigate(-1)` — returns to previous page

### Cart System
- Cart state managed globally via React Context
- `cartItems` array lives in `CartProvider` — accessible by any component without prop drilling
- Cart items identified by `id + selectedColor + selectedSize` combined — same product in different colors/sizes are separate cart entries
- `addToCart` — adds new item or increments quantity if same variant already exists
- `updateQuantity` — updates quantity of a specific variant; removes item if quantity goes below 1
- `clearCart` — empties the entire cart
- `loadUserCart` — loads a specific user's saved cart from localStorage
- `saveUserCart` — saves current cart to localStorage keyed by user email
- Per-user cart persistence — each user's cart is saved and restored on login/logout

### Cart Drawer
- Sliding drawer from the right side of the screen
- Opens when cart icon in navbar is clicked
- Semi-transparent overlay behind drawer; clicking overlay closes it
- Smooth slide-in/slide-out CSS transition
- Shows each cart item with image, title, price, selected color/size variant, quantity controls, and line total
- Clicking item image or title navigates to its product detail page (with color/size pre-selected in URL)
- Footer shows cart total and "View Full Cart" button linking to `/cart`
- Shows empty state with icon and "Continue Shopping" button when cart is empty

### Cart Page (Full)
- Displays all cart items with image, title, price, color/size variant, quantity controls, and line total
- Clicking item image or title navigates to its product detail page
- Quantity increment/decrement updates in real time
- Decrementing to 0 removes the item
- Cart summary section shows total price and Checkout button
- Empty cart state with link back to shop

### Authentication
- `AuthProvider` manages `currentUser` state globally via React Context
- **Signup** — validates name, email (regex format check), password (min 6 characters), confirm password match; checks for duplicate email; saves user to localStorage
- **Login** — accepts email or username; validates format if `@` is present; checks password length; matches against localStorage users first, falls back to FakeStore API auth endpoint
- **Logout** — saves current cart to user's localStorage key, clears cart, clears `currentUser`, redirects to login
- Fake token from FakeStore API stored in localStorage on API login
- `PublicOnlyRoute` component redirects logged-in users away from `/login` and `/signup`
- Navbar shows username next to user icon when logged in
- Navbar shows Login/Sign Up links when logged out

### PropTypes Validation
- `ProductCard` — validates `product` shape (id, title, price, image, category)
- `CartDrawer` — validates `isOpen` (bool) and `onClose` (func)
- No missing prop validation warnings in the console

---

## Project Structure

```
src/
├── components/
│   ├── CartDrawer/
│   │   ├── CartDrawer.jsx
│   │   └── CartDrawer.css
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── ProductCard/
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.css
│   │   └── ProductCard.test.jsx
│   └── ProtectedRoute/
│       └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── CartContext.test.jsx
├── pages/
│   ├── Cart/
│   │   ├── Cart.jsx
│   │   ├── Cart.css
│   │   └── Cart.test.jsx
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── Login/
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   └── Login.test.jsx
│   ├── ProductDetail/
│   │   ├── ProductDetail.jsx
│   │   ├── ProductDetail.css
│   │   └── ProductDetail.test.jsx
│   ├── Shop/
│   │   ├── Shop.jsx
│   │   ├── Shop.css
│   │   └── Shop.test.jsx
│   └── Signup/
│       ├── Signup.jsx
│       └── Signup.test.jsx
├── App.jsx
├── main.jsx
├── index.css
├── setupTests.js
└── test-utils.jsx
```

---

## Getting Started

```bash
# Clone the repo
git clone YOUR_REPO_URL
cd shopping-cart

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## Testing

Tests are written with **Vitest** and **React Testing Library**. The philosophy: test what the user sees and does, not implementation details.

```bash
npm test
```

| Test File | Tests | What's Covered |
|---|---|---|
| `Login.test.jsx` | 4 | Form renders, empty fields error, invalid email, short password |
| `Signup.test.jsx` | 4 | Form renders, empty fields error, invalid email, short password |
| `ProductCard.test.jsx` | 4 | Renders product info, quantity starts at 1, increment, decrement floor |
| `Cart.test.jsx` | 4 | Empty state, items display, total price, checkout button |
| `CartContext.test.jsx` | 7 | Empty cart, add item, same variant quantity, different variants, remove, update specific variant, clear |
| `Shop.test.jsx` | 3 | Loading state, products render after fetch, correct product count |
| `ProductDetail.test.jsx` | 6 | Loading state, product details, color options, size options, color selection, add to cart button |

**Total: 32 tests**

---

## Deployment

Deployed on **Vercel** with SPA routing handled via `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures direct URL visits (e.g. `yoursite.com/shop`) and page refreshes don't return 404 — all routes are redirected to `index.html` and React Router handles the rest.

Every push to `main` triggers an automatic redeployment on Vercel.

---

---

# The Learning Journey

> This section is a complete record of the learning process — every mistake, every question, every insight, every "aha moment" — from the very first terminal command to deployment. It is written to stimulate memory and reinforce understanding.

---

## Where It Started — Fixing the Mental Model

Before a single line of code was written, there was a wrong mental model to fix.

**The original understanding:** *"React's main use is that it serves as additional memory to the view."*

This isn't completely wrong — there's an instinct in there. But it's imprecise enough to cause confusion. Here's the corrected mental model that drove everything we built:

> **React is a machine that keeps your UI in sync with your data — automatically.**

The problem React solves: in plain HTML/JavaScript, you manage two things separately — your data (JavaScript variables) and your UI (the DOM). When data changes, you have to manually reach into the DOM and update it. `document.getElementById('count').innerText = newCount`. This becomes catastrophically messy at scale.

React says: *"Just describe what the UI should look like given your data, and I'll handle making it so."* You write `<p>{count}</p>` and React guarantees the screen always reflects `count`. You never touch the DOM directly. The "additional memory" you sensed? That's **state** — the data React watches and reacts to.

---

## The Core Architecture Decision — Made Before Writing Any Code

Senior developers don't open their laptops and start typing. They think on paper first.

**The most important question asked at the start:** *"What is the data, who owns it, and who needs it?"*

The cart data was the key. The cart count shows in the **Navbar**. Cart items are managed on the **Cart page**. Items are added from the **Shop page**. Three different places. One piece of data.

The insight that came immediately: *"We make the item list in the parent component of both — kind of like a global component."*

**This is exactly right.** This is called **lifting state up** — one of React's core patterns. When two components need the same state, you move it to their closest common ancestor and pass it down.

```
App  ← cart state lives HERE
├── Navbar     (needs to READ cart count)
├── Shop       (needs to ADD to cart)
└── Cart       (needs to READ + MODIFY cart)
```

This instinct — before even knowing the official term — showed genuine understanding of the problem.

---

## Project Setup — The Commands and What They Actually Do

### The First Big Error

Running `npm install` in an empty folder produced this error:

```
npm error code ENOENT
npm error Could not read package.json
```

**What happened:** A folder called `ShoppingCart` was created manually, then `npm install` was run inside it. But `npm install` needs a `package.json` to know what to install. That file is created by Vite — it hadn't been run yet.

**The mental model:** An empty folder is just an empty plot of land. `npm create vite@latest` builds the house and creates the blueprint (`package.json`). `npm install` furnishes the house based on that blueprint. Trying to furnish a house that hasn't been built yet fails.

**The fix:** Run `npm create vite@latest . -- --template react` inside the folder (`.` means "here"), choose "Ignore files and continue", then `npm install`.

### What Each Setup Command Does

- `npm create vite@latest` — downloads Vite and runs it as a project scaffolder. Creates the entire project structure including `package.json`, `index.html`, `src/`, and all config files.
- `npm install` — reads `package.json` and downloads all listed dependencies into `node_modules/`. Never committed to Git because it can be hundreds of megabytes.
- `npm run dev` — starts Vite's local development server, usually at `localhost:5173`. Watches for file changes and hot-reloads.
- `npm run build` — compiles the entire app into optimised static files in `dist/`. This is what gets deployed.

### What Vite Creates — File by File

After setup, `ls src/` showed: `App.css App.jsx assets index.css main.jsx`

**`main.jsx`** — The entry point. The first file that runs. It finds the `<div id="root"></div>` in `index.html` and tells React: "everything you render goes inside here." This is why it's called a Single Page Application — there's only one real HTML page. Your entire app lives inside one div.

**`App.jsx`** — The root component. Where routing would live. Completely rewritten.

**`index.css`** — Global styles. Reset margins, set fonts, etc.

**`App.css`** — Demo styles from Vite. Deleted.

**`assets/`** — For images and static files.

---

## Routing — How React Fakes Multiple Pages

### The Core Concept

There's actually only **one HTML page**. React fakes navigation. `react-router-dom` watches the URL bar and tells React which component to render based on it. When you click "Shop", the URL changes to `/shop`, react-router-dom sees that, and swaps the component on screen. No page reload. No new HTML file fetched. Just React swapping components.

### Why `<Link>` Not `<a>`

This was one of the first conceptual questions: why use `<Link to="/shop">` instead of `<a href="/shop">`?

The answer: `<a href="/shop">` tells the **browser** to navigate. The browser does a full page reload — fetches new HTML, restarts everything. Your React app dies and restarts. Your cart state is wiped.

`<Link to="/shop">` tells **react-router-dom** to navigate. It just swaps the component on screen. Zero reload. App state stays alive.

### The Right Mental Model for Routes

```jsx
<BrowserRouter>        {/* makes everything inside URL-aware */}
  <Navbar />           {/* outside Routes = always rendered */}
  <Routes>             {/* the part that swaps */}
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
  </Routes>
</BrowserRouter>
```

`<BrowserRouter>` wraps everything and makes the current URL available to all children. `<Routes>` looks at all its `<Route>` children, finds the one whose `path` matches, and renders only that one. Everything outside `<Routes>` but inside `<BrowserRouter>` is permanent — that's where `<Navbar />` lives.

### The Navbar Placement Question

**Question asked:** Where do you put `<Navbar />` so it shows on all pages?

**Answer given:** "Outside router and inside browser router."

**Why this is correct:** `<Routes>` is the swapping part. Everything outside `<Routes>` but inside `<BrowserRouter>` renders on every route. Navbar needs to be inside `BrowserRouter` because `<Link>` only works inside a router context — it needs to know the current URL to function.

### The SPA Proof — Network Tab

After routing was working, the Network tab in DevTools was checked while clicking nav links. With "Preserve log" enabled and filtering by "Doc" (documents), clicking between pages showed **no new document requests**. The page count at the bottom stayed the same. React was swapping components in memory, not fetching new pages. This is the visual proof of what SPA means.

---

## The Import Error — A Critical Pattern

Early on, `App.jsx` was written before the page files existed. This produced:

```
Failed to resolve import "./pages/Shop/Shop" from "src/App.jsx". Does the file exist?
```

**The lesson:** JavaScript's module system is explicit. Files don't know about each other unless you explicitly import them. `import Shop from './pages/Shop/Shop'` tells JavaScript "go find this file." If the file doesn't exist, it crashes immediately.

This is actually a feature — it means you always know exactly where your code comes from.

---

## State — The Heart of React

### The Three-State Pattern for Async Data

When fetching data, three state variables are always needed:

```jsx
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
```

**Why loading?** Time. When the component first renders, the fetch hasn't finished. `products` is an empty array. Without a loading state, the user sees a blank screen with no explanation.

**Why error?** If the network fails, you need to show a message instead of silently breaking.

This three-state pattern appears every single time data is fetched in React. It's not optional — it's the correct way.

### The useEffect Dependency Array

`useEffect` has a second argument — the dependency array:

- `[]` — run once, when the component first mounts. Perfect for fetching data once.
- `[someValue]` — re-run every time `someValue` changes.
- No array — run after every single render. Almost never what you want.

### The Most Important React Rule — Never Mutate State

```jsx
// ❌ WRONG — mutating directly
item.quantity += 1

// ✅ RIGHT — creating a new object
{ ...item, quantity: item.quantity + 1 }
```

**Why?** React decides whether to re-render by checking if state changed. If you mutate the existing object, the reference in memory is the same — React sees no change, doesn't re-render, your UI stays stale. When you create a new object, React sees a new reference, knows something changed, and updates the UI.

This was taught early and proved to be one of the most important patterns in the entire project.

### The Spread + Override Pattern

```jsx
{ ...item, quantity: item.quantity + product.quantity }
```

`...item` copies every property from the existing item. Then `quantity: ...` overwrites just that one property. Everything else stays. This is how you update one field of an object without mutating it.

This pattern appeared constantly — in `addToCart`, in `updateQuantity`, in `handleAddToCart` in ProductDetail.

---

## Props vs Context — The Evolution of Data Flow

### Why Props Work (And Then Stop Working)

Props are like function arguments for components. `<Shop addToCart={addToCart} />` passes `addToCart` into `Shop` the same way you pass an argument to a function.

The data flow with props:

```
App (owns cartItems, addToCart)
├── Navbar   receives cartItems as prop
├── Shop     receives addToCart as prop
└── Cart     receives cartItems + updateQuantity as props
```

This works. But imagine the app grows:

```
App (owns cartItems)
└── Layout
    └── Navbar
        └── CartIcon  ← actually needs cartItems
```

You'd have to pass `cartItems` through `Layout` and `Navbar` even though they don't use it — they're just middlemen. This is called **prop drilling** and it's a real problem.

### Why Context Solves It

Context creates a global broadcast. Any component can tune in and grab what it needs directly.

```
CartContext (broadcasts cart data)
    ├── Navbar grabs it directly ✅
    ├── Shop grabs it directly ✅
    └── Cart grabs it directly ✅
```

The `useCart()` custom hook wraps `useContext(CartContext)`. Instead of calling `useContext(CartContext)` everywhere (and having to import `CartContext` everywhere), any component just calls `useCart()` and gets everything.

### The Common Ancestor Insight

Before even knowing about Context, the right instinct was: *"We make the item list in the parent component of both — kind of like a global component."*

This is exactly what Context does, formalised. `CartProvider` wraps the entire app, making cart data available everywhere — the ultimate "parent component."

### `{children}` Explained

```jsx
<CartProvider>
  <Navbar />
  <Routes />
</CartProvider>
```

`children` is whatever JSX you put between the opening and closing tags. `CartProvider` wraps everything and the `{children}` in its JSX renders whatever was passed inside it. Think of it as a parent passing a note to the whole classroom — every child in the room can read it.

---

## The Rules of Hooks — Two Critical Lessons

### Rule 1: Only Call Hooks Inside Components

This mistake was made:

```jsx
const { addToCart } = useCart()  // ← OUTSIDE the component

const ProductCard = ({ product }) => {
  // ...
}
```

Hooks must be called **inside** a component function, never outside, never in loops, never in conditions. React depends on hooks always being called in the same order every render. Breaking this causes bugs that are very hard to trace.

### Rule 2: Import Hooks Before Using Them

Several times `useState is not defined` or `useEffect is not defined` errors appeared. The fix was always the same — add the import:

```jsx
import { useState, useEffect } from 'react'
```

These errors are immediately readable once you know the pattern: "X is not defined" means X was used without being imported or declared.

---

## The Cart — Deeper Design Decisions

### What a Cart Item Actually Is

A cart item is just a product with a quantity attached:

```js
{
  id: 1,
  title: "Casual Denim Jacket",
  price: 89.99,
  image: "https://...",
  quantity: 2        // ← the only extra thing
}
```

Total price: `price * quantity`. Cart count in navbar: sum of all quantities via `.reduce()`.

### Why Quantity Lives in ProductCard, Not App

**Question:** Why does quantity state live inside `ProductCard` instead of lifted up to `App`?

**Answer:** The rule is "state lives where it's needed." Does any other component need the quantity sitting in a ProductCard? No — the Navbar doesn't, the Shop doesn't, the Cart doesn't. The Cart only cares about quantity *after* "Add to Cart" is clicked. It's completely local to that one card.

If quantity was in App, you'd need to track a separate quantity for every single product card — a messy object keyed by product ID. For state that only one component uses, keep it local.

### The Variant Problem — Same Product, Different Colors

**The bug:** Adding Gold bracelet, then Silver bracelet of the same product showed only one cart item. Silver's addition just incremented the Gold item's quantity.

**Root cause:** `addToCart` was finding existing items by `id` only. Since both bracelets had the same `id`, it treated them as the same item.

**The fix:** Identify cart items by `id + selectedColor + selectedSize` combined:

```jsx
const existingItem = prevItems.find(
  item => item.id === product.id && 
  item.selectedColor === product.selectedColor && 
  item.selectedSize === product.selectedSize
)
```

Same product in different colors/sizes = separate cart entries. This also meant `updateQuantity` needed the same fix — it was deleting both variants when removing one, because it also found by `id` only.

**The lesson:** When your unique identifier for something changes, every function that uses that identifier needs to be updated too. Always think about what "the same item" means in your specific context.

---

## Controlled Inputs — Why React Owns the Form

In plain HTML, inputs manage their own state. The DOM knows what's typed. In React, the preferred approach is controlled inputs — React owns the value:

```jsx
const [email, setEmail] = useState('')

<input 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Why React prefers this:** When the value lives in state, you can validate in real time, disable buttons until fields are filled, transform input (force uppercase, strip spaces), and pre-fill from saved data. The DOM is no longer in charge. React is.

### The `e.preventDefault()` Lesson

Forms in HTML reload the page on submit by default. `e.preventDefault()` stops that.

**Why a page reload is catastrophic in a React app:** React state lives in memory. A page reload wipes all JavaScript memory. Cart gone. Auth state gone. Everything gone.

---

## Common Mistakes Made and Their Lessons

### Mistake 1: Importing the Wrong Component

```jsx
import Login from './Signup'  // ← imported Signup but named it Login
```

The file was correct but the name was wrong. When `<Signup />` was used in the test, JavaScript had no idea what `Signup` was — it was imported as `Login`. The rule: the name after `import` is what you use in the code. Make it match what the component actually is.

### Mistake 2: Using Variables Before They're Defined

```jsx
const handleSubmit = () => {
  if (!email) { ... }  // ← email doesn't exist, state is called 'identifier'
}

const [identifier, setIdentifier] = useState('')
```

This happened during the Login refactor from `email` to `identifier`. The old variable name was left in the function while the state was renamed. The error was `email is not defined` — clear once you know to look for it.

### Mistake 3: Defining a Component Inside a Component

```jsx
const ProductDetail = () => {
  const ProductDetail = () => {  // ← wrong, nested definition
    // ...
  }
}
```

This created a component defined inside itself. The outer component rendered nothing. The inner component was never accessible. Always check that opening and closing braces match when copying/editing code.

### Mistake 4: `useState` Called Outside a Component

```jsx
const Users = [email, password] = useState([])  // ← inside handleSubmit
```

Attempting to use `useState` inside a function (not at the top level of a component) breaks the Rules of Hooks. State is always declared at the top of the component, never inside event handlers, conditionals, or loops.

### Mistake 5: Forgetting to Pass the Category in Link

```jsx
<Link to="/shop">  // ← missing the category query parameter
```

The category cards on the home page were linking to `/shop` without the query parameter. The URL stayed at `/shop` with no filter applied. The fix was a template literal: `` to={`/shop?category=${cat}`} ``. The test: always check the URL bar after clicking a link to verify what was actually sent.

### Mistake 6: PropTypes After Export / Before Component

```jsx
CartDrawer.propTypes = { ... }  // ← before the component definition

const CartDrawer = () => { ... }
```

This caused `Cannot access 'CartDrawer' before initialization`. PropTypes must be defined after the component function, before the export. The correct order: imports → component function → PropTypes → export default.

---

## `.reduce()` — The Array Method That Took Explanation

`.map()` transforms every item. `.filter()` removes some items. `.reduce()` collapses the entire array into a single value.

For the cart count:

```js
cartItems.reduce((total, item) => total + item.quantity, 0)
```

Step by step with `[{ quantity: 3 }, { quantity: 2 }, { quantity: 5 }]`:

```
Start:  total = 0
Step 1: total = 0 + 3 = 3
Step 2: total = 3 + 2 = 5
Step 3: total = 5 + 5 = 10
Result: 10
```

`total` is the accumulator — it carries the running result. The `0` at the end is the starting value.

---

## URL Query Parameters — State That Lives in the URL

For the shop category filter and search, state was stored in the URL instead of React state:

```
/shop?category=electronics
/shop?search=jacket
```

`useSearchParams` from react-router-dom reads and writes these parameters — it works exactly like `useState` but the value lives in the URL.

**Why this is better than React state for filters:**
- The URL is shareable — send someone `yoursite.com/shop?category=electronics` and they land on filtered electronics
- Browser back button works naturally
- Page refresh preserves the filter
- React state would be wiped on refresh; URL parameters survive

---

## Testing — The Philosophy and the Patterns

### Why Tests Exist

Manual testing (clicking around) works for 5 components. At 50 components, you can't manually test everything every time you change something. Automated tests do that for you — written once, running in milliseconds forever.

### React Testing Library's Philosophy

> Test what the user sees and does, not implementation details.

You don't test "does this state variable equal X". You test "does the user see this text" or "when the user clicks this button, does this appear".

### The `getByRole` Lesson

The first test failure came from:

```
Found multiple elements with the text: Login
```

Both the `<h1>Login</h1>` and `<button>Login</button>` matched `getByText('Login')`. The fix — `getByRole`:

```jsx
screen.getByRole('heading', { name: 'Login' })  // finds the h1
screen.getByRole('button', { name: 'Login' })   // finds the button
```

`getByRole` is the preferred query because it reflects how screen readers and accessibility tools find elements — meaning your tests double as accessibility checks.

### Why Tests Need All Fields Filled

The email validation test for Signup was failing because only email and password were filled — but Signup has 4 fields. The "please fill in all fields" validation fired first, before the email validation was even reached.

**The lesson:** Tests must reflect real user behaviour. A real user testing email validation would fill in all required fields except make the email bad. Your test has to do the same. Tests that don't mirror real usage give false confidence.

### Mocking — Replacing the Real World in Tests

**Why mock `fetch`?** Real API calls are slow and unreliable in tests. Tests should be deterministic — same result every time. We're testing our component logic, not the API. So `fetch` is replaced with a fake function that immediately returns controlled data.

**Why mock `useParams`?** `ProductDetail` reads the product ID from the URL. In tests there's no real URL. `vi.mock('react-router-dom')` replaces the real implementation with a fake that returns `{ id: '1' }`.

```jsx
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,                     // keep everything real
    useParams: () => ({ id: '1' }) // override just this one
  }
})
```

### The `CartContext` Test Component Pattern

To test Context functions, a helper component was created inside the test file that uses the context and renders buttons to trigger actions:

```jsx
const CartTester = () => {
  const { cartItems, addToCart } = useCart()
  return (
    <div>
      <p data-testid="cart-count">{cartItems.length}</p>
      <button onClick={() => addToCart(...)}>Add Item</button>
    </div>
  )
}
```

This lets you test context logic by simulating real user interactions (button clicks) and asserting on what the user would see (the count). `data-testid` attributes are specifically for tests — they don't appear visually but let you find elements precisely.

---

## Auth — Building a Real-Feeling System Without a Real Backend

### The Design Challenge

FakeStore API has a login endpoint but it doesn't actually persist users you create. So a hybrid approach was built:
- **Signup** saves users to localStorage
- **Login** checks localStorage users first, falls back to FakeStore API
- **Logout** saves the cart, clears state, redirects

### Why localStorage for Auth

localStorage persists data between page reloads. `JSON.stringify` converts objects to strings for storage. `JSON.parse` converts them back to objects when reading. localStorage can only store strings — this is the bridge.

### The Per-User Cart Key Pattern

```js
localStorage.setItem(`cart_${email}`, JSON.stringify(cartItems))
localStorage.getItem(`cart_${email}`)
```

Each user's cart is stored under a unique key (`cart_user@email.com`). When a user logs in, their specific cart is loaded. When they log out, their cart is saved and the cart state is cleared. The next user who logs in gets a clean cart (or their own saved one).

### The `identifier` vs `email` Bug

When Login was refactored to accept username or email, the state was renamed from `email` to `identifier`. But inside `handleSubmit`, the old name `email` was accidentally left:

```jsx
if (!email || !password) {  // ← should be !identifier
```

`email` was undefined, so the check never fired correctly. The bug was invisible until looking carefully at every variable name after a refactor.

**The broader lesson:** When you rename something, use "Find and Replace All" — don't manually hunt through the code. You will miss one.

---

## `useSearchParams` — The Right Tool for URL State

```jsx
const [searchParams, setSearchParams] = useSearchParams()
const categoryParam = searchParams.get('category')
const clearFilter = () => setSearchParams({})
```

Works exactly like `useState` but the value is the URL query string. Getting a param: `.get('key')`. Setting params: `setSearchParams({ key: 'value' })`. Clearing: `setSearchParams({})`.

---

## `useNavigate` vs `<Link>` — Two Ways to Navigate

`<Link to="/shop">` — declarative navigation. The user clicks something and goes there.

`useNavigate` — programmatic navigation. Your code decides when to navigate:

```jsx
const navigate = useNavigate()
navigate('/')           // go to home
navigate(-1)            // go back (like browser back button)
navigate(`/product/${id}`)  // go to dynamic route
```

Used in: after successful login (navigate to home), after signup (navigate to login), Back button in ProductDetail (`navigate(-1)`).

---

## Dynamic Routes — `/product/:id`

```jsx
<Route path="/product/:id" element={<ProductDetail />} />
```

`:id` is a URL parameter — a variable part of the URL. Product 1 is `/product/1`, product 5 is `/product/5`.

In the component:

```jsx
const { id } = useParams()
fetch(`https://fakestoreapi.com/products/${id}`)
```

`useParams()` extracts the `:id` value from the current URL. This is how one component serves many different products — the URL tells it which one to fetch.

---

## `useRef` — The Non-Re-rendering Memory

The navbar dropdown needed to close when clicking outside. This required:
1. A reference to the dropdown DOM element
2. An event listener that checks if a click was inside or outside

```jsx
const dropdownRef = useRef(null)

useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false)
    }
  }
  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [])

<div ref={dropdownRef}>...</div>
```

`useRef` creates a mutable reference that doesn't cause re-renders when changed. Perfect for holding a DOM reference. The cleanup function returned from `useEffect` removes the event listener when the component unmounts — preventing memory leaks.

---

## CSS Architecture — The Global Styles Problem

Plain CSS in React is **global**. `.button { color: red }` in `Navbar.css` affects every `.button` in the entire app. This is why naming classes specifically matters — `.navbar-button` not `.button`.

The approach taken: one CSS file per component, named to match, imported at the top of the component. This keeps styles organised but requires careful class naming to avoid conflicts.

The alternative — CSS Modules — scopes styles automatically. Worth learning next.

---

## The SPA Deployment Problem — Why Vercel Needed Config

Without `vercel.json`, visiting `yoursite.com/shop` directly (or refreshing on that page) would give a 404.

**Why:** Vercel is a static file server. When you visit `yoursite.com/shop`, it looks for a file at `/shop/index.html` on the server. That file doesn't exist — there's only one real HTML file at the root.

**The fix:** Tell Vercel to redirect everything to `/index.html` and let React Router handle it:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Now every URL — regardless of what it is — serves the same `index.html`. React boots up, reads the URL, and React Router renders the correct component. The user sees the right page. No 404.

---

## What Was Built Beyond the Requirements

The base assignment asked for: Home, Shop, Cart pages + Navbar + API fetch + cart count + PropTypes + tests + styling + deployment.

What was actually built on top of that:

- **Login and Signup pages** with full validation, localStorage persistence, and per-user cart
- **Product Detail page** with color/size selection, discount badges, feature lists, and add-to-cart with confirmation
- **Cart Drawer** — sliding sidebar that opens over any page
- **Category filtering** via URL query parameters from both navbar links and category cards
- **Search** via URL query parameters
- **Cart variant support** — same product in different colors/sizes are separate cart entries
- **Pre-selected variants** when navigating to product detail from cart
- **Public-only routes** — logged-in users redirected away from auth pages
- **Per-user cart persistence** in localStorage
- **Footer** with links, social icons, and newsletter input
- **32 tests** covering all critical paths

---

## The Biggest Lessons in One Place

1. **Understand the problem before reaching for a solution.** The cart state problem was understood fully before a single line of context code was written.

2. **State lives where it's needed.** Local state stays local. Only lift state when multiple components need it.

3. **Never mutate state directly.** Always create new objects/arrays. React can't see mutations.

4. **Read error messages literally.** Every error in this project had an exact, readable message. `useState is not defined` = missing import. `Cannot access before initialization` = used before defined. `Failed to resolve import` = file doesn't exist.

5. **The URL is state too.** Filters, search, selected variants — all stored in the URL for shareability and browser-history support.

6. **Tests must mirror real user behaviour.** A test that doesn't fill all required fields before testing validation isn't testing what a real user would do.

7. **Mock the outside world in tests.** APIs, URL params, external libraries — replace them with controlled fakes so tests are fast and deterministic.

8. **Commit working code immediately.** Every time a feature worked, it should have been committed. Git is a time machine — use it.

9. **Separation of concerns.** `App.jsx` handles routing. `CartContext.jsx` handles cart logic. `AuthContext.jsx` handles auth. Each file has one job.

10. **The right mental model is the most powerful tool.** Before writing a single component, understanding *what React actually does* — keeps UI in sync with data — made every subsequent decision clearer.

---

*Built from scratch in one session. From `npm create vite@latest` to a deployed, tested, full-featured e-commerce application.*
