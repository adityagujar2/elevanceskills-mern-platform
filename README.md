# ElevanceSkills MERN Video Platform

An educational MERN stack project to demonstrate six video-platform modules for the ElevanceSkills internship assignment.

> **Project status:** Initial setup. The features below are the planned implementation scope, not a claim that they are already complete.

## Technology stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT-based sessions and password hashing
- **Payments:** Razorpay Test Mode
- **Real-time calls:** WebRTC with a signaling server (Socket.IO)
- **Video playback:** Custom HTML5 video controls

## Planned modules

1. **Multilingual comments** — threaded replies, reactions, mentions, sorting, reporting, moderation history, translation integration, and abuse/rate-limit checks.
2. **Download management** — plan-based quotas, authorized download requests, download history, and duplicate-request protection.
3. **Subscriptions** — Free, Bronze, Silver, and Gold plans, billing history, Razorpay test payments, and server-side payment verification.
4. **Account security** — IST-based default theme, persistent user preference, login history, and OTP verification for unfamiliar devices or locations.
5. **Custom video player** — playback controls, speed and volume, seeking, theater/full-screen/PiP modes, subtitles when available, keyboard shortcuts, and watch progress.
6. **Real-time video calls** — room links, camera/microphone controls, screen sharing, participant status, chat, and host moderation.

## Repository layout (target)

```text
elevanceskills-mern-platform/
├── client/                 # React + Vite frontend
├── server/                 # Express API
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   └── .env.example
├── docs/                   # Architecture and internship report
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js LTS and npm
- MongoDB local instance or MongoDB Atlas database
- Git and a GitHub account

## Development setup

The application code is being added incrementally. Once `client/` and `server/` have been created, install dependencies in each folder using `npm install`, configure local environment variables from `.env.example`, and run the scripts defined in each package file.

Never commit real secrets. Keep API keys, JWT secrets, database credentials, OTP provider credentials, and Razorpay secret keys in environment variables. Use Razorpay **Test Mode** during development.

## Security notes

- Enforce authorization, subscription status, and download quotas on the server, not only in the React UI.
- Verify Razorpay payments on the server and validate webhook signatures before activating paid plans.
- Hash passwords and OTP values; expire OTPs and limit verification attempts.
- Avoid storing unnecessary personal data. Treat IP and approximate location data as security-sensitive and explain their use to users.
- Use HTTPS in deployment. WebRTC media encryption and end-to-end encryption have distinct requirements; do not claim end-to-end encryption unless the implementation actually provides it.
- Use licensed or self-created sample videos and respect copyright.

## Internship report

The final report will cover: Introduction, Background, Learning Objectives, Activities and Tasks, Skills and Competencies, Feedback and Evidence, Challenges and Solutions, Outcomes and Impact, and Conclusion. Document only work that has actually been implemented and tested.

## Author

Aditya Gujar

## License

No license has been selected yet. Until one is added, others should not assume they have permission to reuse this repository's code.
