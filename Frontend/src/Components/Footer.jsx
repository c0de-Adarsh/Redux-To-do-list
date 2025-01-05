import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <footer className='bg-gray-800 py-4 text-center'>

      <div className='container mx-auto'>
        <p className='text-gray-400 text-sm'>
          &copy; 2025 ViTo All rights Reserved
        </p>
        <p className='text-sm text-gray-500'>
          Designed and developed with <span>By <Link to={'https://adarsh-web-portfolio.netlify.app'} className='underline font-bold text-white'>Adarsh</Link></span>
        </p>
      </div>
    </footer>
    </>
  )
}

export default Footer