import React, { useEffect, useState } from 'react'
import { useUserStore } from '../zustand/store'
import { useGithubData } from '../hooks/useGithubData'
import GitRepos from '../layouts/GitRepos'
import RepoCard from '../components/github/RepoCard'
import GitProfile from '../components/github/GitProfile'
import { motion } from 'framer-motion'
const GitHub = () => {
  const { github } = useUserStore()
  const { data, loading } = useGithubData(github)
  if (loading || !data) return
  console.log(data)
  const languages = data.repos.reduce((acc, repo) => {
    if (repo.languages) {
      Object.entries(repo.languages).forEach(([lang, bytes]) => {
        acc[lang] = (acc[lang] || 0) + bytes
      })
    }
    return acc
  }, {})

  return (
    <div className='flex  git p-4 space-y-3 mt-5 md:justify-center    '>
      <div className="w-100 mt-15 ">
        <GitProfile profile={data.profile} loading={loading} stars={data.stars} forks={data.forks} langData={languages} />
      </div>
      <GitRepos repos={data.repos} />

    </div>
  )
}

export default GitHub