'use client';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

function Suggest({ whatFind = '', data = '' }) {
    const [suggestions, setSuggestions] = useState([]);
    const [availableValues, setAvailableValues] = useState([]);
    const { user } = useAuth();

    // Fetch data from Firestore
    useEffect(() => {
        if (!user) {
            setAvailableValues([]);
            return;
        }

        const username = user.email.split('@')[0];
        // Fetching from 'my_side' to match previous API behavior
        const q = query(collection(db, username, 'user_data', 'my_side'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const values = querySnapshot.docs
                .map(doc => doc.data()[whatFind])
                .filter(item => item !== undefined && item !== null && item !== '');

            // Store unique values
            setAvailableValues([...new Set(values)]);
        }, (error) => {
            console.error('Error fetching suggestions:', error);
        });

        return () => unsubscribe();
    }, [user, whatFind]);

    // Filter suggestions based on input
    useEffect(() => {
        if (!data) {
            setSuggestions([]);
            return;
        }

        const filtered = availableValues.filter(suggestion =>
            suggestion.toLowerCase().includes(data.toLowerCase()) &&
            suggestion.toLowerCase() !== data.toLowerCase()
        );
        setSuggestions(filtered);
    }, [data, availableValues]);

    // Auto-clear suggestions after 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setSuggestions([]);
        }, 5000);
        return () => clearInterval(interval);
    }, [suggestions]); // Added dependency to reset timer on change, or just keep running? Original was []

    if (suggestions.length === 0) return null;

    return (
        <div className='absolute right-10 top-20 bg-white shadow-lg rounded-md p-2 z-50 border border-gray-200'>
            <ul className="list-none p-0 m-0">
                {suggestions.map((suggestion, index) => (
                    <li key={index} className="p-1 px-3 hover:bg-gray-100 cursor-pointer text-sm">
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Suggest;
