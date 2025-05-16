'use client'

import { useEffect, useState } from 'react'
import './theme-toggle.css'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('light', savedTheme === 'light');
        }
    }, []);

    const toggleTheme = () => {
        setAnimating(true);
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('light', newTheme === 'light');

        setTimeout(() => {
            setAnimating(false);
        }, 600);
    };

    return (
        <button
            onClick={toggleTheme}
            className={`theme-toggle-button ${animating ? 'animating' : ''}`}
        >
            <span className={`icon ${theme === 'dark' ? 'sun' : 'moon'}`}>
                {theme === 'dark' ? '☀️' : '🌙'}
            </span>
        </button>
    );
}
