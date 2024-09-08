
export default function Button({
    type = 'button',
    children,
    className,
    bgColor = 'bg-sky-500',
    textColor = 'text-white',
    onClick,
    ...rest
}: {
    type?: 'button' | 'submit' | 'reset' | undefined;
    children: React.ReactNode;
    className?: string;
    bgColor?: string;
    textColor?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    rest?: any;
}) {

    return (
        <button
            className={`w-96 max-w-full m-4 rounded-xl p-1 text-xl font-semibold duration-500 hover:bg-white hover:text-black focus:outline-sky-400 focus:bg-white focus:text-black ${bgColor} ${textColor} ${className}`}
            type={type}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
};
