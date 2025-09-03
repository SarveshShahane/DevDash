# DevDash - Enhanced Professional Developer Dashboard

A comprehensive developer dashboard that integrates with GitHub, LeetCode, and competitive programming platforms to track your development progress with advanced analytics, professional charts, and comprehensive data visualization.

## 🚀 Enhanced Features

### 📊 **GitHub Integration - Now with Advanced Analytics**
- **Professional Dashboard Layout**: Redesigned with modern UI components and responsive design
- **Advanced Repository Statistics**: Comprehensive analysis of all repositories with detailed metrics
- **Language Distribution Charts**: Visual representation of programming language usage across projects
- **Repository Activity Tracking**: Commit activity visualization and contribution patterns
- **Trending Repository Analysis**: Identify your most popular and active repositories
- **Real-time Data Visualization**: Live charts and graphs for better insights
- **Enhanced Profile Overview**: Detailed statistics cards with animated counters

### 🧩 **LeetCode Tracking - Professional Analytics Platform**
- **Comprehensive Problem Analysis**: Advanced difficulty breakdown with circular progress indicators
- **Submission Calendar Heatmap**: GitHub-style contribution calendar for coding activity
- **Contest Performance Dashboard**: Rating progression and contest history visualization
- **Topic-wise Problem Solving**: Detailed analysis of problem categories and skill development
- **Daily Challenge Integration**: Featured daily coding challenges with direct links
- **Achievement Badge System**: Visual representation of earned badges and accomplishments
- **Progress Tracking**: Detailed statistics on problem-solving journey and improvements

### 🏆 **Contest Dashboard - Enhanced Management Portal**
- **Modern Card-based Layout**: Beautiful contest cards with platform-specific styling
- **Advanced Filtering System**: Filter contests by platform (LeetCode, AtCoder, CodeChef)
- **Contest Timeline Visualization**: Visual timeline of upcoming contests
- **Real-time Countdown Timers**: Live countdown to contest start times
- **Platform Statistics**: Overview of contest distribution and metrics
- **Responsive Design**: Perfect viewing experience across all devices

### 📈 **Data Visualization & Charts**
- **Custom Chart Components**: Built-in chart library for optimal performance
- **Interactive Animations**: Smooth transitions and hover effects
- **Progress Indicators**: Circular and linear progress bars with animations
- **Heatmap Visualizations**: Activity tracking with color-coded intensity
- **Responsive Design**: Charts adapt perfectly to different screen sizes

## 🛠️ Tech Stack

### Frontend
- **React 19** with modern hooks and advanced component patterns
- **Vite** for lightning-fast development and optimized builds
- **TailwindCSS** for responsive styling and modern design system
- **React Router** for seamless navigation
- **Zustand** for efficient state management
- **Framer Motion** for professional animations and transitions
- **Lucide React** for consistent icon system
- **Axios** for API communications

### Backend
- **Node.js** with Express.js for robust API endpoints
- **Enhanced RESTful APIs** with comprehensive data endpoints
- **Environment variables** for secure configuration
- **Error handling** and data validation
- **CORS** enabled for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- GitHub Personal Access Token
- Clist.by API credentials

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/SarveshShahane/DevDash.git
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

6. **Open your browser and navigate to `http://localhost:5174`**

## 🎯 API Endpoints

### GitHub API Endpoints
- `GET /api/github/:username` - Complete user profile with repositories and language analysis
- `GET /api/github/:username/activity` - Repository commit activity and contribution patterns  
- `GET /api/github/:username/stats` - Comprehensive repository statistics and analytics
- `GET /api/github/:username/trending` - Top performing repositories by stars and activity

### LeetCode API Endpoints
- `GET /api/leetcode/:username` - Complete user profile with problem-solving statistics
- `GET /api/leetcode/:username/calendar` - Submission calendar and activity streak data
- `GET /api/leetcode/:username/contests` - Contest history and rating progression
- `GET /api/leetcode/:username/topics` - Problem-solving statistics by topic categories
- `GET /api/leetcode/daily/challenge` - Current daily coding challenge information

### Contest API Endpoints
- `GET /api/contests/upcoming` - Multi-platform contest aggregation (LeetCode, AtCoder, CodeChef)

### Dashboard API Endpoints
- `GET /api/dashboard/summary/:github/:leetcode` - Combined dashboard summary for both platforms
- `GET /api/dashboard/summary` - Empty dashboard summary template
- `GET /api/dashboard/github/:username` - Quick GitHub stats for dashboard
- `GET /api/dashboard/leetcode/:username` - Quick LeetCode stats for dashboard

## 🏗️ Enhanced Project Structure

