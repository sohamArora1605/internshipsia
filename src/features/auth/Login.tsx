import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useUserStore } from '../../stores/useUser';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/Card';

export function Login() {
  const { user, login, loading, error, clearError } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
    } catch (error) {
      // Error is handled by the store
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prashikshan</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">NEP Internship Platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              {error && (
                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" loading={loading}>
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
          <Link to="/signup" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}