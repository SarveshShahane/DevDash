export const CacheManager = {
  clearLeetCodeCache: () => {
    localStorage.removeItem('leetcodeData');
    localStorage.removeItem('leetcodeUserProfile');
    localStorage.removeItem('leetcodeSubmissions');
    localStorage.removeItem('leetcode_cache_timestamp');
    localStorage.removeItem('leetcode_profile_cache_timestamp');
  },

  clearGitHubCache: () => {
    localStorage.removeItem('githubData');
    localStorage.removeItem('github_cache_timestamp');
  },

  clearContestsCache: () => {
    localStorage.removeItem('contestData');
    localStorage.removeItem('contests_cache_timestamp');
  },

  clearAllAPICache: () => {
    CacheManager.clearLeetCodeCache();
    CacheManager.clearGitHubCache();
    CacheManager.clearContestsCache();
  },

  getCacheInfo: () => {
    const info = {
      leetcode: {
        data: !!localStorage.getItem('leetcodeData'),
        timestamp: localStorage.getItem('leetcode_cache_timestamp'),
        profile: !!localStorage.getItem('leetcodeUserProfile'),
        submissions: !!localStorage.getItem('leetcodeSubmissions')
      },
      github: {
        data: !!localStorage.getItem('githubData'),
        timestamp: localStorage.getItem('github_cache_timestamp')
      },
      contests: {
        data: !!localStorage.getItem('contestData'),
        timestamp: localStorage.getItem('contests_cache_timestamp')
      }
    };
    return info;
  },

  isCacheExpired: (cacheKey, maxAge = 24 * 60 * 60 * 1000) => {
    const timestamp = localStorage.getItem(cacheKey);
    if (!timestamp) return true;
    
    const now = Date.now();
    const cacheTime = parseInt(timestamp);
    const isExpired = (now - cacheTime) > maxAge;
    
    return isExpired;
  }
};

if (typeof window !== 'undefined') {
  window.CacheManager = CacheManager;
}
