import React from 'react';

export default function ErrorMessage({ message, className = '' }) {
    return (
        <p
            className={`text-red-500 text-sm text-right font-semibold ${className}`}
        >
            {message}*
        </p>
    );
};
