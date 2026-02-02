'use client'; // Mark as client component
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

function Nav() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="text-center py-4 bg-green-100 flex flex-row justify-between px-8 gap-2">
      <div className='flex flex-row justify-center space-x-4 items-center'>
        <a href="/" className="text-blue-500 hover:underline">Home</a>
        <a href="/status" className="text-blue-500 hover:underline">Status</a>
        <a href="/contact" className="text-blue-500 hover:underline">Contact</a>
        {user ? (
          <button onClick={handleLogout} className="text-red-500 hover:underline cursor-pointer">
            Logout
          </button>
        ) : (
          <a href="/login" className="text-blue-500 hover:underline">Login</a>
        )}
      </div>
      <div>
      {user && <div className="text-xs">Logged in as: {user.email}</div>}
      </div>
    </div>
  )
}

export default Nav