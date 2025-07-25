import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaGlobe
} from 'react-icons/fa';

const Header = ({
  cartItems,
  wishlistItems,
  onCartClick,
  onWishlistClick
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [showDesktopCategories, setShowDesktopCategories] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'us',
    name: 'United States',
  });
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();

  const handleClicking = () => {
    navigate('/profile');
    setIsMobileMenuOpen(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      x: '-100%',
      transition: { duration: 0.3 }
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      x: '-100%',
      transition: { duration: 0.3 }
    }
  };

  const badgeVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.4,
        repeat: 1
      }
    }
  };

  const navItemHover = {
    scale: 1.05,
    color: "#0D6EFD",
    transition: { duration: 0.2 }
  };

  const navItemTap = {
    scale: 0.95
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleClicks = () => {
    navigate('/products');
    setIsMobileMenuOpen(false);
  };

  const dropdownRef = useRef(null);
  const categoriesRef = useRef(null);
  const countryRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileCategoriesRef = useRef(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleMobileCategories = () => {
    setShowMobileCategories((prev) => !prev);
  };

  const toggleDesktopCategories = () => {
    setShowDesktopCategories((prev) => !prev);
  };

  const toggleCountryDropdown = () => {
    setShowCountryDropdown((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowMobileCategories(false);
    setShowDesktopCategories(false);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchInput)}`);
      setSearchInput('');
      setShowMobileSearch(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
    setShowMobileCategories(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowDesktopCategories(false);
      }
      if (mobileCategoriesRef.current && !mobileCategoriesRef.current.contains(event.target) &&
        !event.target.closest('.mobile-categories-toggle')) {
        setShowMobileCategories(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
      if (mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.mobile-menu-button')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const dropdownStyle = 'absolute top-full mt-2 right-0 bg-white shadow-lg p-4 w-60 border rounded z-50';
  const mobileDropdownStyle = 'bg-white shadow-lg p-4 w-full border rounded mt-2';

  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'au', name: 'Australia' },
    { code: 'de', name: 'Germany' },
  ];

  const categories = [
    'Automobiles',
    'Clothes and wear',
    'Home interiors',
    'Computer and Tech',
    'Tools and tech',
    'Tools, equipments',
    'Sports and outdoor',
    'Animals and pets',
    'Machinery tools',
    'More category'
  ];

  return (
    <motion.div
      className="w-full sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 200 }}
    >
      {/* Mobile Header */}
      <motion.header
        className={`w-full bg-white shadow px-4 py-3 flex items-center justify-between md:hidden ${isScrolled ? 'shadow-md py-2' : ''
          }`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.5 }}
      >
        {/* Hamburger Menu */}
        <motion.button
          className="mobile-menu-button text-gray-700"
          onClick={toggleMobileMenu}
          whileHover={navItemHover}
          whileTap={navItemTap}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>

        {/* Brand */}
        <motion.div
          onClick={handleClick}
          className="flex items-center space-x-2 cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="36" height="36" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.4676 1.91309H37.185C40.9489 1.91309 44.0002 5.28555 44.0002 9.44569V34.5544C44.0002 38.7145 40.9489 42.087 37.185 42.087H14.4676C10.7036 42.087 7.65234 38.7145 7.65234 34.5544L7.65234 9.44569C7.65234 5.28555 10.7036 1.91309 14.4676 1.91309Z" fill="#0D6EFD" fillOpacity="0.2" />
              <path fillRule="evenodd" clipRule="evenodd" d="M8.13046 1.91309H32.0435C36.0055 1.91309 39.2174 5.28555 39.2174 9.44569V34.5544C39.2174 38.7145 36.0055 42.087 32.0435 42.087H8.13046C4.16841 42.087 0.956542 38.7145 0.956543 34.5544L0.956543 9.44569C0.956543 5.28555 4.16841 1.91309 8.13046 1.91309Z" fill="#0D6EFD" />
              <g opacity="0.7">
                <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M15.2898 18.3563H14.3092C14.2587 18.3563 14.1837 18.4266 14.1808 18.4731L13.4585 30.1478L26.9544 30.1452L26.2249 18.4731C26.2221 18.4284 26.1453 18.3563 26.0965 18.3563H25.116V20.3216C25.116 20.8643 24.676 21.3042 24.1334 21.3042C24.1334 21.3042 24.1334 21.3042 24.1334 21.3042C23.5907 21.3042 23.1507 20.8643 23.1507 20.3216V18.3563H17.255V20.3216C17.255 20.8643 16.8151 21.3042 16.2724 21.3042C16.2724 21.3042 16.2724 21.3042 16.2724 21.3042C15.7297 21.3042 15.2898 20.8643 15.2898 20.3216V18.3563Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M20.203 11.4783C22.9151 11.4783 25.1162 13.6796 25.1162 16.3891L26.0967 16.3914C27.1832 16.3914 28.119 17.2704 28.1865 18.3508L28.9242 30.1539C28.9918 31.2361 28.1695 32.1133 27.0862 32.1133H13.3199C12.2372 32.1133 11.4144 31.2344 11.4819 30.1539L12.2196 18.3508C12.2872 17.2686 13.221 16.3914 14.3094 16.3914H15.2899C15.2899 13.6781 17.4928 11.4783 20.203 11.4783ZM23.1509 16.3915C23.1509 14.765 21.8297 13.4436 20.203 13.4436C18.5776 13.4436 17.2552 14.7642 17.2552 16.3892L23.1509 16.3915ZM15.2899 18.3566H14.3094C14.2589 18.3566 14.1839 18.4269 14.181 18.4733L13.4587 30.148L26.9546 30.1455L26.2251 18.4733C26.2223 18.4286 26.1454 18.3566 26.0967 18.3566H25.1162V20.3218C25.1162 20.8645 24.6762 21.3044 24.1335 21.3044C24.1335 21.3044 24.1335 21.3044 24.1335 21.3044C23.5908 21.3044 23.1509 20.8645 23.1509 20.3218V18.3566H17.2552V20.3218C17.2552 20.8645 16.8152 21.3044 16.2726 21.3044C16.2726 21.3044 16.2726 21.3044 16.2726 21.3044C15.7299 21.3044 15.2899 20.8645 15.2899 20.3218V18.3566Z" fill="white" />
              </g>
            </g>
          </svg>
          <span className="text-blue-700 font-semibold text-xl">Brand</span>
        </motion.div>

        {/* Icons */}
        <motion.div
          className="flex items-center space-x-4"
          variants={itemVariants}
        >
          {/* Search Icon */}
          <motion.button
            className="text-gray-700"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            whileHover={navItemHover}
            whileTap={navItemTap}
          >
            <FaSearch size={20} />
          </motion.button>

          {/* Cart */}
          <motion.button
            onClick={onCartClick}
            className="relative"
            whileHover={navItemHover}
            whileTap={navItemTap}
          >
            <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.29989 16.7997C5.14491 16.7997 4.21043 17.7447 4.21043 18.8997C4.21043 20.0546 5.14491 20.9996 6.29989 20.9996C7.45487 20.9996 8.39985 20.0546 8.39985 18.8997C8.39985 17.7447 7.45487 16.7997 6.29989 16.7997ZM0 1.04998C0 1.62747 0.472492 2.09996 1.04998 2.09996H2.09996L5.8799 10.0693L4.46242 12.6313C3.69593 14.0383 4.70392 15.7497 6.29989 15.7497H17.8497C18.4272 15.7497 18.8997 15.2772 18.8997 14.6997C18.8997 14.1223 18.4272 13.6498 17.8497 13.6498H6.29989L7.45487 11.5498H15.2772C16.0647 11.5498 16.7577 11.1193 17.1147 10.4683L20.8736 3.65394C21.2621 2.96095 20.7581 2.09996 19.9601 2.09996H4.42042L3.71693 0.598489C3.54894 0.230996 3.17094 0 2.77195 0H1.04998C0.472492 0 0 0.472492 0 1.04998ZM16.7997 16.7997C15.6447 16.7997 14.7102 17.7447 14.7102 18.8997C14.7102 20.0546 15.6447 20.9996 16.7997 20.9996C17.9547 20.9996 18.8997 20.0546 18.8997 18.8997C18.8997 17.7447 17.9547 16.7997 16.7997 16.7997Z" fill="#8B96A5" />
            </svg>
            {cartItems.length > 0 && (
              <motion.span
                className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                variants={badgeVariants}
                animate="pulse"
                key={cartItems.length}
              >
                {cartItems.length}
              </motion.span>
            )}
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <motion.div
          className="md:hidden bg-white border-b px-4 py-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 border border-gray-300 px-3 py-2 rounded-l-md focus:outline-none"
              autoFocus
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md flex items-center"
              type="submit"
            >
              <FaSearch />
            </button>
          </form>
        </motion.div>
      )}

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              ref={mobileMenuRef}
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-xl overflow-y-auto md:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-center mb-4">
                  <div onClick={handleClick} className="flex items-center space-x-2 cursor-pointer">
                    <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.8">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.4676 1.91309H37.185C40.9489 1.91309 44.0002 5.28555 44.0002 9.44569V34.5544C44.0002 38.7145 40.9489 42.087 37.185 42.087H14.4676C10.7036 42.087 7.65234 38.7145 7.65234 34.5544L7.65234 9.44569C7.65234 5.28555 10.7036 1.91309 14.4676 1.91309Z" fill="#0D6EFD" fillOpacity="0.2" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.13046 1.91309H32.0435C36.0055 1.91309 39.2174 5.28555 39.2174 9.44569V34.5544C39.2174 38.7145 36.0055 42.087 32.0435 42.087H8.13046C4.16841 42.087 0.956542 38.7145 0.956543 34.5544L0.956543 9.44569C0.956543 5.28555 4.16841 1.91309 8.13046 1.91309Z" fill="#0D6EFD" />
                        <g opacity="0.7">
                          <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M15.2898 18.3563H14.3092C14.2587 18.3563 14.1837 18.4266 14.1808 18.4731L13.4585 30.1478L26.9544 30.1452L26.2249 18.4731C26.2221 18.4284 26.1453 18.3563 26.0965 18.3563H25.116V20.3216C25.116 20.8643 24.676 21.3042 24.1334 21.3042C24.1334 21.3042 24.1334 21.3042 24.1334 21.3042C23.5907 21.3042 23.1507 20.8643 23.1507 20.3216V18.3563H17.255V20.3216C17.255 20.8643 16.8151 21.3042 16.2724 21.3042C16.2724 21.3042 16.2724 21.3042 16.2724 21.3042C15.7297 21.3042 15.2898 20.8643 15.2898 20.3216V18.3563Z" fill="white" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M20.203 11.4783C22.9151 11.4783 25.1162 13.6796 25.1162 16.3891L26.0967 16.3914C27.1832 16.3914 28.119 17.2704 28.1865 18.3508L28.9242 30.1539C28.9918 31.2361 28.1695 32.1133 27.0862 32.1133H13.3199C12.2372 32.1133 11.4144 31.2344 11.4819 30.1539L12.2196 18.3508C12.2872 17.2686 13.221 16.3914 14.3094 16.3914H15.2899C15.2899 13.6781 17.4928 11.4783 20.203 11.4783ZM23.1509 16.3915C23.1509 14.765 21.8297 13.4436 20.203 13.4436C18.5776 13.4436 17.2552 14.7642 17.2552 16.3892L23.1509 16.3915ZM15.2899 18.3566H14.3094C14.2589 18.3566 14.1839 18.4269 14.181 18.4733L13.4587 30.148L26.9546 30.1455L26.2251 18.4733C26.2223 18.4286 26.1454 18.3566 26.0967 18.3566H25.1162V20.3218C25.1162 20.8645 24.6762 21.3044 24.1335 21.3044C24.1335 21.3044 24.1335 21.3044 24.1335 21.3044C23.5908 21.3044 23.1509 20.8645 23.1509 20.3218V18.3566H17.2552V20.3218C17.2552 20.8645 16.8152 21.3044 16.2726 21.3044C16.2726 21.3044 16.2726 21.3044 16.2726 21.3044C15.7299 21.3044 15.2899 20.8645 15.2899 20.3218V18.3566Z" fill="white" />
                        </g>
                      </g>
                    </svg>
                    <span className="text-blue-700 font-semibold text-xl">Brand</span>
                  </div>
                  <button onClick={closeMobileMenu} className="text-gray-600">
                    <FaTimes size={24} />
                  </button>
                </div>

                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 pl-10 rounded-md focus:outline-none"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </form>
              </div>

              <div className="p-4">
                {/* Profile */}
                <button
                  onClick={handleClicking}
                  className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md"
                >
                  <FaUser className="text-gray-600" />
                  <span>Profile</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={onWishlistClick}
                  className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md relative"
                >
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.35 17.13C10.59 17.82 9.42003 17.82 8.66003 17.12L8.55003 17.02C3.30003 12.27 -0.129969 9.16004 3.10168e-05 5.28004C0.060031 3.58004 0.930031 1.95004 2.34003 0.990044C4.98003 -0.809956 8.24003 0.0300438 10 2.09004C11.76 0.0300438 15.02 -0.819956 17.66 0.990044C19.07 1.95004 19.94 3.58004 20 5.28004C20.14 9.16004 16.7 12.27 11.45 17.04L11.35 17.13Z" fill="#8B96A5" />
                  </svg>
                  <span>Wishlist</span>
                  {wishlistItems.length > 0 && (
                    <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>

                {/* Categories */}
                <div className="mt-4">
                  <button
                    onClick={toggleMobileCategories}
                    className="mobile-categories-toggle w-full flex justify-between items-center p-2 hover:bg-gray-100 rounded-md"
                  >
                    <span className="font-medium">Categories</span>
                    <span>{showMobileCategories ? '▲' : '▼'}</span>
                  </button>

                  <AnimatePresence>
                    {showMobileCategories && (
                      <motion.div
                        ref={mobileCategoriesRef}
                        className="mt-2 bg-gray-50 rounded-md"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ul className="py-2">
                          <li
                            className="px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              handleCategorySelect('All Categories');
                              closeMobileMenu();
                            }}
                          >
                            All Categories
                          </li>
                          {categories.map((category, index) => (
                            <li
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                handleCategorySelect(category);
                                closeMobileMenu();
                                handleClicks();
                              }}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Links */}
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-medium px-2 mb-2">Navigation</h3>
                  <ul>
                    {['Hot offers', 'Gift boxes', 'Projects', 'Menu item', 'Help'].map((item, index) => (
                      <li key={index}>
                        <button
                          className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                          onClick={() => {
                            if (item === 'Help') {
                              navigate('/help');
                            } else {
                              handleClicks();
                            }
                            closeMobileMenu();
                          }}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Language and Country */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <select className="bg-white border border-gray-300 px-2 py-1 rounded focus:outline-none w-1/2">
                      <option>English, USD</option>
                      <option>Spanish, EUR</option>
                    </select>

                    <div className="relative w-1/2 ml-2">
                      <button
                        onClick={toggleCountryDropdown}
                        className="flex items-center justify-center gap-1 w-full border border-gray-300 px-2 py-1 rounded hover:border-blue-500"
                      >
                        <img
                          src={`https://flagcdn.com/${selectedCountry.code}.svg`}
                          alt={`${selectedCountry.name} Flag`}
                          className="w-5 h-4 object-cover"
                        />
                        <span className="truncate">Ship to</span>
                        <span>▾</span>
                      </button>

                      <AnimatePresence>
                        {showCountryDropdown && (
                          <motion.div
                            className="absolute top-full left-0 right-0 bg-white shadow-lg mt-1 p-2 text-sm border rounded z-50"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            {countries.map((country) => (
                              <div
                                key={country.code}
                                onClick={() => handleCountrySelect(country)}
                                className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer p-2"
                              >
                                <img
                                  src={`https://flagcdn.com/w40/${country.code}.png`}
                                  alt={`${country.name} Flag`}
                                  className="w-5 h-4 object-cover"
                                />
                                <span className="truncate">{country.name}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Header */}
      <motion.header
        className={`w-full bg-white shadow px-6 py-3 items-center justify-between max-w-screen-xl mx-auto relative hidden md:flex ${isScrolled ? 'shadow-md py-2' : ''
          }`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.5 }}
      >
        {/* Brand - Fixed SVG */}
        <motion.div
          onClick={handleClick}
          className="flex items-center space-x-2 cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.4676 1.91309H37.185C40.9489 1.91309 44.0002 5.28555 44.0002 9.44569V34.5544C44.0002 38.7145 40.9489 42.087 37.185 42.087H14.4676C10.7036 42.087 7.65234 38.7145 7.65234 34.5544L7.65234 9.44569C7.65234 5.28555 10.7036 1.91309 14.4676 1.91309Z" fill="#0D6EFD" fillOpacity="0.2" />
              <path fillRule="evenodd" clipRule="evenodd" d="M8.13046 1.91309H32.0435C36.0055 1.91309 39.2174 5.28555 39.2174 9.44569V34.5544C39.2174 38.7145 36.0055 42.087 32.0435 42.087H8.13046C4.16841 42.087 0.956542 38.7145 0.956543 34.5544L0.956543 9.44569C0.956543 5.28555 4.16841 1.91309 8.13046 1.91309Z" fill="#0D6EFD" />
              <g opacity="0.7">
                <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M15.2898 18.3563H14.3092C14.2587 18.3563 14.1837 18.4266 14.1808 18.4731L13.4585 30.1478L26.9544 30.1452L26.2249 18.4731C26.2221 18.4284 26.1453 18.3563 26.0965 18.3563H25.116V20.3216C25.116 20.8643 24.676 21.3042 24.1334 21.3042C24.1334 21.3042 24.1334 21.3042 24.1334 21.3042C23.5907 21.3042 23.1507 20.8643 23.1507 20.3216V18.3563H17.255V20.3216C17.255 20.8643 16.8151 21.3042 16.2724 21.3042C16.2724 21.3042 16.2724 21.3042 16.2724 21.3042C15.7297 21.3042 15.2898 20.8643 15.2898 20.3216V18.3563Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M20.203 11.4783C22.9151 11.4783 25.1162 13.6796 25.1162 16.3891L26.0967 16.3914C27.1832 16.3914 28.119 17.2704 28.1865 18.3508L28.9242 30.1539C28.9918 31.2361 28.1695 32.1133 27.0862 32.1133H13.3199C12.2372 32.1133 11.4144 31.2344 11.4819 30.1539L12.2196 18.3508C12.2872 17.2686 13.221 16.3914 14.3094 16.3914H15.2899C15.2899 13.6781 17.4928 11.4783 20.203 11.4783ZM23.1509 16.3915C23.1509 14.765 21.8297 13.4436 20.203 13.4436C18.5776 13.4436 17.2552 14.7642 17.2552 16.3892L23.1509 16.3915ZM15.2899 18.3566H14.3094C14.2589 18.3566 14.1839 18.4269 14.181 18.4733L13.4587 30.148L26.9546 30.1455L26.2251 18.4733C26.2223 18.4286 26.1454 18.3566 26.0967 18.3566H25.1162V20.3218C25.1162 20.8645 24.6762 21.3044 24.1335 21.3044C24.1335 21.3044 24.1335 21.3044 24.1335 21.3044C23.5908 21.3044 23.1509 20.8645 23.1509 20.3218V18.3566H17.2552V20.3218C17.2552 20.8645 16.8152 21.3044 16.2726 21.3044C16.2726 21.3044 16.2726 21.3044 16.2726 21.3044C15.7299 21.3044 15.2899 20.8645 15.2899 20.3218V18.3566Z" fill="white" />
              </g>
            </g>
          </svg>
          <span className="text-blue-700 font-semibold text-2xl">Brand</span>
        </motion.div>

        {/* Search */}
        <motion.div
          className="flex flex-1 max-w-2xl mx-6 relative"
          variants={itemVariants}
        >
          <motion.form
            onSubmit={handleSearch}
            className="flex w-full"
            whileFocus={{ boxShadow: "0 0 0 2px #0D6EFD" }}
          >
            <motion.input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              whileHover={{ borderColor: "#0D6EFD" }}
            />

            <select
              onChange={(e) => handleClicks(e.target.value)}
              className="border-t border-b border-gray-300 px-2 py-2 bg-white text-gray-700 focus:outline-none"
            >
              <option value="">All Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <motion.button
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md flex items-center"
              type="submit"
              whileHover={{
                backgroundColor: "#0a58ca",
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSearch className="mr-1" /> Search
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Icons */}
        <motion.div
          ref={dropdownRef}
          className="flex items-center space-x-6 text-gray-700 text-sm relative"
          variants={itemVariants}
        >
          {/* Profile */}
          <div className="relative">
            <motion.button
              onClick={handleClicking}
              className="flex flex-col items-center"
              whileHover={navItemHover}
              whileTap={navItemTap}
            >
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 11.5C6.6625 11.5 0 13.175 0 16.5V17.75C0 18.4375 0.5625 19 1.25 19H18.75C19.4375 19 20 18.4375 20 17.75V16.5C20 13.175 13.3375 11.5 10 11.5Z" fill="#8B96A5" />
              </svg>
              <span>Profile</span>
            </motion.button>
          </div>

          {/* Message */}
          <div className="relative">
            <motion.button
              onClick={() => toggleDropdown('message')}
              className="flex flex-col items-center"
              whileHover={navItemHover}
              whileTap={navItemTap}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M18 0H2C0.9 0 0.01 0.9 0.01 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM5 7H15C15.55 7 16 7.45 16 8C16 8.55 15.55 9 15 9H5C4.45 9 4 8.55 4 8C4 7.45 4.45 7 5 7ZM11 12H5C4.45 12 4 11.55 4 11C4 10.45 4.45 10 5 10H11C11.55 10 12 10.45 12 11C12 11.55 11.55 12 11 12ZM15 6H5C4.45 6 4 5.55 4 5C4 4.45 4.45 4 5 4H15C15.55 4 16 4.45 16 5C16 5.55 15.55 6 15 6Z" fill="#8B96A5" />
              </svg>
              <span><a href="https://mail.google.com/mail/u/0/#inbox">Message</a></span>
            </motion.button>
          </div>

          {/* Wishlist */}
          <div className="relative">
            <motion.button
              onClick={onWishlistClick}
              className="flex flex-col items-center relative"
              whileHover={navItemHover}
              whileTap={navItemTap}
            >
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.35 17.13C10.59 17.82 9.42003 17.82 8.66003 17.12L8.55003 17.02C3.30003 12.27 -0.129969 9.16004 3.10168e-05 5.28004C0.060031 3.58004 0.930031 1.95004 2.34003 0.990044C4.98003 -0.809956 8.24003 0.0300438 10 2.09004C11.76 0.0300438 15.02 -0.819956 17.66 0.990044C19.07 1.95004 19.94 3.58004 20 5.28004C20.14 9.16004 16.7 12.27 11.45 17.04L11.35 17.13Z" fill="#8B96A5" />
              </svg>
              <span>WishList</span>
              {wishlistItems.length > 0 && (
                <motion.span
                  className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  variants={badgeVariants}
                  animate="pulse"
                  key={wishlistItems.length}
                >
                  {wishlistItems.length}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* My Cart */}
          <div className="relative">
            <motion.button
              onClick={onCartClick}
              className="flex flex-col items-center relative"
              whileHover={navItemHover}
              whileTap={navItemTap}
            >
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.29989 16.7997C5.14491 16.7997 4.21043 17.7447 4.21043 18.8997C4.21043 20.0546 5.14491 20.9996 6.29989 20.9996C7.45487 20.9996 8.39985 20.0546 8.39985 18.8997C8.39985 17.7447 7.45487 16.7997 6.29989 16.7997ZM0 1.04998C0 1.62747 0.472492 2.09996 1.04998 2.09996H2.09996L5.8799 10.0693L4.46242 12.6313C3.69593 14.0383 4.70392 15.7497 6.29989 15.7497H17.8497C18.4272 15.7497 18.8997 15.2772 18.8997 14.6997C18.8997 14.1223 18.4272 13.6498 17.8497 13.6498H6.29989L7.45487 11.5498H15.2772C16.0647 11.5498 16.7577 11.1193 17.1147 10.4683L20.8736 3.65394C21.2621 2.96095 20.7581 2.09996 19.9601 2.09996H4.42042L3.71693 0.598489C3.54894 0.230996 3.17094 0 2.77195 0H1.04998C0.472492 0 0 0.472492 0 1.04998ZM16.7997 16.7997C15.6447 16.7997 14.7102 17.7447 14.7102 18.8997C14.7102 20.0546 15.6447 20.9996 16.7997 20.9996C17.9547 20.9996 18.8997 20.0546 18.8997 18.8997C18.8997 17.7447 17.9547 16.7997 16.7997 16.7997Z" fill="#8B96A5" />
              </svg>
              <span>My Cart</span>
              {cartItems.length > 0 && (
                <motion.span
                  className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  variants={badgeVariants}
                  animate="pulse"
                  key={cartItems.length}
                >
                  {cartItems.length}
                </motion.span>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* Lower Header */}
      <motion.nav
        className={`hidden md:flex w-full bg-white shadow-sm px-6 py-2 justify-between items-center max-w-screen-xl mx-auto relative ${isScrolled ? 'py-1' : ''
          }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Left Menu */}
        <ul className="flex space-x-6 text-gray-700 text-sm font-medium relative" ref={categoriesRef}>
          <li>
            <motion.button
              onClick={toggleDesktopCategories}
              className="flex items-center gap-2 hover:text-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === 'All Categories' ? (
                <>
                  <FaBars /> All Categories
                </>
              ) : (
                <span className="font-semibold text-blue-600">{selectedCategory}</span>
              )}
              <span className="ml-1">▾</span>
            </motion.button>
            <AnimatePresence>
              {showDesktopCategories && (
                <motion.div
                  className="absolute top-10 left-0 bg-white shadow-lg border rounded-md z-50 w-64 p-4"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ul className="space-y-2 text-sm">
                    <motion.li
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={() => handleCategorySelect('All Categories')}
                      whileHover={{ x: 5 }}
                    >
                      All Categories
                    </motion.li>
                    {categories.map((category, index) => (
                      <motion.div onClick={handleClicks} key={index}>
                        <motion.li
                          className="hover:text-blue-600 cursor-pointer"
                          onClick={() => handleCategorySelect(category)}
                          whileHover={{ x: 5 }}
                        >
                          {category}
                        </motion.li>
                      </motion.div>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <motion.li
            className="cursor-pointer hover:text-blue-600"
            whileHover={navItemHover}
            whileTap={navItemTap}
          >
            Hot offers
          </motion.li>
          <motion.li
            className="cursor-pointer hover:text-blue-600"
            whileHover={navItemHover}
            whileTap={navItemTap}
          >
            Gift boxes
          </motion.li>
          <motion.li
            className="cursor-pointer hover:text-blue-600"
            whileHover={navItemHover}
            whileTap={navItemTap}
          >
            Projects
          </motion.li>
          <motion.li
            className="cursor-pointer hover:text-blue-600"
            whileHover={navItemHover}
            whileTap={navItemTap}
          >
            Menu item
          </motion.li>
          <li className="relative group cursor-pointer hover:text-blue-600">
            <motion.div
              className="flex items-center"
              whileHover={navItemHover}
              whileTap={navItemTap}
            >
              Help <span className="ml-1">▾</span>
            </motion.div>
            <motion.div
              className="absolute hidden group-hover:block bg-white shadow-lg mt-2 p-4 text-sm border rounded z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <motion.p
                className="hover:text-blue-600 cursor-pointer mb-2"
                whileHover={{ x: 5 }}
              >
                Customer Service
              </motion.p>
              <motion.p
                className="hover:text-blue-600 cursor-pointer"
                whileHover={{ x: 5 }}
              >
                FAQ
              </motion.p>
            </motion.div>
          </li>
        </ul>

        {/* Right Menu */}
        <motion.div
          className="flex items-center space-x-4 text-sm text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.select
            className="bg-white border border-gray-300 px-2 py-1 rounded focus:outline-none"
            whileHover={{ borderColor: "#0D6EFD" }}
          >
            <option>English, USD</option>
            <option>Spanish, EUR</option>
          </motion.select>

          <div ref={countryRef} className="relative cursor-pointer">
            <motion.div
              className="flex items-center gap-1 hover:text-blue-600"
              onClick={toggleCountryDropdown}
              whileHover={navItemHover}
              whileTap={navItemTap}
            >
              <img
                src={`https://flagcdn.com/${selectedCountry.code}.svg`}
                alt={`${selectedCountry.name} Flag`}
                className="w-5 h-4 object-cover"
              />
              <span>Ship to </span>
              <span className="ml-1">▾</span>
            </motion.div>
            <AnimatePresence>
              {showCountryDropdown && (
                <motion.div
                  className="absolute top-full right-0 bg-white shadow-lg mt-2 p-4 text-sm border rounded z-50 w-48"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {countries.map((country) => (
                    <motion.div
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer mb-2"
                      whileHover={{ backgroundColor: "#f0f7ff" }}
                    >
                      <img
                        src={`https://flagcdn.com/w40/${country.code}.png`}
                        alt={`${country.name} Flag`}
                        className="w-5 h-4 object-cover"
                      />
                      <span>{country.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
};

export default Header;