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
    if (!user?.uid) {
      console.log("No user UID available.");
      return;
    }

    console.log('📦 Listening for food items for UID:', user.uid);

    const q = query(
      collection(db, 'foods'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('✅ Real-time food list from Firestore:', list);
      setFoods(list);
    });

    return () => unsubscribe();
  }, [user]);

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
