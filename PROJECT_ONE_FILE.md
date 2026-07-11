# Text-to-Image — Project Explanation (single-file)

This file explains what the project is, how it works, which technologies are used, the main features, where to find important code, how to run it, and suggested next steps. It is the canonical one-file overview for this workspace.

---

**At a glance**
- Purpose: A full‑stack demo that converts user text prompts into images. The frontend is a React (Vite) app and the backend is an Express + MongoDB API that handles user auth, credit management, and image-generation requests.
- Main features: user registration/login (JWT), credit balance tracking, text-to-image generation via an external API (Clipdrop in the current implementation), client UI for prompt input and result display, and a Buy Credits UI for purchasing (frontend placeholder).

---

## 1. Architecture & how it works

- Frontend: React app located in the `client/` folder. Built with Vite and using React Router, Tailwind (styles), `axios` for API calls, and `react-toastify` for notifications.
- Backend: Node.js + Express app in the `server/` folder. Uses `mongoose` to talk to MongoDB, `jsonwebtoken` for auth tokens, and an image generation controller that calls the Clipdrop text-to-image API.
- Data: Users are stored in MongoDB (`server/models/userModel.js`) with a `creditBalance` field used to gate image generation.
- Auth: JWT token is issued at login/register and must be sent in the `token` header on protected requests. The middleware reading the header is `server/middlewares/auth.js`.

High-level request flow:
1. User signs up or logs in via `/api/user/register` or `/api/user/login` and receives a JWT.
2. User visits the homepage and types a prompt.
3. Frontend calls POST `/api/image/generate-image` with `{ prompt }` and the `token` header.
4. `imageController.generateImage` verifies the user, checks credit balance, forwards the prompt to the Clipdrop API, converts the returned binary to a base64 data URI, deducts one credit, and responds with `resultImage` (a data URI) and the updated credit balance.
5. Frontend displays the returned `resultImage` to the user. If credits reach zero, the UI redirects to the Buy Credit page.

Note: The current controller returns images as base64 data-URIs in the response rather than persisting files to disk. The `images_generated/` folder exists in the repo but is not required by the current controller code.

---

## 2. Key technologies used

- Frontend: React (17+/18+), Vite, React Router, Tailwind (via package dependencies), `axios`, `react-toastify`.
- Backend: Node.js + Express (ES module style), `mongoose` for MongoDB, `jsonwebtoken` for auth, `bcrypt` for password hashing, `axios` & `form-data` for calling external image APIs, and `dotenv` for environment variables.
- External services/libraries noted in code:
  - Clipdrop text-to-image API (called in `server/controllers/imageController.js` with the `CLIPDROP_API` key).
  - `razorpay` is listed as a dependency in `server/package.json` (suggesting payment integration may be planned), but server code currently does not use it.

---

## 3. Main features (current)

- User registration (`/api/user/register`) — hashes password with `bcrypt`, stores user, returns JWT and basic user info.
- User login (`/api/user/login`) — verifies credentials, returns JWT and user name.
- Credit lookup (`/api/user/credits`) — protected route returning the user's current `creditBalance`.
- Generate image (`/api/image/generate-image`) — protected route that:
  - Validates user and prompt.
  - Checks `creditBalance` (rejects when 0).
  - Sends prompt to Clipdrop API and receives binary image data.
  - Converts to a `data:image/png;base64,...` URI and returns it to the client.
  - Deducts 1 credit from the user's `creditBalance`.
- Frontend UI: prompt input, generate button, result page, credit-aware UX that redirects to Buy Credits when balance is depleted.

Partial / placeholder features:
- Buy Credits UI (`client/src/pages/BuyCredit.jsx`) displays plans, but the purchase flow is currently a frontend placeholder and does not connect to a server purchase endpoint yet.

---

## 4. Important files (where to look)

- Server entry: [server/server.js](server/server.js)
- MongoDB helper: [server/config/mongodb.js](server/config/mongodb.js)
- User model: [server/models/userModel.js](server/models/userModel.js)
- User controllers: [server/controllers/userController.js](server/controllers/userController.js)
- Image controller: [server/controllers/imageController.js](server/controllers/imageController.js)
- User routes: [server/routes/userRoutes.js](server/routes/userRoutes.js)
- Image routes: [server/routes/imageRoutes.js](server/routes/imageRoutes.js)
- Auth middleware: [server/middlewares/auth.js](server/middlewares/auth.js)
- Client entry: [client/src/main.jsx](client/src/main.jsx)
- App and routing: [client/src/App.jsx](client/src/App.jsx)
- App context (API client, token, credits): [client/src/context/Appcontext.jsx](client/src/context/Appcontext.jsx)
- Buy credits page: [client/src/pages/BuyCredit.jsx](client/src/pages/BuyCredit.jsx)
- Prompt / generate UI: [client/src/pages/Home.jsx](client/src/pages/Home.jsx) and [client/src/components/GenerateBtn.jsx](client/src/components/GenerateBtn.jsx)

---

## 5. Environment & running locally

Prerequisites:
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

Environment variables (create `server/.env` with values):
- `MONGODB_URI` — e.g. `mongodb://127.0.0.1:27017`
- `JWT_SECRET` — string used to sign JWTs
- `PORT` — optional Express port (default in code is 4000)
- `CLIPDROP_API` — API key for Clipdrop text-to-image

Install & run (from workspace root) — run these in two terminals:

```powershell
cd server
npm install
npm run server   # uses nodemon (or `npm start` to run once)

cd ../client
npm install
npm run dev
```

Open the client (Vite) URL (usually `http://localhost:5173`) and interact with the app.

---

## 6. Notes, gotchas, and suggested improvements

- Current image generation: The backend converts the external API binary into a base64 data-URI and returns it. If you plan to persist images for later serving or scale beyond small payloads, store images in an object store (S3 / Azure Blob) and return stable URLs.
- Credit deductions: The controller deducts credits synchronously after a successful API call. On production systems consider idempotency and race conditions (use DB transactions or retry-safe updates).
- Long-running generation: If switching to a heavy model (local or queued GPU workers), do not block the Express thread. Use background workers and return a job id + polling/webhook flow.
- Payments: `razorpay` appears in `server/package.json` but no backend endpoints currently implement payments. Implement secure server-side payment capture and then credit the user's `creditBalance` after verification.
- Security: Store `JWT_SECRET` and API keys securely (do not commit `.env`); add rate-limiting and input validation on prompt content.

---

## 7. Quick API reference (actual routes)

- POST `/api/user/register` — body: `{ name, email, password }` → returns `{ success, token, user }` on success.
- POST `/api/user/login` — body: `{ email, password }` → returns `{ success, token, user }` on success.
- GET `/api/user/credits` — headers: `{ token }` → returns `{ success, credits, user }`.
- POST `/api/image/generate-image` — headers: `{ token }`, body: `{ prompt }` → returns `{ success, creditBalance, resultImage }` where `resultImage` is a base64 data URI.

---

If you want, next I can:
- wire a payments endpoint and server-side Razorpay integration to complete the Buy Credits flow;
- persist generated images to disk or to an object store and return stable URLs instead of data URIs;
- replace Clipdrop with another image provider or a local model and add a background job queue for async generation;
- run the servers here and demonstrate a full prompt → image roundtrip in the running app.

Tell me which of the above you'd like me to implement next.
