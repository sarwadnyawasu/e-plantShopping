import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

// Plant data with 6+ plants across 3 categories
const plants = [
  { name: 'Snake Plant', price: 15, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400', category: 'Air Purifying' },
  { name: 'Peace Lily', price: 18, image: 'https://images.unsplash.com/photo-1602923668104-8f9e03e77b8a?w=400', category: 'Air Purifying' },
  { name: 'Spider Plant', price: 12, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400', category: 'Air Purifying' },
  { name: 'Aloe Vera', price: 12, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c76ea2?w=400', category: 'Succulents' },
  { name: 'Jade Plant', price: 14, image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400', category: 'Succulents' },
  { name: 'Echeveria', price: 10, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Succulents' },
  { name: 'Monstera', price: 25, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400', category: 'Tropical' },
  { name: 'Bird of Paradise', price: 30, image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400', category: 'Tropical' },
  { name: 'Pothos', price: 10, image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400', category: 'Tropical' },
];

function ProductList({ onGoToCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedItems, setAddedItems] = useState({});

  // Handles adding a plant to the cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prev) => ({ ...prev, [plant.name]: true }));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const categories = [...new Set(plants.map((p) => p.category))];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#4CAF50' }}>Paradise Nursery 🌿</h1>
        <button
          onClick={onGoToCart}
          style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '1rem' }}
        >
          🛒 Cart ({cartCount})
        </button>
      </div>

      {categories.map((category) => (
        <div key={category}>
          <h2 style={{ margin: '20px 0 10px', color: '#333' }}>{category}</h2>
          <div className="product-list">
            {plants.filter((p) => p.category === category).map((plant) => (
              <div className="product-card" key={plant.name}>
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>${plant.price}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedItems[plant.name]}
                  style={{ opacity: addedItems[plant.name] ? 0.6 : 1 }}
                >
                  {addedItems[plant.name] ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
