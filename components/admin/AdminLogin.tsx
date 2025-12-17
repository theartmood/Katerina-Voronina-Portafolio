'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function AdminLogin() {
    const { t } = useLanguage();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(username, password);
            if (!success) {
                setError(t.adminLoginError);
            }
        } catch (err) {
            setError(t.adminLoginError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                {/* Logo/Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <Lock className="w-10 h-10 text-purple-400" />
                    </div>
                    <h1 className="text-4xl font-serif text-platinum mb-2">{t.adminLoginTitle}</h1>
                    <p className="text-white/50">{t.adminLoginSubtitle}</p>
                </motion.div>

                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                {t.adminUsername}
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors disabled:opacity-50"
                                    placeholder="admin"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                {t.adminPassword}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors disabled:opacity-50"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {t.adminLoggingIn}
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    {t.adminLoginButton}
                                </>
                            )}
                        </button>
                    </form>

                    {/* Dev Credentials Hint */}
                    {process.env.NODE_ENV === 'development' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-6 pt-6 border-t border-gray-800"
                        >
                            <p className="text-xs text-gray-500 text-center">
                                Dev mode: Default credentials are <code className="text-purple-400">admin</code> / <code className="text-purple-400">admin123</code>
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}


