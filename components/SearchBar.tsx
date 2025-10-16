
import React from 'react';
import { SparklesIcon, LoaderIcon } from './Icons';

interface SearchBarProps {
    prompt: string;
    setPrompt: (value: string) => void;
    onSearch: () => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ prompt, setPrompt, onSearch, isLoading }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onSearch();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto" aria-label="Generate palettes">
            <div className="relative">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe a theme, e.g., 'tropical beach at sunset'"
                    className="w-full pl-4 pr-36 py-4 text-md bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-300"
                    disabled={isLoading}
                    aria-label="Theme description"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    aria-live="polite"
                >
                    {isLoading ? (
                        <>
                            <LoaderIcon className="w-5 h-5 animate-spin" />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-5 h-5" />
                            <span>Generate</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
