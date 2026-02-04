'use client'
import { Box, TextField } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
function OtherSide() {
    const [formData, setFormData] = useState({
        event: '',
        full_name: '',
        address: '',
        additional_note: '',
        amount: '',
    })

    if (typeof window !== 'undefined') {
        useEffect(() => {
            const savedEvent = localStorage.getItem('otherSideEventName');
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
            localStorage.setItem('otherSideEventName', value);
        }
    }
    const { user } = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!user) {
            alert("You must be logged in to submit data.");
            return;
        }

        const data = {
            event: formData.event,
            full_name: formData.full_name,
            address: formData.address,
            additional_note: formData.additional_note,
            amount: formData.amount,
            user_email: user.email,
        }
        async function submitData() {
            try {
                const response = await fetch('/api/other-side', {
                    method: 'POST',
                    headers: {
                        'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })

                if (response.ok) {
                    setFormData(prev => ({
                        ...prev,
                        full_name: '',
                        address: '',
                        additional_note: '',
                        amount: '',
                    }));
                }

                const result = await response.json()
                console.log(result)
            } catch (error) {
                console.error("Error submitting data:", error);
                alert("Failed to submit data.");
            }
        }
        submitData()
    }

    return (
        <div className='flex flex-col justify-center items-center p-4 w-full'>
            <TextField label="Event" name='event' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} value={formData.event} />
            <TextField label="Full Name" name='full_name' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} />
            <TextField label="Address" name='address' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} />
            <TextField label="Additional note" name='additional_note' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} />
            <TextField label="Amount" name='amount' variant="standard" sx={{ marginBottom: '1rem', width: '70%' }} onChange={handleChange} />
            <button className='bg-blue-500 text-white p-2 rounded w-1/2' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default OtherSide
