'use client'
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ConditionalRadio({ value, onChange }) {
    return (
        <div>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Event Type</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={onChange}
                >
                    <FormControlLabel value="my_side" control={<Radio />} label="My Event" />
                    <FormControlLabel value="other_side" control={<Radio />} label="Other Event" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}
