import React, { useId } from 'react';

const Input = ({
    label,
    name,
    type = 'text',
    className = '',
    ...rest
}, ref) => {

    // New unique id for input field.
    const id = useId();

    return (
        <div className="max-w-[90vw] mx-4 my-5 flex flex-col gap-2" >
            {
                label && (
                    <label
                        htmlFor={id}
                        className="text-sm sm:text-lg"
                    >
                        {label}
                    </label>
                )
            }
            <input
                type={type}
                id={id}
                name={name}
                ref={ref}
                {...rest}
                className={`max-w-full w-96 bg-transparent border border-[#cbd5e16E] rounded-md py-1 px-4 focus:border-white focus:outline-none ${className}`} />
        </div>
    );
};

export default React.forwardRef(Input);
