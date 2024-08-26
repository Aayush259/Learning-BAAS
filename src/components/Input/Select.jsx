import React, { useId } from 'react';

const Select = ({
    options,
    className = '',
    ref,
    ...rest
}) => {

    // New unique id for select field.
    const id = useId();

    return (
        <div className="max-w-[90vw] m-4 flex flex-col gap-1">

            <select
                id={id}
                className={`cursor-pointer max-w-full w-40 bg-transparent border border-[#cbd5e16E] rounded-md py-1 px-4 ${className}`}
                ref={ref}
                {...rest}
            >
                {
                    options?.map(option => (
                        <option
                            key={option}
                            value={option}
                            className="text-black"
                        >
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};

export default React.forwardRef(Select);
