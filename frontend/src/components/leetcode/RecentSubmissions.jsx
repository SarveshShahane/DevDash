import React from 'react'
import { motion } from 'framer-motion'
import { useLeetCodeStore } from '../../zustand/store'
import TypingText from '../TypingText'
const RecentSubmissions = () => {
    const { leetCodeData } = useLeetCodeStore()

    const { submissionList } = leetCodeData
    const date = submissionList.map((submission) => (
        new Date(submission.timestamp * 1000).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' })
    ))
    return (
        <div className='overflow-x-auto border rounded p-4 '>
            <table className=' min-w-full divide-y divide-gray-200 rounded'>
                <thead className='bg-[#1a1a1a] top-0 z-10'>
                    <tr className='text-white '>
                        <td className='px-6 py-3 text-left font-medium uppercase tracking-wider'>No.</td>
                        <td className='px-6 py-3 text-left font-medium uppercase tracking-wider'>Title</td>
                        <td className='px-6 py-3 text-left font-medium uppercase tracking-wider'>Status</td>
                        <td className='px-6 py-3 text-left font-medium uppercase tracking-wider'>Date</td>
                        <td className='px-6 py-3 text-left font-medium uppercase tracking-wider'>Language</td>
                    </tr>
                </thead>
                <tbody className='bg-[#111111]'>

                    {submissionList.length > 0 ? (
                        submissionList.map((submission, i) => (
                            <tr key={submission.id} className='text-white'>
                                <td className='px-6 py-3 whitespace-nowrap text-lg '>{i+1}</td>
                                <td className='px-6 py-3 whitespace-nowrap text-lg '><a href={`https://leetcode.com/problems/${submission.titleSlug}/`}>{submission.title}</a></td>
                                <td className='px-6 py-3 whitespace-nowrap text-lg '
                                    style={{
                                        color: submission.statusDisplay === 'Accepted' ? "green" : 'red'
                                    }}>{submission.statusDisplay}</td>
                                <td className='px-6 py-3 whitespace-nowrap text-lg '>{date[i]}</td>
                                <td className='px-6 py-3 whitespace-nowrap text-lg '>{submission.lang}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <p className='px-6 py-3 whitespace-nowrap'><TypingText text={'No submissions to display⛓️‍💥...\n Come back after solving one...'} /></p>
                        </tr>
                    )}

                </tbody>

            </table>
        </div>
    )
}

export default RecentSubmissions