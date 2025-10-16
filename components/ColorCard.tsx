
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface ColorCardProps {
    color: string;
    onCopy: (color: string) => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, onCopy }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(color.toUpperCase());
        onCopy(`Copied ${color.toUpperCase()}!`);
        setIsCopied(true);
    };
    
    // Reset the "copied" state after a delay
    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);
    
    // Determine text color based on background luminance
    const getTextColor = (hex: string): string => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? 'text-black' : 'text-white';
    };
    
    const textColor = getTextColor(color);

    return (
        <div 
            className="relative h-32 md:h-40 rounded-xl flex items-end p-3 group transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
            style={{ backgroundColor: color }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl"></div>
            <div className={`relative w-full flex justify-between items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${textColor}`}>
                <span className="font-mono font-medium text-sm drop-shadow-md">{color.toUpperCase()}</span>
                <button 
                    onClick={handleCopy}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
                    aria-label={`Copy color ${color}`}
                >
                    {isCopied ? (
                        <CheckIcon className="w-4 h-4" />
                    ) : (
                        <CopyIcon className="w-4 h-4" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default ColorCard;
