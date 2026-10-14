# ElevanceSkills MERN Video Platform

An educational MERN stack project to demonstrate six video-platform modules for the ElevanceSkills internship assignment.

> **Project status:** The repository currently contains the initial application scaffold and dashboard. The six feature modules are planned work and are not yet implemented.

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
- [ ] Authentication, registration and OTP verification
- [ ] Commenting, translation and moderation
- [ ] Subscription plans and verified test payments
- [ ] Download authorization and quotas
- [ ] Custom video player and playback progress
- [ ] Real-time video calls
- [ ] Automated tests and final internship report

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
