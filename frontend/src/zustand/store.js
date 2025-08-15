import { create } from "zustand";

export const useUserStore = create((set, get) => {

  return {
    github: localStorage.getItem("github") || "",
    leetcode: localStorage.getItem("leetcode") || "",
    setGitHub: (username) => {
      localStorage.setItem("github", username); 
      return set((state) => ({
        github: username,
      }));
    },
    setLeetCode: (username) => {
      localStorage.setItem("leetcode", username); 
      return set((state) => ({
        leetcode: username,
      }));
    },
    name: "user-store",
    setToLocal: () => {
      const { github, leetcode } = get();
      localStorage.setItem("github", github);
      localStorage.setItem("leetcode", leetcode);
    },
  };
});

export const todoStore = create((set, get) => ({
  todos: (() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      return storedTodos.map((todo, index) => ({
        ...todo,
        id: todo.id || Date.now() + index, 
        priority: todo.priority || 'medium',
        category: todo.category || 'general',
        estimatedTime: todo.estimatedTime || 30,
        xpReward: todo.xpReward || (todo.priority === 'urgent' ? 100 : todo.priority === 'high' ? 50 : todo.priority === 'low' ? 10 : 25),
        createdAt: todo.createdAt || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  })(),
  playerStats: JSON.parse(localStorage.getItem("playerStats") || JSON.stringify({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalCompleted: 0,
    streak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
    achievements: [],
    totalXpEarned: 0
  })),
  
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, {
        ...todo,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        priority: todo.priority || 'medium',
        category: todo.category || 'general',
        estimatedTime: todo.estimatedTime || 30,
        xpReward: get().calculateXpReward(todo.priority || 'medium')
      }],
    })),
    
  removeTodo: (id) =>
    set((state) => ({
      todos: typeof id === 'number' && id < 1000000000000
        ? state.todos.filter((_, index) => index !== id)
        : state.todos.filter((todo) => todo.id !== id),
    })),
    
  markAsComplete: (id) =>
    set((state) => {
      let targetTodo;
      if (typeof id === 'number' && id < 1000000000000) {
        targetTodo = state.todos[id];
      } else {
        targetTodo = state.todos.find(t => t.id === id);
      }
      
      if (!targetTodo || targetTodo.isCompleted) return state;
      
      const newStats = get().updatePlayerStats(targetTodo.xpReward || 25);
      
      const updatedTodos = typeof id === 'number' && id < 1000000000000
        ? state.todos.map((t, index) =>
            index === id ? { ...t, isCompleted: true, completedAt: new Date().toISOString() } : t
          )
        : state.todos.map((t) =>
            t.id === id ? { ...t, isCompleted: true, completedAt: new Date().toISOString() } : t
          );
      
      return {
        todos: updatedTodos,
        playerStats: newStats
      };
    }),
    
  calculateXpReward: (priority) => {
    const rewards = { low: 10, medium: 25, high: 50, urgent: 100 };
    return rewards[priority] || 25;
  },
  
  updatePlayerStats: (xpGained) => {
    const stats = get().playerStats;
    const newXp = stats.xp + xpGained;
    const newTotalXp = stats.totalXpEarned + xpGained;
    let newLevel = stats.level;
    let xpToNextLevel = stats.xpToNextLevel;
    
    while (newXp >= xpToNextLevel && newLevel < 100) {
      newLevel++;
      xpToNextLevel = newLevel * 100;
    }
    
    const today = new Date().toDateString();
    const lastDate = stats.lastCompletedDate ? new Date(stats.lastCompletedDate).toDateString() : null;
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    let newStreak = stats.streak;
    if (lastDate !== today) {
      if (lastDate === yesterday) {
        newStreak++;
      } else if (lastDate !== null) {
        newStreak = 1;
      } else {
        newStreak = 1;
      }
    }
    
    const newLongestStreak = Math.max(stats.longestStreak, newStreak);
    
    const newAchievements = get().checkAchievements({
      ...stats,
      level: newLevel,
      totalCompleted: stats.totalCompleted + 1,
      streak: newStreak,
      longestStreak: newLongestStreak,
      totalXpEarned: newTotalXp
    });
    
    return {
      ...stats,
      level: newLevel,
      xp: newXp % (newLevel * 100),
      xpToNextLevel: newLevel * 100,
      totalCompleted: stats.totalCompleted + 1,
      streak: newStreak,
      longestStreak: newLongestStreak,
      lastCompletedDate: today,
      achievements: [...stats.achievements, ...newAchievements],
      totalXpEarned: newTotalXp
    };
  },
  
  checkAchievements: (stats) => {
    const achievements = [
      { id: 'first_complete', name: 'First Victory!', description: 'Complete your first quest', condition: stats.totalCompleted === 1, icon: '🎯' },
      { id: 'level_5', name: 'Apprentice', description: 'Reach level 5', condition: stats.level >= 5, icon: '⭐' },
      { id: 'level_10', name: 'Expert', description: 'Reach level 10', condition: stats.level >= 10, icon: '🏆' },
      { id: 'streak_7', name: 'Week Warrior', description: 'Complete quests for 7 days straight', condition: stats.streak >= 7, icon: '🔥' },
      { id: 'streak_30', name: 'Monthly Master', description: 'Complete quests for 30 days straight', condition: stats.streak >= 30, icon: '👑' },
      { id: 'complete_50', name: 'Half Century', description: 'Complete 50 quests', condition: stats.totalCompleted >= 50, icon: '💯' },
      { id: 'complete_100', name: 'Centurion', description: 'Complete 100 quests', condition: stats.totalCompleted >= 100, icon: '🚀' },
      { id: 'xp_1000', name: 'XP Collector', description: 'Earn 1000 total XP', condition: stats.totalXpEarned >= 1000, icon: '💎' },
    ];
    
    const existingIds = get().playerStats.achievements.map(a => a.id);
    return achievements.filter(achievement => 
      achievement.condition && !existingIds.includes(achievement.id)
    );
  },
  
  saveToLocal: () => {
    const { todos, playerStats } = get();
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("playerStats", JSON.stringify(playerStats));
  },
}));

