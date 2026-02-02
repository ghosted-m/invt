'use client'
import React, { useEffect } from 'react'
import MySide from '../MySide'
import GridToolbar from '../Status'
import OtherSide from '../OtherSide'
import ConditionalRadio from '../input/Radio'
import { useState } from 'react'

function Body() {
  const [selectedForm, setSelectedForm] = useState('my_side')

  const handleRadioChange = (event) => {
    localStorage.setItem('radioValue', event.target.value)
    setSelectedForm(localStorage.getItem('radioValue'))
  }
  useEffect(() => {
    setSelectedForm(localStorage.getItem('radioValue'))
  }, [])

  return (
    <div className='flex flex-col lg:flex-row w-full justify-between gap-8 p-16 mt-8'>
      <div style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} className='py-16 flex flex-col items-center justify-center w-full lg:w-1/2'>
        <ConditionalRadio value={selectedForm} onChange={handleRadioChange} />
        {selectedForm === 'my_side' ? <MySide /> : <OtherSide />}
      </div>

      <div style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} className='py-16 flex justify-center w-full lg:w-1/2'>
        <GridToolbar selectedSide={selectedForm} />
      </div>
    </div>
  )
}

export default Body
  