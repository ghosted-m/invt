import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
        }

        const username = email.split('@')[0];
        const q = query(collection(db, username, 'user_data', 'my_side'));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching documents', message: error.message }, { status: 500 });
    }
}
