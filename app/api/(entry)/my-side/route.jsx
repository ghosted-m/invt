import { db } from '../../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { event, full_name, address, additional_note, amount } = body;

        const docRef = await addDoc(collection(db, 'test', 'user_data', 'my_side'), {
            event,
            full_name,
            address,
            additional_note,
            amount,
            createdAt: new Date(),
        });

        return NextResponse.json({ id: docRef.id, message: 'User created successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding document', message: error.message }, { status: 500 });
    }
}
