export const sampleLinks = [
  {
    id: 1,
    title: "React Documentation",
    url: "https://react.dev",
    category: "Documentation",
    description: "Official React documentation with hooks, components, and best practices",
    priority: "high",
    tags: ["react", "documentation", "frontend"],
    notes: "Essential reference for React development. Check the hooks section for latest updates.",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "VS Code Extensions",
    url: "https://marketplace.visualstudio.com/vscode",
    category: "Tools",
    description: "Visual Studio Code marketplace for extensions",
    priority: "medium",
    tags: ["vscode", "extensions", "productivity"],
    notes: "Great place to find productivity extensions for development",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z"
  },
  {
    id: 3,
    title: "Tailwind CSS Cheat Sheet",
    url: "https://tailwindcss.com/docs",
    category: "Learning",
    description: "Complete guide to Tailwind CSS utility classes",
    priority: "medium",
    tags: ["tailwind", "css", "cheatsheet"],
    notes: "Bookmark for quick reference to utility classes",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z"
  }
]

export const sampleCodeSnippets = [
  {
    id: 1,
    title: "Custom React Hook for Local Storage",
    code: `import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading localStorage:', error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error setting localStorage:', error)
    }
  }

  return [storedValue, setValue]
}`,
    language: "javascript",
    category: "Hook",
    description: "A custom React hook for managing localStorage with error handling",
    difficulty: "intermediate",
    tags: ["react", "hooks", "localStorage"],
    usage: "Import and use like useState: const [value, setValue] = useLocalStorage('key', defaultValue)",
    createdAt: "2024-01-18T11:45:00Z",
    updatedAt: "2024-01-18T11:45:00Z"
  },
  {
    id: 2,
    title: "Async Error Handler Wrapper",
    code: `const asyncErrorHandler = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error('Async operation failed:', error)
      throw error
    }
  }
}

const fetchUserData = asyncErrorHandler(async (userId) => {
  const response = await fetch(\`/api/users/\${userId}\`)
  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }
  return response.json()
})`,
    language: "javascript",
    category: "Utility",
    description: "Higher-order function for handling async operation errors",
    difficulty: "advanced",
    tags: ["javascript", "async", "error-handling"],
    usage: "Wrap async functions to add consistent error handling",
    createdAt: "2024-01-19T16:30:00Z",
    updatedAt: "2024-01-19T16:30:00Z"
  },
  {
    id: 3,
    title: "CSS Grid Auto-Fit Layout",
    code: `.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

/* For even more responsive design */
.responsive-grid-advanced {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: clamp(0.5rem, 2vw, 2rem);
  padding: clamp(0.5rem, 2vw, 2rem);
}`,
    language: "css",
    category: "Style",
    description: "Responsive CSS Grid layout that auto-fits columns",
    difficulty: "beginner",
    tags: ["css", "grid", "responsive"],
    usage: "Apply to container elements for responsive card layouts",
    createdAt: "2024-01-20T13:00:00Z",
    updatedAt: "2024-01-20T13:00:00Z"
  }
]

export const initializeDemoData = (vaultStore) => {
  const { links, codeSnippets, addLink, addCodeSnippet } = vaultStore.getState()
  
  if (links.length === 0) {
    sampleLinks.forEach(link => addLink(link))
  }
  
  if (codeSnippets.length === 0) {
    sampleCodeSnippets.forEach(snippet => addCodeSnippet(snippet))
  }
}
