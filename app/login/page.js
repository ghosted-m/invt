'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { TextField, Button, Alert, Card, CardContent, Typography, Link } from '@mui/material';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[50vh] p-4">
            <Card sx={{ minWidth: 275, maxWidth: 400, width: '100%' }}>
                <CardContent>
                    <Typography variant="h5" component="div" className="text-center mb-4">
                        Login
                    </Typography>
                    {error && <Alert severity="error" className="mb-4">{error}</Alert>}
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                        >
                            Sign In
                        </Button>
                        <div className="text-center mt-2">
                            <Typography variant="body2">
                                Don't have an account? <Link href="/signup">Sign Up</Link>
                            </Typography>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
