import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total cost for a single item
  const calculateItemCost = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity — removes item if quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Continue shopping navigates back to product list
  const handleContinueShopping = () => {
    onContinueShopping();
  };

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery 🌿');
  };

  return (
    <div className="cart-page">
      <h1 style={{ color: '#4CAF50', marginBottom: '10px' }}>🛒 Shopping Cart</h1>

      <button
        onClick={handleContinueShopping}
        style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', marginBottom: '20px' }}
      >
        ← Continue Shopping
      </button>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Go add some plants! 🌱</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                {/* Total cost per item updates dynamically with quantity */}
                <p>Total: ${calculateItemCost(item)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => handleDecrement(item)}
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item)}
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item)}
                style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '15px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total cart amount updates dynamically */}
          <div className="cart-total">
            Total Amount: ${calculateTotalAmount()}
          </div>

          <button
            onClick={handleCheckout}
            style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '25px', cursor: 'pointer', fontSize: '1.1rem', marginTop: '20px', display: 'block', marginLeft: 'auto' }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartItem;
