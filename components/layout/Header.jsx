import React from 'react'
function Nav() {
  return (
    <div className="text-center py-4 bg-green-100 *:text-white">
      <div className='flex flex-row justify-center space-x-4'>
        <a href="/home" className="text-blue-500 hover:underline">Home</a>
        <a href="/status" className="text-blue-500 hover:underline">Status</a>
        <a href="/contact" className="text-blue-500 hover:underline">Contact</a>
      </div>
    </div>
  )
}

export default Nav