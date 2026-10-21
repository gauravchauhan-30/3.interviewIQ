# InterviewIQ 🎯

An AI-powered mock interview platform built with the MERN stack. Upload your resume, get personalized interview questions, answer them **by voice or text** against a timer, and receive an AI-scored report with charts.

**Live Demo:** [](https://three-interviewiq-1-2g0t.onrender.com)

## ✨ Features

- **Google Sign-In** — Login with Firebase Authentication. The backend then issues its own JWT, stored in an httpOnly cookie.
- **Resume Analysis** — Upload a PDF resume. The server extracts the text (`pdfjs-dist`) and the AI pulls out your role, experience, projects, and skills.
- **Personalized Questions** — 5 questions per interview (2 easy, 2 medium, 1 hard) in either **Technical** or **HR** mode, based on your resume and role.
- **Voice Interview** — An AI interviewer reads each question aloud (Web Speech API, Speech Synthesis) and listens to your spoken answer (Speech Recognition). Typing is also supported.
- **Timed Answers** — Each question has a time limit (60s / 90s / 120s) shown with a circular timer.
- **AI Scoring and Feedback** — Every answer is scored out of 10 on **confidence, communication, and correctness**, with short feedback.
- **Performance Report** — Overall score, skill bars, per-question trend chart (Recharts), and question-wise breakdown. Download the report as a **PDF** (jsPDF).
- **Interview History** — Revisit past interviews and their reports anytime.
- **Credit System** — New users start with free credits. Each interview uses 50 credits.
- **Animated UI** — Responsive interface built with Tailwind CSS and Framer Motion.

---

## 🛠️ Tech Stack

**Frontend:** React 19, Vite, Redux Toolkit, React Router, Axios, Tailwind CSS, Framer Motion, Recharts, jsPDF, react-circular-progressbar

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, pdfjs-dist

**Services:** Firebase Authentication (Google), OpenRouter API (GPT-4o-mini)

**Browser APIs:** Web Speech API (Speech Synthesis and Speech Recognition)

---

## 🧭 How It Works

```
Frontend (React)  --1. login-->  Firebase (Google)
Frontend (React)  --2. API call + cookie-->  Backend (Express)
Backend (Express) --3. save / read-->  MongoDB
Backend (Express) --4. prompts-->  AI (OpenRouter)
```

1. The user signs in with Google. The backend creates the user (if new) and sets a JWT cookie.
2. The user uploads a resume. The backend extracts the text and asks the AI for role, experience, projects, and skills.
3. The backend generates 5 questions, deducts credits, and saves the interview in MongoDB.
4. During the interview, the AI speaks each question. The user answers by voice or text.
5. Each answer is sent to the AI for scoring. Scores and feedback are saved.
6. After the last question, the app calculates averages and shows the report.

---

## 📁 Project Structure

```
InterviewIQ/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── components/     # Navbar, AuthModel, Step1SetUp, Step2Interview, Step3Report, Timer
│       ├── pages/          # Home, Auth, InterviewPage, InterviewHistory, InterviewReport, Pricing
│       ├── redux/          # store.js, userSlice.js
│       └── utils/          # firebase.js
└── server/                 # Express backend
    ├── config/             # DB connection, JWT helper
    ├── controllers/        # auth, user, interview, payment
    ├── middlewares/        # isAuth (JWT check), multer (file upload)
    ├── models/             # User, Interview, Payment
    ├── routes/
    ├── services/           # OpenRouter (AI), Razorpay
    └── index.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB database (MongoDB Atlas works)
- A Firebase project with Google sign-in enabled
- An [OpenRouter](https://openrouter.ai) API key
- Chrome or Edge (needed for voice input)

### 1. Clone and install

```bash
git clone https://github.com/gauravchauhan-30/3.interviewIQ.git
cd 3.interviewIQ

cd server && npm install
cd ../client && npm install
```

### 2. Environment variables

Create `server/.env`:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
OPENROUTER_API_KEY=your_openrouter_key
```

Create `client/.env`:

```env
VITE_FIREBASE_APIKEY=your_firebase_web_api_key
```

Then open `client/src/utils/firebase.js` and replace the Firebase config values (`authDomain`, `projectId`, etc.) with your own project's values.

> The backend URL is set in `client/src/App.jsx` (`ServerUrl`, default `http://localhost:8000`). Change it when you deploy.

### 3. Run

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

Open `http://localhost:5173`.

---

## 🔌 API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/google` | Create or find the user, set JWT cookie |
| GET | `/api/auth/logout` | Clear the cookie |
| GET | `/api/user/current-user` | Get the logged-in user |
| POST | `/api/interview/resume` | Upload a PDF and extract role and skills |
| POST | `/api/interview/generate-questions` | Create 5 questions, deduct credits |
| POST | `/api/interview/submit-answer` | Score one answer with AI |
| POST | `/api/interview/finish` | Calculate final scores |
| GET | `/api/interview/get-interview` | List the user's interviews |
| GET | `/api/interview/report/:id` | Get a full report |

All routes except login and logout need the JWT cookie.

---

## ⚠️ Known Limitations

- **Payments are not enabled.** The repository contains an unfinished Razorpay credit-purchase flow, but it is currently disabled. The app runs on the free starting credits.
- **Auth hardening:** the backend currently trusts the name and email sent after the Firebase popup. Verifying the Firebase ID token on the server (Firebase Admin SDK) is the planned fix.
- **Credit check is not atomic**, so two simultaneous requests could both pass. A single `findOneAndUpdate` with a `$gte` condition would fix it.
- **Frontend routes are not guarded** (the APIs are). A `ProtectedRoute` component is planned.
- **AI responses are parsed as JSON directly**, so a malformed response returns an error. Cleaning and retrying is planned.
- **Voice input** works in Chromium browsers (Chrome, Edge). Other browsers can type the answer.
- Scanned (image-only) PDFs are not supported, since there is no OCR.

---

## 🔮 Future Improvements

- Protected routes and server-side Firebase token verification
- Atomic credit deduction and a robust AI response parser
- Enable the payment flow with webhook-based confirmation
- OCR for scanned resumes
- Follow-up questions based on the candidate's answers

---

## 👨‍💻 Author

**[Gaurav Chauhan]**

- GitHub:  https://github.com/gauravchauhan-30
- LinkedIn: https://www.linkedin.com/in/gauravchauhan30

---

## 📄 License

This project is for learning and portfolio purposes.