export const useLeetCodeStore = create((set, get) => {
  let initialData = [];
  try {
    const cached = localStorage.getItem("leetcodeData");
    if (cached) {
      const { data } = JSON.parse(cached);
      initialData = data;
    }
  } catch (err) {
    console.error("Error loading cached LeetCode data:", err);
  }

  return {
    leetCodeData: initialData,
    setLCData: (data) =>
      set(() => ({
        leetCodeData: data,
      })),
    clearLCData: () =>
      set(() => ({
        leetCodeData: [],
      })),
  };
});

export const useGithubStore = create((set, get) => {
  let initialData = null;
  try {
    const cached = localStorage.getItem("githubData");
    if (cached) {
      const { data } = JSON.parse(cached);
      initialData = data;
    }
  } catch (err) {
    console.error("Error loading cached GitHub data:", err);
  }

  return {
    githubData: initialData,
    setGithubData: (data) =>
      set(() => ({
        githubData: data,
      })),
    clearGithubData: () =>
      set(() => ({
        githubData: null,
      })),
  };
});

export const useContestStore = create((set, get) => {
  let initialData = [];
  try {
    const cached = localStorage.getItem("contestData");
    if (cached) {
      const { data } = JSON.parse(cached);
      initialData = data;
    }
  } catch (err) {
    console.error("Error loading cached contest data:", err);
  }
  return {
    contestData: initialData,
    setCData: (data) =>
      set(() => ({
        contestData: data,
      })),
    clearCData: () =>
      set(() => ({
        contestData: [],
      })),
  };
});

export const useBookmarkStore = create((set, get) => ({
  bookmarks: JSON.parse(localStorage.getItem("bookmarks") || "[]"),
  addBookmark: (bookmark) =>
    set((state) => ({
      bookmarks: [...state.bookmarks, bookmark],
    })),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark, idx) => id !== idx),
    })),
  editBookmark: (id, updatedBookmark) =>
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark, idx) =>
        id === idx ? { ...bookmark, ...updatedBookmark } : bookmark
      ),
    })),
  saveToLocal: () => {
    const { bookmarks } = get();
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  },
}));

export const useVaultStore = create((set, get) => ({
  links: JSON.parse(localStorage.getItem('linkVault') || '[]'),
  
  addLink: (link) => {
    set((state) => ({
      links: [...state.links, link]
    }))
    get().saveLinkVault()
  },

  editLink: (updatedLink) => {
    set((state) => ({
      links: state.links.map(link =>
        link.id === updatedLink.id ? updatedLink : link
      )
    }))
    get().saveLinkVault()
  },

  removeLink: (id) => {
    set((state) => ({
      links: state.links.filter(link => link.id !== id)
    }))
    get().saveLinkVault()
  },

  saveLinkVault: () => {
    const state = get()
    localStorage.setItem('linkVault', JSON.stringify(state.links))
  },

  codeSnippets: JSON.parse(localStorage.getItem('codeSnippetVault') || '[]'),
  
  addCodeSnippet: (snippet) => {
    set((state) => ({
      codeSnippets: [...state.codeSnippets, snippet]
    }))
    get().saveCodeSnippetVault()
  },

  editCodeSnippet: (updatedSnippet) => {
    set((state) => ({
      codeSnippets: state.codeSnippets.map(snippet =>
        snippet.id === updatedSnippet.id ? updatedSnippet : snippet
      )
    }))
    get().saveCodeSnippetVault()
  },

  removeCodeSnippet: (id) => {
    set((state) => ({
      codeSnippets: state.codeSnippets.filter(snippet => snippet.id !== id)
    }))
    get().saveCodeSnippetVault()
  },

  saveCodeSnippetVault: () => {
    const state = get()
    localStorage.setItem('codeSnippetVault', JSON.stringify(state.codeSnippets))
  }
}));

export const useStore = useVaultStore;
