// src/components/FoodList.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // adjust path if needed

function FoodList() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'foods')); // 'foods' is your collection name
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFoodItems(items);
      } catch (error) {
        console.error("Error fetching food items: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Food List</h2>
      <ul>
        {foodItems.map(item => (
          <li key={item.id}>
            {item.name} - Expiry: {item.expiry}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodList;

// useEffect: Runs the data fetching when the component loads.

// getDocs(): Reads all documents from the 'foods' collection in Firestore.

// collection(db, 'foods'): Points to your Firestore collection.

// setFoodItems(): Updates the local state with the food items.