import { useEffect } from 'react'
import { useUserStore } from '../zustand/store'
import { useGithubData } from './useGithubData'
import { useLeetCodeData } from './useLeetCodeData'

export const useDataManager = () => {
  const { github, leetcode } = useUserStore()
  
  const { data: githubData, loading: githubLoading } = useGithubData(github)
  const { data: leetCodeData, loading: leetcodeLoading } = useLeetCodeData(leetcode)
  
  useEffect(() => {
  }, [github, leetcode])
  
  return {
    github: {
      data: githubData,
      loading: githubLoading,
      hasUsername: !!github
    },
    leetcode: {
      data: leetCodeData,
      loading: leetcodeLoading,
      hasUsername: !!leetcode
    }
  }
}
