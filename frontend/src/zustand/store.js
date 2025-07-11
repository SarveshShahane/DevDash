import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  github: localStorage.getItem("github") || "",
  leetcode: localStorage.getItem("leetcode") || "",
  setGitHub: (username) =>
    set((state) => ({
      github: username,
    })),
  setLeetCode: (username) =>
    set((state) => ({
      leetcode: username,
    })),
  name: "user-store",
  setToLocal: () => {
    const { github, leetcode } = get();
    localStorage.setItem("github", github);
    localStorage.setItem("leetcode", leetcode);
  },
}));

export const todoStore = create((set, get) => ({
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo, idx) => id !== idx),
    })),
  markAsComplete: (id) =>
    set((state) => ({
      todos: state.todos.map((todo, idx) =>
        id === idx ? { ...todo, isCompleted: true } : todo
      ),
    })),
  saveToLocal: () => {
    const { todos } = get();
    console.log("Saving...", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
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
    console.log("Saving bookmarks...", bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  },
}));
