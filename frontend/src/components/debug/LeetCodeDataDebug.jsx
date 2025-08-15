import React, { useState } from 'react';
import { useLeetCodeStore } from '../../zustand/store';
import { CacheManager } from '../../utils/cacheManager';

const LeetCodeDataDebug = () => {
  const { leetCodeData, clearLCData } = useLeetCodeStore();
  const [cacheInfo, setCacheInfo] = useState(null);
  
  const handleClearCache = () => {
    CacheManager.clearLeetCodeCache();
    clearLCData();
  };

  const handleGetCacheInfo = () => {
    const info = CacheManager.getCacheInfo();
    setCacheInfo(info);
  };

  const handleForceRefresh = () => {
    handleClearCache();
    window.location.reload();
  };
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-white text-xs max-w-4xl">
      <h3 className="text-lg font-bold mb-3">LeetCode Data Debug Panel</h3>
      
      <div className="flex gap-2 mb-4">
        <button 
          onClick={handleClearCache}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
        >
          Clear Cache
        </button>
        <button 
          onClick={handleGetCacheInfo}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
        >
          Get Cache Info
        </button>
        <button 
          onClick={handleForceRefresh}
          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-white"
        >
          Force Refresh
        </button>
      </div>

      {cacheInfo && (
        <div className="mb-4 p-3 bg-gray-700 rounded">
          <h4 className="font-bold mb-2">Cache Information:</h4>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(cacheInfo, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold mb-2">Zustand Store Data:</h4>
          <pre className="whitespace-pre-wrap overflow-auto max-h-96 bg-gray-700 p-2 rounded">
            {JSON.stringify(leetCodeData, null, 2)}
          </pre>
        </div>
        
        <div>
          <h4 className="font-bold mb-2">LocalStorage Raw Data:</h4>
          <pre className="whitespace-pre-wrap overflow-auto max-h-96 bg-gray-700 p-2 rounded">
            {localStorage.getItem('leetcodeData') || 'No cached data'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeDataDebug;
