import { createContext, useContext, useState } from 'react';
import { UrlLandingInterface } from '../interfaces/contextInterfaces';

const UrlLandingContext = createContext<UrlLandingInterface>({
    URL: null,
    setLandingUrl: () => { },
});

const UrlLandingContextProvider = ({
    children
}: {
    children: React.ReactNode,
}) => {

    const [URL, setLandingUrl] = useState<string | null>(null);

    return (
        <UrlLandingContext.Provider value={{ URL, setLandingUrl }}>
            {children}
        </UrlLandingContext.Provider>
    );
};

const useUrlLandingContext = () => useContext(UrlLandingContext);

export { useUrlLandingContext, UrlLandingContextProvider };
