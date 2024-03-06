import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
    }, []);
    navigate('OnboardingSeller/Login')
    return (
        <>
            {/* Your component content */}
        </>
    );
};

export default LogOut;
