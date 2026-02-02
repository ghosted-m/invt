'use client'
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Page = () => {
    const [amts, setAmts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Querying the nested collection for documents where `name` matches `nameToSearch`
                // Modular Syntax
                const q = query(
                    collection(db, 'test', 'user_data', 'my_side'),
                    where('full_name', '==', 'test1')
                );

                const snapshot = await getDocs(q);

                // Extract `amt` from each document in the query result
                const amtValues = snapshot.docs.map(doc => doc.data().amount);
                setAmts(amtValues);
                console.log(snapshot.docs);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []); // Fetch when the name changes

    return (
        <div>
            <h3>Amounts for test1</h3>
            <ul>
                {amts.map((amt, index) => (
                    <li key={index}>Amount: {amt}</li>
                ))}
            </ul>
        </div>
    );
};

export default Page;
