// 1. Import React features
import { useState } from 'react'; // useState is a special function for tracking changes in your UI
import './App.css'; // Importing your CSS file for styling

import Login from './Login'; // Importing your Login component
import Register from './Register'; // Importing your Register component


function App() {
  // 2. useState to remember if user is on Login or Register screen
  const [isLogin, setIsLogin] = useState(true);
  // This means: isLogin = true by default, which means it shows Login form first


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>FreshTrack</h1>
      {/*3. Show either Login or Register form depending on isLogin value */}
      {isLogin ? <Login /> : <Register />}
      {/* 4. Button to switch between login and register */}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsLogin(!isLogin)}// Click to switch forms
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

export default App;// Export the component so React can use it
