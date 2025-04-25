import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';

function FoodList({ user }) {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [foods, setFoods] = useState([]);

  // Fetch only the current user's food items
  const fetchFoods = async () => {
    try {
      const q = query(
        collection(db, 'foods'),
        where('userId', '==', user.uid) // only get foods added by this user
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFoods(list);
    } catch (err) {
      console.error('Error fetching foods:', err);
    }
  };

  // Run once when component mounts or user changes
  useEffect(() => {
    if (user?.uid) {
      fetchFoods();
    }
  }, [user]);

  // Add new food item with userId
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !expiry) return alert("Please enter name and expiry date");

    try {
      await addDoc(collection(db, 'foods'), {
        name,
        expiry,
        createdAt: new Date(),
        userId: user.uid // ✅ save who owns this food item
      });
      setName('');
      setExpiry('');
      fetchFoods(); // Refresh list
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
