import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import HomePage from './components/HomePage';
import CartView from './components/Cart';
import ProductDetail from './components/ProductDetail';
import WishListView from './components/WishListView';
import ProfilePage from './components/ProfilePage'; // ✅ Make sure this is the combined component

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(null);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const addToWishList = (product) => {
    const existingItem = wishlistItems.find(item => item.id === product.id);
    if (!existingItem) {
      setWishlistItems([...wishlistItems, { ...product }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const removeFromWishList = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: parseInt(newQuantity) }
        : item
    ));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }, (_, i) => (
          <span key={`full-${i}`} className="text-yellow-500 mr-0.5">★</span>
        ))}
        {halfStar && <span className="text-yellow-500 mr-0.5">★½</span>}
        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 mr-0.5">☆</span>
        ))}
      </div>
    );
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout with " + cartItems.length + " items");
    setCartItems([]);
    setShowCartModal(false);
  };

  return (
    <Router>
      <Header
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        onCartClick={() => setShowCartModal(true)}
        onWishlistClick={() => setShowWishlistModal(true)}
        removeFromWishList={removeFromWishList}
      />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products"
            element={
              <ProductPage
                addToCart={addToCart}
                addToWishList={addToWishList}
                onViewProduct={setShowProductDetail}
                renderStars={renderStars}
              />
            }
          />
          {/* ✅ New Profile Route */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <Footer />

      {showCartModal && (
        <CartView
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          addToWishList={addToWishList}
          updateQuantity={updateQuantity}
          onClose={() => setShowCartModal(false)}
          onCheckout={handleCheckout}
          onViewProduct={(product) => {
            setShowCartModal(false);
            setShowProductDetail(product);
          }}
        />
      )}

      {showWishlistModal && (
        <WishListView
          wishlistItems={wishlistItems}
          removeFromWishList={removeFromWishList}
          addToCart={addToCart}
          onClose={() => setShowWishlistModal(false)}
          onViewProduct={(product) => {
            setShowWishlistModal(false);
            setShowProductDetail(product);
          }}
        />
      )}

      {showProductDetail && (
        <ProductDetail
          product={showProductDetail}
          onBack={() => setShowProductDetail(null)}
          addToCart={addToCart}
          addToWishList={addToWishList}
          renderStars={renderStars}
        />
      )}
    </Router>
  );
}

export default App;
