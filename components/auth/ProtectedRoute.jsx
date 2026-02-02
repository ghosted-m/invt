'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const publicRoutes = ['/login', '/signup'];

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isPublicRoute = publicRoutes.includes(pathname);

    useEffect(() => {
        if (!loading && !user && !isPublicRoute) {
            router.push('/login');
        }
    }, [user, loading, router, isPublicRoute]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (!user && !isPublicRoute) {
        return null;
    }

    return children;
}
