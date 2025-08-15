import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import LeetCode from './pages/LeetCode'
import Settings from './pages/Settings'
import GitHub from './pages/GitHub'
import TodoList from './pages/TodoList'
import DevKit from './pages/Devkit'
import Contests from './pages/Contests'
import Dashboard from './pages/Dashboard'
import GlobalBackgroundEffect from './animations/GlobalBackgroundEffect'
const App = () => {
  return (
    <div className="min-h-screen bg-[#0f1116] text-white relative overflow-x-hidden">
      <GlobalBackgroundEffect />
      <Navbar />

      <div className="relative z-10 ">
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/git' element={<GitHub/>}/>
          <Route path='/leetcode' element={<LeetCode/>}/>
          <Route path='/tasks' element={<TodoList/>}/>
          <Route path='/contests' element={<Contests/>}/>
          <Route path='/devkit' element={<DevKit/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App