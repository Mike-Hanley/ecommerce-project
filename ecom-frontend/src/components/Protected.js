import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({ isSignedIn, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      console.log("access denied");
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  return children;
}

export default Protected;
