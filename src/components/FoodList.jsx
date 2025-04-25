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

  // ✅ Listen for real-time updates to foods belonging to the current user
  useEffect(() => {
    if (!user?.uid) return;

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
  }, [user?.uid]); // ✅ make sure this triggers when user ID is ready

  // 🧾 Add new food item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !expiry) {
      alert('Please enter name and expiry date');
      return;
    }

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
      console.error('❌ Error adding food:', err);
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
