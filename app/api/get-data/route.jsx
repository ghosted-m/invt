import { db } from '../../../lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const q = query(collection(db, 'test', 'user_data', 'my_side'));
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
