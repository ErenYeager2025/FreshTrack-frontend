// App.jsx

import { useState, useEffect } from 'react';
import './App.css';

import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import Login from './Login';
import Register from './Register';
import FoodList from './components/FoodList';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  // Listen for Firebase login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // set logged in user or null
    });
    return () => unsubscribe(); // clean up listener
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  // ✅ Logged in view
  if (user?.uid) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>FreshTrack</h1>
        <p>Welcome, {user.email}</p>
        <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</button>
        <FoodList user={user} /> {/* Pass user with UID */}
      </div>
    );
  }

  // 🚪 Not logged in → show Login or Register
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
