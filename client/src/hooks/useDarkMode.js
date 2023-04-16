import { useState, useEffect } from 'react';

export const useDarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const onDarkMode = localStorage.getItem('onDarkMode');
        if (onDarkMode) {
            setIsDarkMode(true);
        }
    }, [])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('onDarkMode', !isDarkMode);
    }

    return [isDarkMode, toggleDarkMode];
}