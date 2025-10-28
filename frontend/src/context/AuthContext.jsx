import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase.js';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Get Firebase token
                    const idToken = await user.getIdToken();
                    setToken(idToken);

                    // Send token to backend to create/update user in MongoDB
                    const response = await axios.post(
                        `${API_URL}/api/auth/login`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${idToken}`,
                            },
                        }
                    );

                    setCurrentUser(response.data.user);
                } catch (error) {
                    console.error('Error logging in:', error);
                    toast.error('Failed to authenticate');
                }
            } else {
                setCurrentUser(null);
                setToken(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [API_URL]);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success('Login successful!');
        } catch (error) {
            console.error('Error signing in with Google:', error);
            toast.error('Failed to sign in with Google');
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
            setToken(null);
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Failed to sign out');
            throw error;
        }
    };

    const value = {
        currentUser,
        token,
        loading,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
