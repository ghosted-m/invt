'use client'
import { useState, useEffect } from 'react';

function Suggest({ whatFind = '', data = 'test' }) {
    const [value, setValue] = useState(data);
    const [suggestions, setSuggestions] = useState([]);
    const [returnValue, setReturnValue] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            const response = await fetch('/api/get-data');
            const data = await response.json();

            const returnValue = [...new Set(data.map((item) => item[whatFind]))];
            setReturnValue(returnValue);
        }
        fetchSuggestions();
    }, [whatFind, data]);


    useEffect(() => {
        setValue(data);
        setSuggestions(returnValue.filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase())));
    }, [data]);

    useEffect(() => {
        setInterval(() => {
            setSuggestions([]);
        }, 3000);
    }, []);

    return (
        <div className='absolute right-10 top-20 bg-white shadow-lg rounded-md p-2'>
            <ul>
                {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
        </div>
    );
}

export default Suggest;
