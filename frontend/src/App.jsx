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
const App = () => {
  return (
    <div>
<Navbar/>

<Routes>
  <Route path='/dash' element={<div>Dashboard</div>}/>
  <Route path='/git' element={<GitHub/>}/>
  <Route path='/leetcode' element={<LeetCode/>}/>
  <Route path='/tasks' element={<TodoList/>}/>
  <Route path='/contests' element={<Contests/>}/>
  <Route path='/devkit' element={<DevKit/>}/>
  <Route path='/settings' element={<Settings/>}/>
</Routes>
    </div>
  )
}

export default App