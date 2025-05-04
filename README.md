#  TechHunt

**TechHunt** is a modern job board tailored for tech professionals in India. It curates high-quality tech roles across categories like Frontend, Backend, Full Stack, Data Science, and DevOps — focusing on junior to mid-level developers (0–5 years of experience). TechHunt emphasizes remote-first jobs and offers a clean, fast, and mobile-friendly interface.

---

## 🌐 Live Demo

🔗 [Visit TechHunt](https://tech-hunt-jobs.vercel.app)  

---

## 📌 Features

- 🎯 Entry-to-mid level job listings (0–5 years experience)
- 🧑‍💻 Curated tech roles: Full Stack, Frontend, Backend, Data Science, DevOps
- 🌍 Filter by remote, hybrid, or in-office
- 🆕 Listings updated every 4 days
- 🔎 Category-based filtering and search
- ⚡ Fast, responsive, and mobile-friendly interface

---

## 🛠️ Tech Stack

### Frontend

- **Next.js** — App router
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Type safety and dev efficiency
- **Shadcn/UI** — Accessible, reusable components

### Backend

- **Node.js + Express** — Lightweight REST API
- **Redis** — Caching for performance & rate limiting

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/shubGupta10/OpenFindr
cd techhunt
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3. Environment Variables

Create .env files in both the client/ and server/ directories.

🟦 Client (client/.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Start the Development Servers

```bash
# Start backend (in terminal 1)
cd server
npm run dev

# Start frontend (in terminal 2)
cd client
npm run dev
```

Visit http://localhost:3000 in your browser.

---

## 📁 Folder Structure

```bash
techhunt/
├── client/               # Frontend - Next.js
│   ├── app/              # App Router pages
│   ├── components/       # Reusable components
│   ├── styles/           # Tailwind setup
│   └── ...
├── server/               # Backend - Express
│   ├── routes/           # API endpoints
│   ├── controllers/      # Logic handlers
│   ├── services/         # Job scraping, caching, etc.
│   └── ...
├── README.md
└── ...
```

---


## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

---


## 🙌 Acknowledgements

- Built with ❤️ by Shubham Gupta
- Inspired by platforms like RemoteOK, Wellfound, and Hired
