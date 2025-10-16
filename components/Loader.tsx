
import React from 'react';
import { LoaderIcon } from './Icons';

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <LoaderIcon className="w-12 h-12 text-purple-400 animate-spin" />
            <p className="mt-4 text-lg font-medium text-gray-300">Generating Palettes...</p>
            <p className="text-gray-500">The AI is mixing colors just for you.</p>
        </div>
    );
};

export default Loader;
