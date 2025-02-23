// src/components/Chat/LoadingContext.js
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LoadingContext = React.createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useLoading = () => useContext(LoadingContext);

export default LoadingContext;
