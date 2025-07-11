import React from 'react'
import {useContestData} from '../hooks/useContestData'
import {useContestStore} from '../zustand/store'
import { motion } from 'framer-motion'
const Contests = () => {
  const {data,loading} = useContestData()
  const {contestData}=useContestStore()
  if(!data||loading)return
  const allContests=contestData.allContests.map((contest)=>(
    {
       id:contest.id,
      title:contest.title,
      host:contest.host,
      startTime:new Date(contest.startTime).toLocaleString('en-us',{
        month:'short',
        day:'numeric',
        year:'numeric'
      }),
      endTime:new Date(contest.endTime).toLocaleString('en-us',{
        month:'short',
        day:'numeric',
        year:'numeric'
      }),
      duration:contest.duration/60,
      url:contest.url 
    }
  ))
  
  console.log(data)
  return (
    <motion.div className='overflow-x-auto  border rounded p-4 contest'>
      <table className='min-w-full divide-y divide-gray-200 rounded'>
        <thead className='bg-[#1a1a1a] top-0 z-10'>
          <tr className='text-white  '>
            <td className='px-6 py-3 text-left font-medium uppercase tracking'>No.</td>
            <td className='px-6 py-3 text-left font-medium uppercase tracking'>Title</td>
            <td className='px-6 py-3 text-left font-medium uppercase tracking'>Host</td>
            <td className='px-6 py-3 text-left font-medium uppercase tracking'>Start Time</td>
            <td className='px-6 py-3 text-left font-medium uppercase tracking'>Duration(mins)</td>
          </tr>
        </thead>
        <tbody className='bg-[#111111]'>
          {allContests.length>0?(
            allContests.map((contest,i)=>(
              <tr key={contest.id} className='text-white'>
                <td className='px-6 py-3 whitespace-nowrap text-lg '>{i+1}</td>
                <td className='px-6 py-3 whitespace-nowrap text-lg '><a href={`${contest.url}`}>{contest.title}</a></td>
                <td className='px-6 py-3 whitespace-nowrap text-lg '>{contest.host}</td>
                <td className='px-6 py-3 whitespace-nowrap text-lg '>{contest.startTime}</td>
                <td className='px-6 py-3 whitespace-nowrap text-lg '>{contest.duration} minutes</td>
              </tr>
            ))
          ):(
            <p>Looks like there is no upcoming contest...👁️👁️</p>
          )}
        </tbody>
      </table>
    </motion.div>
  )
}

export default Contests