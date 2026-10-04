"use client"

import {useState, useCallback, createContext, useContext, ReactNode} from 'react';

interface Colors {
    vibrant: string;
    muted: string;
    light_vibrant: string;
    light_muted: string;
    dark_vibrant: string;
    dark_muted: string;
}

const defaultColors: Colors = {
    vibrant: '#000000',
    muted: '#000000',
    light_vibrant: '#000000',
    light_muted: '#000000',
    dark_vibrant: '#000000',
    dark_muted: '#000000',
};

interface ColorContextProps {
    colors: Colors;
    updateColors: (newColors: Partial<Colors>) => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export const ColorProvider = ({children}: { children: ReactNode }) => {
    const [colors, setColors] = useState<Colors>(defaultColors);

    const updateColors = useCallback((newColors: Partial<Colors>) => {
        setColors((prevColors) => ({
            ...prevColors,
            ...newColors,
        }));
    }, []);

    return (
        <ColorContext.Provider value={{colors, updateColors}}>
            {children}
        </ColorContext.Provider>
    );
};

export const useColor = () => {
    const context = useContext(ColorContext);

    if (context === undefined) {
        return {
            colors: defaultColors,
            updateColors: () => {},
        };
    }

    return context;
};