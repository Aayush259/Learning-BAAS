
export default function ErrorMessage({ message, className = '' }: { message: string, className?: string }) {
    return (
        <p
            className={`text-red-500 text-sm text-right font-semibold ${className}`}
        >
            {message}*
        </p>
    );
};
