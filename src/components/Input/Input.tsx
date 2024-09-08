import React, { useId } from 'react';
import { ErrorMessage } from '../index';

interface InputProps {
    label?: string,
    name?: string,
    type?: string,
    labelclasses?: string,
    className?: string,
    error?: {
        message: string,
    },
    [x: string]: any,
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    label,
    name,
    type = 'text',
    labelclasses = '',
    className = '',
    error,
    ...rest
}, ref) => {

    // New unique id for input field.
    const id = useId();

    return (
        <div className="max-w-[90vw] mx-4 my-5 flex flex-col gap-2" >
            <div
                className="flex flex-row justify-between items-center"
            >
                {
                    label && (
                        <label
                            htmlFor={id}
                            className={`text-sm sm:text-lg ${labelclasses}`}
                        >
                            {label}
                        </label>
                    )
                }
                {
                    error && <ErrorMessage message={error.message} />
                }
            </div>
            <input
                type={type}
                id={id}
                name={name}
                ref={ref}
                {...rest}
                className={`max-w-full w-96 bg-transparent border border-[#cbd5e16E] rounded-md py-1 px-4 focus:border-white focus:outline-none ${className}`} />
        </div>
    );
});

export default Input;
