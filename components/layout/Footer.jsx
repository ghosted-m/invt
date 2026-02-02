import React from 'react'
function Footer() {
  return (
    <div className="flex flex-col items-center bg-gray-200 py-4 mt-8">
      <div className='flex flex-row justify-center items-center gap-8'>
        <h3 className="mb-2">Amrendra kumar</h3>
        <h3>
          &copy; {new Date().getFullYear()} Invitetion. All rights reserved.
        </h3>
      </div>
    </div>
  )
}

export default Footer
