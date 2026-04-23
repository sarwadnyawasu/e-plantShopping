import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import CartItem from './CartItem';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <div>
      {!showProductList && !showCart && (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button
            className="get-started-btn"
            onClick={() => setShowProductList(true)}
          >
            Get Started
          </button>
        </div>
      )}

      {showProductList && !showCart && (
        <ProductList onGoToCart={() => { setShowCart(true); setShowProductList(false); }} />
      )}

      {showCart && (
        <CartItem onContinueShopping={() => { setShowCart(false); setShowProductList(true); }} />
      )}
    </div>
  );
}

export default App;
