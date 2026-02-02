'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { TextField, Button, Alert, Card, CardContent, Typography, Link } from '@mui/material';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password should be at least 6 characters');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already in use');
            } else if (err.code === 'auth/configuration-not-found') {
                setError('Authentication not enabled. Please enable Email/Password in Firebase Console.');
            } else if (err.code === 'auth/operation-not-allowed') {
                setError('Email/Password login is not enabled in Firebase Console.');
            } else {
                setError('Failed to create an account. ' + err.message);
            }
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[50vh] p-4">
            <Card sx={{ minWidth: 275, maxWidth: 400, width: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="div" className="text-center mb-4">
                        Sign Up
                    </Typography>
                    {error && <Alert severity="error" className="mb-4">{error}</Alert>}
                    <form onSubmit={handleSignup} className="flex flex-col gap-4">
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                        >
                            Sign Up
                        </Button>
                        <div className="text-center mt-2">
                            <Typography variant="body2">
                                Already have an account? <Link href="/login">Login</Link>
                            </Typography>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
