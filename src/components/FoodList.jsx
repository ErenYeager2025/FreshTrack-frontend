import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

function FoodList({ user }) {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [foods, setFoods] = useState([]);

  // Real-time fetch of user’s food items
  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, 'foods'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFoods(list);
    });

    // Cleanup when component unmounts
    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !expiry) return alert("Please enter name and expiry date");

    try {
      await addDoc(collection(db, 'foods'), {
        name,
        expiry,
        createdAt: new Date(),
        userId: user.uid
      });
      setName('');
      setExpiry('');
    } catch (err) {
      console.error('Error adding food:', err);
      alert('Failed to add food');
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Add Food</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          required
          style={{ marginLeft: '10px' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Add</button>
      </form>

      <h3>Your Food List</h3>
      <ul>
        {foods.length === 0 ? (
          <p>No food items yet.</p>
        ) : (
          foods.map((food) => (
            <li key={food.id}>
              {food.name} - Expires: {food.expiry}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FoodList;
