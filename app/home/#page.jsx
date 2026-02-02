'use client';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Ensure you are importing the correct db instance
import { useEffect } from 'react';
export default function Page() {

  const readArrayData = async () => {
    try {
      // Ensure you're passing the correct arguments to doc()
      const docRef = doc(db, 'test', 'my_side'); // Correct doc reference

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data(); // The document data
        console.log('Document data:', data);

        // Try common field names, but guard before using forEach
        const arrayField = data?.data ?? data?.array ?? data?.items;

        if (!arrayField) {
          console.warn('No array field found on document.');
          return;
        }

        if (!Array.isArray(arrayField)) {
          console.warn('Found array field but it is not an array:', arrayField);
          return;
        }

        console.log('Array data:', arrayField);

        arrayField.forEach(item => {
          const ts = item?.timestamp;
          const tsStr = ts && typeof ts.toDate === 'function' ? ts.toDate() : ts;
          console.log(`Timestamp: ${tsStr}`);
          console.log(`Numbers: ${item?.numbers}`);
        });
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error reading document:', error);
    }
  };

  useEffect(() => {
    readArrayData();
  }, []);

  return (
    <div>
      <h1>Firestore Array Data</h1>
      <p>Check the console for data from Firestore.</p>
    </div>
  );
}
