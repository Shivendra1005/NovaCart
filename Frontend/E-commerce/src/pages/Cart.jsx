import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import TopBar from '../component/TopBar';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const Cart = () => {
  const { products, currency, cartItem, updateQuantity, token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    if (!token) {
      navigate('/signup');
    } else {
      navigate('/place-order');
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <Title text1="YOUR" text2="CART" />

        {cartData.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm8 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Your cart is empty</h3>
            <p className="text-slate-400 text-sm mb-6">Looks like you haven't added anything yet.</p>
            <button onClick={() => navigate('/collection')} className="btn-primary">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="space-y-0">
                {cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  return (
                    <div
                      key={index}
                      className="cart-item flex items-center gap-5 py-5"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={productData.images[0]}
                          alt={productData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                          {productData.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm font-bold text-slate-700">
                            {currency}{productData.price?.toLocaleString("en-IN")}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                            Size: {item.size}
                          </span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          onChange={(e) =>
                            e.target.value === "" || e.target.value === "0"
                              ? null
                              : updateQuantity(item._id, item.size, Number(e.target.value))
                          }
                          className="w-10 text-center text-sm font-semibold text-slate-800 border border-slate-200 rounded-lg py-1 outline-none focus:border-indigo-400"
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                        />
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                        aria-label="Remove item"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 xl:w-96">
              <CartTotal />
              <button
                onClick={handleCheckoutClick}
                className="btn-primary w-full mt-4 text-base py-4 rounded-2xl"
              >
                Proceed to Checkout
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => navigate('/collection')}
                className="btn-outline w-full mt-3 text-sm py-3 rounded-2xl"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
