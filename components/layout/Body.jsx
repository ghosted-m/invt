'use client'
import { Container } from '@mui/material'
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
    <div className='flex flex-row w-full justify-between gap-8 mt-8'>
      <div className='flex flex-col w-1/2'>
        <div className='flex justify-center mb-4'>
          <ConditionalRadio value={selectedForm} onChange={handleRadioChange} />
        </div>
        {selectedForm === 'my_side' ? <MySide /> : <OtherSide />}
      </div>
      <GridToolbar selectedSide={selectedForm} />
    </div>
  )
}

export default Body
