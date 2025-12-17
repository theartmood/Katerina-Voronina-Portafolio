'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciales por defecto (en producción esto debería estar en variables de entorno y usar hash)
const DEFAULT_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
const DEFAULT_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already authenticated (from sessionStorage)
        const authStatus = sessionStorage.getItem('admin_authenticated');
        setIsAuthenticated(authStatus === 'true');
        setLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Simple authentication check (en producción usar una API real con hash y JWT)
        if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            return true;
        }

        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_authenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

