// src/components/FoodList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure you import db from firebase.js

function FoodList() {
  const [foods, setFoods] = useState([]);

  // useEffect runs code when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'foods'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFoods(items); // Save fetched data into state
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchData();
  }, []); // Empty array = run once when component mounts

  return (
    <div>
      <h2>Food List</h2>
      {foods.length === 0 ? (
        <p>No food items yet.</p>
      ) : (
        <ul>
          {foods.map(food => (
            <li key={food.id}>
              <strong>{food.name}</strong> — Expiry: {food.expiry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FoodList;
