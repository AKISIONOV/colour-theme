
import React, { useEffect, useState } from 'react';
import { CheckIcon } from './Icons';

interface ToastProps {
    message: string | null;
    onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                // Allow time for fade-out animation before calling onDismiss
                setTimeout(onDismiss, 300);
            }, 2500); // Message visible for 2.5 seconds
            
            return () => clearTimeout(timer);
        }
    }, [message, onDismiss]);

    return (
        <div
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        >
            <CheckIcon className="w-5 h-5" />
            <span className="font-medium">{message}</span>
        </div>
    );
};

export default Toast;
