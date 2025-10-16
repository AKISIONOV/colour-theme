
import React, { useState, useCallback } from 'react';
import { Palette } from './types';
import { generatePalettes } from './services/geminiService';
import SearchBar from './components/SearchBar';
import PaletteDisplay from './components/PaletteDisplay';
import Loader from './components/Loader';
import Toast from './components/Toast';
import { SparklesIcon } from './components/Icons';

const ExamplePrompts = ({ onSelect, isLoading }: { onSelect: (prompt: string) => void; isLoading: boolean }) => {
    const examples = [
        "Vaporwave sunset",
        "Serene forest morning",
        "Cyberpunk cityscape",
        "Cozy autumn cabin",
    ];

    return (
        <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-2xl mx-auto" aria-label="Example prompts">
            <p className="w-full text-center text-sm text-gray-400 mb-2">Try an example:</p>
            {examples.map((example) => (
                <button
                    key={example}
                    onClick={() => onSelect(example)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-700/50 text-gray-300 text-sm font-medium rounded-full hover:bg-gray-600/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {example}
                </button>
            ))}
        </div>
    );
};

const App: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [palettes, setPalettes] = useState<Palette[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const handleSearch = useCallback(async (searchPrompt: string) => {
        if (!searchPrompt.trim()) return;

        setIsLoading(true);
        setError(null);
        try {
            const generatedPalettes = await generatePalettes(searchPrompt);
            setPalettes(generatedPalettes);
        } catch (err) {
            setError('Failed to generate palettes. Please check your API key and try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFormSubmit = () => {
        handleSearch(prompt);
    };

    const handleExampleSelect = (examplePrompt: string) => {
        if (isLoading) return;
        setPrompt(examplePrompt);
        handleSearch(examplePrompt);
    };

    const showToast = (message: string) => {
        setToastMessage(message);
    };

    const WelcomeMessage: React.FC = () => (
        <div className="text-center p-8 mt-10">
            <div className="inline-block bg-gray-800 p-4 rounded-full mb-4">
                <SparklesIcon className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Unleash Your Creativity</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
                Describe a theme, a mood, or an idea, and let AI craft the perfect color palette for you.
            </p>
        </div>
    );
    
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <header className="w-full max-w-5xl text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 py-2">
                    AI Color Palette Generator
                </h1>
                <p className="text-gray-400 mt-2">Powered by Gemini</p>
            </header>

            <main className="w-full max-w-5xl flex-grow">
                <SearchBar 
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onSearch={handleFormSubmit}
                    isLoading={isLoading}
                />

                {error && <p className="text-center text-red-400 mt-6 bg-red-900/50 p-3 rounded-md">{error}</p>}
                
                <div className="mt-8">
                    {isLoading ? (
                        <Loader />
                    ) : palettes.length > 0 ? (
                        <PaletteDisplay palettes={palettes} onColorCopy={showToast} />
                    ) : (
                        !error && (
                            <>
                                <WelcomeMessage />
                                <ExamplePrompts onSelect={handleExampleSelect} isLoading={isLoading} />
                            </>
                        )
                    )}
                </div>
            </main>

            <footer className="w-full max-w-5xl text-center text-gray-500 text-sm py-6 mt-12">
                <p>&copy; {new Date().getFullYear()} AI Color Palette Generator. All rights reserved.</p>
            </footer>

            <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
        </div>
    );
};

export default App;