```
DevDash/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── charts/         # Custom chart components
│   │   │   │   ├── SimpleCharts.jsx        # GitHub analytics charts
│   │   │   │   └── SimpleLeetCodeCharts.jsx # LeetCode visualization
│   │   │   ├── debug/          # Development and debugging components
│   │   │   │   └── LeetCodeDataDebug.jsx   # LeetCode data debugging
│   │   │   ├── devkit/         # DevKit specific components
│   │   │   ├── github/         # Enhanced GitHub components
│   │   │   ├── leetcode/       # Advanced LeetCode components
│   │   │   ├── ui/             # Reusable UI table components
│   │   │   │   ├── Table.jsx   # Base table component
│   │   │   │   ├── ActivityTable.jsx     # Activity display table
│   │   │   │   ├── LeaderboardTable.jsx  # Leaderboard display
│   │   │   │   └── StatsTable.jsx        # Statistics table
│   │   │   ├── AchievementBoard.jsx      # Achievement display component
│   │   │   ├── DashboardOverview.jsx     # Main dashboard overview
│   │   │   ├── FloatingButtons.jsx       # Floating action buttons
│   │   │   ├── Leaderboard.jsx          # Leaderboard component
│   │   │   ├── NetworkNotification.jsx   # Network status notifications
│   │   │   ├── ParticleEffect.jsx       # Particle animation effects
│   │   │   ├── QuestLog.jsx             # Quest/task logging component
│   │   │   └── Navbar.jsx               # Main navigation component
│   │   ├── pages/              # Enhanced dashboard pages
│   │   │   ├── Dashboard.jsx   # Main dashboard with overview
│   │   │   ├── GitHub.jsx      # Professional GitHub dashboard
│   │   │   ├── LeetCode.jsx    # Advanced LeetCode analytics
│   │   │   ├── Contests.jsx    # Modern contest management
│   │   │   ├── TodoList.jsx    # Task management page
│   │   │   ├── Devkit.jsx      # Developer tools page
│   │   │   └── Settings.jsx    # Configuration and preferences
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useGithubData.js        # GitHub data management
│   │   │   ├── useLeetCodeData.js      # LeetCode data management
│   │   │   ├── useContestData.js       # Contest data management
│   │   │   ├── useLocalStorage.js      # Local storage management
│   │   │   └── useDataManager.js       # Centralized data management
│   │   ├── layouts/            # Layout components
│   │   │   ├── GitRepos.jsx    # GitHub repository layout
│   │   │   └── TodoRender.jsx  # Todo list rendering layout
│   │   ├── utils/              # Utility functions
│   │   │   ├── cacheManager.js # Data caching management
│   │   │   ├── data.js         # Data processing utilities
│   │   │   ├── demoData.js     # Demo/sample data
│   │   │   └── segmentColors.js # Color scheme utilities
│   │   ├── zustand/            # State management
│   │   │   └── store.js        # Zustand store configuration
│   │   └── animations/         # Animation configurations
│   │       └── animations.js   # Framer Motion animations
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── routes/                 # Enhanced API route handlers
│   │   ├── github.js          # GitHub API with comprehensive endpoints
│   │   ├── leetcode.js        # LeetCode API with advanced features
│   │   ├── contests.js        # Contest data with multi-platform support
│   │   └── dashboard.js       # Dashboard summary and quick stats
│   ├── server.js              # Express server configuration
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables                 # Enhanced API route handlers
│   │   ├── github.js          # GitHub API with new endpoints
│   │   ├── leetcode.js        # LeetCode API with advanced features
│   │   └── contests.js        # Contest data with multi-platform support
│   ├── server.js              # Express server configuration
│   └── .env                   # Environment variables
└── README.md
```

## 🎨 Enhanced UI/UX Features

### Design System
- **Consistent Color Palette**: Professional dark theme with accent colors
- **Typography Hierarchy**: Clear information architecture
- **Spacing System**: Consistent margins and padding throughout
- **Component Library**: Reusable UI components with variants

### Animations & Interactions
- **Page Transitions**: Smooth navigation between sections
- **Loading States**: Professional skeleton screens and spinners
- **Hover Effects**: Interactive feedback on all clickable elements
- **Progress Animations**: Smooth progress bar and chart animations

### Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Flexible Layouts**: Grid and flexbox for perfect responsiveness
- **Touch-Friendly**: Optimized for mobile interactions

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production with optimizations
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

### Backend
- `npm start` - Start the Express server
- `npm run dev` - Start server with nodemon for development

## 🔗 Enhanced API Integrations

### Required API Keys
- **GitHub Personal Access Token** - For repository and profile data
- **Clist API** - For competitive programming contests data
- **Clist Username** - Your Clist.by profile username

### Configuration
Add your API keys to the `.env` file in the backend directory:
```env
GITHUB_TOKEN=your_github_personal_access_token
CLIST_USERNAME=your_clist_username  
CLIST_API_KEY=your_clist_api_key
PORT=3000
```

## 📱 Enhanced Dashboard Pages

- **`/git`** - Professional GitHub dashboard with advanced analytics
- **`/leetcode`** - Comprehensive LeetCode progress tracking
- **`/contests`** - Modern contest management portal
- **`/tasks`** - Personal todo list and task management
- **`/devkit`** - Developer tools and resources
- **`/settings`** - Configuration and preferences

## � Key Improvements

### Performance Enhancements
- **Custom Chart Library**: Optimized visualization without heavy dependencies
- **Efficient State Management**: Optimized data flow and caching
- **Lazy Loading**: Components load only when needed
- **Optimized Bundle Size**: Reduced JavaScript bundle for faster loading

### Data Visualization
- **Interactive Charts**: Hover effects and tooltips for better UX
- **Real-time Updates**: Live data refresh without page reload
- **Error Handling**: Graceful fallbacks for API failures
- **Loading States**: Professional loading indicators

### Professional Features
- **Advanced Filtering**: Sort and filter data across all sections
- **Export Capabilities**: Data export functionality (planned)
- **Dark Theme**: Optimized for developer productivity
- **Accessibility**: WCAG compliant design patterns

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- GitHub API for comprehensive repository data
- LeetCode GraphQL API for detailed coding statistics
- Contest APIs for multi-platform competitive programming data
- React and Vite teams for excellent developer experience
- Framer Motion for smooth animations
- TailwindCSS for rapid UI development

---

