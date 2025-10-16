
import React from 'react';
import { Palette } from '../types';
import ColorCard from './ColorCard';

interface PaletteDisplayProps {
    palettes: Palette[];
    onColorCopy: (color: string) => void;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ palettes, onColorCopy }) => {
    return (
        <div className="grid gap-10">
            {palettes.map((palette, index) => (
                <div key={`${palette.paletteName}-${index}`} className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
                    <h3 className="text-2xl font-semibold text-white mb-4">{palette.paletteName}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {palette.colors.map((color, colorIndex) => (
                            <ColorCard
                                key={`${color}-${colorIndex}`}
                                color={color}
                                onCopy={onColorCopy}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PaletteDisplay;
