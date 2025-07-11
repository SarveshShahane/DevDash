# DevDash

A comprehensive developer dashboard that integrates with GitHub, LeetCode, and competitive programming platforms to track your development progress, manage tasks, and access essential developer tools.

## 🚀 Features

### 📊 **GitHub Integration**
- View profile statistics and repository insights
- Track commits, stars, and contribution activity
- Repository cards with real-time data

### 🧩 **LeetCode Tracking**
- Monitor coding progress and submission history
- View solved problems and difficulty breakdown
- Track daily/weekly coding activity

### 🏆 **Contest Dashboard**
- Upcoming contests from multiple platforms (Codeforces, AtCoder, etc.)
- Contest reminders and scheduling
- Performance tracking across platforms

### ✅ **Task Management**
- Personal todo list with local storage
- Task prioritization and organization
- Progress tracking for development goals

### 🛠️ **DevKit Tools**
- Curated collection of developer tools and resources
- Bookmark management for quick access
- AI tools and reference materials

### ⚙️ **Settings & Customization**
- Configure API integrations
- Personalize dashboard layout
- Theme and appearance options

## 🛠️ Tech Stack

### Frontend
- **React 18** with modern hooks and components
- **Vite** for fast development and optimized builds
- **TailwindCSS** for responsive styling
- **React Router** for navigation
- **Zustand** for state management
- **Framer Motion** for smooth animations

### Backend
- **Node.js** with Express.js
- **RESTful APIs** for external integrations
- **Environment variables** for secure configuration

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/DevDash.git
cd DevDash
```

2. **Install frontend dependencies:**
```bash
cd frontend
npm install
```

3. **Install backend dependencies:**
```bash
cd ../backend
npm install
```

4. **Configure environment variables:**
```bash
# Create .env file in backend directory
cp .env.example .env
# Add your API keys (GitHub, LeetCode, etc.)
```

5. **Start the development servers:**

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run dev
```

6. **Open your browser and navigate to `http://localhost:5173`**

## 🏗️ Project Structure

```
DevDash/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── devkit/         # DevKit specific components
│   │   │   ├── github/         # GitHub integration components
│   │   │   └── leetcode/       # LeetCode components
│   │   ├── pages/              # Main dashboard pages
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layouts/            # Layout components
│   │   ├── utils/              # Utility functions
│   │   ├── zustand/            # State management
│   │   └── animations/         # Animation configurations
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── routes/                 # API route handlers
│   │   ├── github.js          # GitHub API integration
│   │   ├── leetcode.js        # LeetCode API integration
│   │   └── contests.js        # Contest data fetching
│   ├── server.js              # Express server configuration
│   └── .env                   # Environment variables
└── README.md
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

### Backend
- `npm start` - Start the Express server
- `npm run dev` - Start server with nodemon for development

## 🔗 API Integrations

### Required API Keys
- **GitHub Personal Access Token** - For repository and profile data
- **LeetCode GraphQL API** - For coding statistics
- **Contest APIs** - For competitive programming contests

### Configuration
Add your API keys to the `.env` file in the backend directory:
```env
GITHUB_TOKEN=your_github_token_here
LEETCODE_API_KEY=your_leetcode_key_here
PORT=5000
```

## 📱 Dashboard Pages

- **`/git`** - GitHub profile and repositories
- **`/leetcode`** - LeetCode progress and submissions
- **`/contests`** - Upcoming competitive programming contests
- **`/tasks`** - Personal todo list and task management
- **`/devkit`** - Developer tools and resources
- **`/settings`** - Configuration and preferences

## 🎨 Customization

The dashboard uses TailwindCSS for styling and supports:
- Responsive design for all screen sizes
- Dark/light theme switching
- Custom color schemes
- Animated transitions with Framer Motion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd backend
# Configure environment variables on your hosting platform
# Deploy server.js as the entry point
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub API for repository data
- LeetCode GraphQL API for coding statistics
- Contest APIs for competitive programming data
- React and Vite teams for excellent developer experience

---

**Built with ❤️ for developers who love to track their progress and stay organized!**

**Happy Coding!** 🎉