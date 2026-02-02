'use client'
import { Box, TextField } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import Suggest from '@/lib/Suggestion'
function MySide() {
  const [formData, setFormData] = useState({
    event: '',
    full_name: '',
    address: '',
    additional_note: '',
    amount: '',
  })

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const savedEvent = localStorage.getItem('mySideEventName');
      if (savedEvent) {
        setFormData(prev => ({ ...prev, event: savedEvent }));
      }
    }, []);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'event') {
      localStorage.setItem('mySideEventName', value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      event: formData.event,
      full_name: formData.full_name,
      address: formData.address,
      additional_note: formData.additional_note,
      amount: formData.amount,
    }
    async function submitData() {
      const response = await fetch('/api/my-side', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      console.log(result)
    }
    submitData()
  }

  return (
    <div className='flex flex-col justify-center items-center p-4 w-full relative'>
      <TextField label="Event" name='event' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} value={formData.event} />
      <TextField label="Full Name" name='full_name' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} />
      <Suggest whatFind='full_name' data={formData.full_name} />
      <TextField label="Address" name='address' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} />
      <Suggest whatFind='address' data={formData.address} />
      <TextField label="Additional note" name='additional_note' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} />
      <TextField label="Amount" name='amount' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} />
      <button className='bg-blue-500 text-white p-2 rounded w-1/2' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default MySide
