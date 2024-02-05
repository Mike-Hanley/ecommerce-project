import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useMainContext } from '../MainContext';


const Dashboard = () => {
  const navigate = useNavigate();
  const { isSignedIn, signin, signout, username } = useMainContext();

  console.log('Username from context:', username); // Add this line

  const handleLogout = () => {
    logout();
    signout();
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>
        This is a sample homepage for your app. You can replace this content
        with your own text, images, or other elements.
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

