# ElevanceSkills MERN Video Platform

An educational MERN stack project to demonstrate six video-platform modules for the ElevanceSkills internship assignment.

> **Project status:** The repository contains the React dashboard and Express/MongoDB foundation. GitHub Pages deployment is configured for the frontend demo. The six assignment modules are not yet production-complete; payment, authentication, quota enforcement, and real-time calling require backend configuration and testing.

## Technology stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB with Mongoose
- **API protection baseline:** Helmet, CORS configuration, JSON size limits and request rate limiting
- **Payments (planned):** Razorpay Test Mode
- **Real-time calls (planned):** WebRTC with a signaling server (Socket.IO)

## Current progress

- [x] Repository and project documentation
- [x] React dashboard shell with six module cards
- [x] Express API health endpoint
- [x] MongoDB connection support
- [x] Environment-variable examples
- [x] Registration/login API with bcrypt password hashing and JWT authentication
- [x] Comment API baseline: create, edit, delete, reactions, reports and basic abuse checks
- [x] MongoDB models for users, videos, comments, reports, subscriptions and downloads
- [x] Plan policy and daily download quota baseline
- [x] Theme preference endpoint and watch-progress API baseline
- [x] Meeting-room metadata API baseline
- [ ] Email/mobile OTP delivery and persistent login audit records
- [ ] Translation provider, robust multilingual moderation and CAPTCHA integration
- [ ] Razorpay order creation, signature verification, webhooks and invoices
- [ ] Protected media storage and atomic download quota reservation
- [ ] Full custom player UI integrated with persistent watch progress
- [ ] WebRTC signaling, group media routing and in-call controls
- [ ] Automated test suite, deployment verification and final internship report

## API routes available in the current scaffold

- `GET /api/health` — API and MongoDB connection status
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` — basic account API
- `GET /api/videos`, `GET /api/videos/:id` — video catalogue/access baseline
- `GET /api/comments/video/:videoId`, `POST /api/comments`, `PATCH /api/comments/:id`, `DELETE /api/comments/:id`, `POST /api/comments/:id/report`, `POST /api/comments/:id/reaction`
- `GET /api/subscriptions/plans`, `GET /api/subscriptions/me`
- `GET /api/downloads/me`, `POST /api/downloads/:videoId`
- `PATCH /api/security/theme`, `GET /api/security/logins`, `POST /api/security/otp/verify`
- `POST /api/meetings`, `GET /api/meetings/:id`
- `GET /api/watch-progress/:videoId`, `PUT /api/watch-progress/:videoId`

Routes marked as a baseline or placeholder are not production-complete. In particular, paid subscriptions are not activated, OTP is not delivered, watch progress and meeting rooms currently use in-memory demo storage, and media delivery requires a protected storage provider. Review and test all code before submitting it for evaluation.

## Planned modules

1. **Multilingual comments** — threaded replies, reactions, mentions, sorting, reporting, moderation history, translation integration, and abuse/rate-limit checks.
2. **Download management** — plan-based quotas, authorized download requests, download history, and duplicate-request protection.
3. **Subscriptions** — Free, Bronze, Silver, and Gold plans, billing history, Razorpay test payments, and server-side payment verification.
4. **Account security** — IST-based default theme, persistent user preference, login history, and OTP verification for unfamiliar devices or locations.
5. **Custom video player** — playback controls, speed and volume, seeking, theater/full-screen/PiP modes, subtitles when available, keyboard shortcuts, and watch progress.
6. **Real-time video calls** — room links, camera/microphone controls, screen sharing, participant status, chat, and host moderation.

## Requirements

- Node.js LTS and npm
- MongoDB local instance or MongoDB Atlas database
- Git

## Hosted frontend

A GitHub Actions workflow builds and deploys the React frontend to GitHub Pages whenever changes are pushed to `main`. After the first successful run, the frontend URL is expected to be:

`https://adityagujar2.github.io/elevanceskills-mern-platform/`

GitHub Pages hosts static frontend files only. The Express API and MongoDB are not hosted by GitHub Pages; deploy the backend to a Node.js host and configure `VITE_API_URL` as a GitHub Actions repository variable before expecting API-backed features to work online.

## Run locally

From the repository root:

1. Install the root tooling:

   ```bash
   npm install
   ```

2. Install frontend and backend dependencies:

   ```bash
   npm run install:all
   ```

3. Copy the environment examples to local environment files:
   - Copy `server/.env.example` to `server/.env`
   - Copy `client/.env.example` to `client/.env`

   On Windows PowerShell:

   ```powershell
   Copy-Item server/.env.example server/.env
   Copy-Item client/.env.example client/.env
   ```

4. Ensure MongoDB is running locally or update `MONGODB_URI` in `server/.env` to your MongoDB Atlas connection string.

5. Start the frontend and backend from the root directory:

   ```bash
   npm run dev
   ```

6. Open the frontend at http://localhost:5173. The API is at http://localhost:5000 and its health endpoint is http://localhost:5000/api/health.

The backend can start without `MONGODB_URI` for initial UI/API exploration, but database-backed features will require a working MongoDB connection.

## Environment and security

- Never commit `.env` files or real secrets. Only commit the provided `.env.example` templates.
- Enforce authorization, subscription status, and download quotas on the server, not only in the React UI.
- Verify Razorpay payments on the server and validate webhook signatures before activating paid plans.
- Hash passwords and OTP values; expire OTPs and limit verification attempts.
- Avoid storing unnecessary personal data. Treat IP and approximate location data as security-sensitive and explain their use to users.
- Use HTTPS in deployment. WebRTC media encryption and end-to-end encryption have distinct requirements; do not claim end-to-end encryption unless the implementation actually provides it.
- Use licensed or self-created sample videos and respect copyright.

## Internship report

The final report should cover: Introduction, Background, Learning Objectives, Activities and Tasks, Skills and Competencies, Feedback and Evidence, Challenges and Solutions, Outcomes and Impact, and Conclusion. Document only work that has actually been implemented and tested.

## Author

Aditya Gujar

## License

No license has been selected yet. Until one is added, others should not assume they have permission to reuse this repository's code.
