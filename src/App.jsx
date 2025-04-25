// App.jsx

import { useState, useEffect } from 'react';
import './App.css';

import { auth } from './firebase'; // Firebase Auth
import { onAuthStateChanged, signOut } from 'firebase/auth';

import Login from './Login';
import Register from './Register';
import FoodList from './components/FoodList';

function App() {
  const [isLogin, setIsLogin] = useState(true); // toggles Login/Register view
  const [user, setUser] = useState(null); // store current user

  // Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // set the user if logged in, or null if logged out
    });
    return () => unsubscribe(); // stop listening on unmount
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>FreshTrack</h1>
        <p>Welcome, {user.email}</p>
        <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</button>
        <FoodList user={user} />
      </div>
    );
  }

  // If no user logged in, show login/register
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>FreshTrack</h1>
      {isLogin ? <Login /> : <Register />}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default App;
