import React from "react";
import { motion } from "framer-motion";
import Banner from "../assets/Banner.jpeg";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const categories = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools and equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery tools",
    "More category",
  ];

  const deals = [
    { 
      name: "Smart watch", 
      discount: "-25%",
      img: "https://tse1.mm.bing.net/th?id=OIP.riCTChIJxQJn2CgpW3EFcAHaHa&pid=Api&P=0&h=220"
    },
    { 
      name: "Laptops", 
      discount: "-10%",
      img: "https://tse1.mm.bing.net/th?id=OIP.OUfLKAeiGxUfLE-BszuU0wHaE8&pid=Api&P=0&h=220"
    },
    { 
      name: "Headphones", 
      discount: "-25%",
      img: "https://tse1.mm.bing.net/th?id=OIP.In6I5jFGUaOawLWTvy7xzwHaGs&pid=Api&P=0&h=220"
    },
    { 
      name: "Canon cameras", 
      discount: "-35%",
      img: "https://tse3.mm.bing.net/th?id=OIP.0gFgiG7cqEGv8F0ClJ-DjwHaGZ&pid=Api&P=0&h=220"
    },
    { 
      name: "Phones", 
      discount: "-15%",
      img: "https://tse1.mm.bing.net/th?id=OIP.GyRmrVfJzkWrJzUnxRZWJAHaF7&pid=Api&P=0&h=220"
    },
  ];

  const productSections = [
    {
      title: "Home and outdoor",
      items: [
        { name: "Sofa",price: "From USD 100", img: "https://tse1.mm.bing.net/th?id=OIP.OUfLKAeiGxUfLE-BszuU0wHaE8&pid=Api&P=0&h=220" },
        { name: "Chairs",price: "From USD 140", img: "https://tse2.mm.bing.net/th?id=OIP.s-ejrNusut6iszl305qcBwHaHa&pid=Api&P=0&h=220" },
        { name: "Kitchen mixer",price: "From USD 40", img: "https://tse3.mm.bing.net/th?id=OIP.Wt5Kz_3EYoywb8x8oI0S2QHaHa&pid=Api&P=0&h=220" },
        { name: "Coffee maker",price: "From USD 340", img: "https://tse3.mm.bing.net/th?id=OIP.5AapZtzO4HbAKp1VPStLGQHaHa&pid=Api&P=0&h=220" },
        { name: "Sofa",price: "From USD 200", img: "https://tse3.mm.bing.net/th?id=OIP.LiS2fljfwRGesh3j_VgE3AHaHa&pid=Api&P=0&h=220" },
        { name: "Chairs",price: "From USD 440", img: "https://tse4.mm.bing.net/th?id=OIP.BH3kzTe1vxVTyvIayvwDYgHaHa&pid=Api&P=0&h=220" },
        { name: "Kitchen mixer",price: "From USD 90", img: "https://tse2.mm.bing.net/th?id=OIP.UtX1NO_CpR-eFWl7VC4gYAHaHa&pid=Api&P=0&h=220" },
        { name: "Coffee maker",price: "From USD 240", img: "https://tse2.mm.bing.net/th?id=OIP.SCP75RVkSTsXnpK48ZO_TQHaHa&pid=Api&P=0&h=220" },
      ],
    },
    {
      title: "Consumer electronics and gadgets",
      items: [
        { name: "Smart watches",price: "From USD 100", img: "https://tse1.mm.bing.net/th?id=OIP.riCTChIJxQJn2CgpW3EFcAHaHa&pid=Api&P=0&h=220" },
        { name: "Camera",price: "From USD 140", img: "https://tse3.mm.bing.net/th?id=OIP.0gFgiG7cqEGv8F0ClJ-DjwHaGZ&pid=Api&P=0&h=220" },
        { name: "Headphone",price: "From USD 40", img: "https://tse1.mm.bing.net/th?id=OIP.In6I5jFGUaOawLWTvy7xzwHaGs&pid=Api&P=0&h=220" },
        { name: "Kettle", price: "From USD 340", img: "https://tse4.mm.bing.net/th?id=OIP.yqhbVzAMJp4Xb5epGhbncwHaHa&pid=Api&P=0&h=220" },
        { name: "Laptops",price: "From USD 200", img: "https://tse1.mm.bing.net/th?id=OIP.GyRmrVfJzkWrJzUnxRZWJAHaF7&pid=Api&P=0&h=220" },
        { name: "Gaming set",price: "From USD 440", img: "https://tse3.mm.bing.net/th?id=OIP.siv9KJq1idzkEaI1pQfDqwHaFj&pid=Api&P=0&h=220" },
        { name: "Laptops",price: "From USD 90", img: "https://tse1.mm.bing.net/th?id=OIF.FF6IAm2LlVf3NWOBvvFI6A&pid=Api&P=0&h=220" },
        { name: "Kettle", price: "From USD 240", img: "https://i5.walmartimages.com/asr/5c847915-ab0d-48a1-b9ab-f495a46e9810_1.c1cc2537e9bcb539fb8ff72910305c28.jpeg" },
      ],
    },
  ];

  const recommendedItems = [
    { id: 1, price: "$10.30", description: "Wireless Earbuds", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 2, price: "$15.20", description: "Bluetooth Speaker", img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 3, price: "$22.50", description: "Smart Light Bulb", img: "https://tse3.mm.bing.net/th?id=OIP.LmblJMe74TgPf0uNkUAmrgHaFT&pid=Api&P=0&h=220" },
    { id: 4, price: "$18.90", description: "Portable Charger", img: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 5, price: "$12.70", description: "Fitness Tracker", img: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 6, price: "$25.40", description: "Desk Lamp", img: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 7, price: "$19.99", description: "Air Purifier", img: "https://tse4.mm.bing.net/th?id=OIP.fbojNQPiddaU8mv-MwhJKAAAAA&pid=Api&P=0&h=220" },
    { id: 8, price: "$14.50", description: "Phone Stand", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 9, price: "$21.30", description: "Wireless Mouse", img: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 10, price: "$16.80", description: "Mechanical Keyboard", img: "https://tse3.mm.bing.net/th?id=OIP.ylpv4IIPqdWgVpCqAUx10QAAAA&pid=Api&P=0&h=220" },
    { id: 11, price: "$13.20", description: "HD Webcam", img: "https://tse1.mm.bing.net/th?id=OIP.rtmbe0_H-BtUqlQsBv3zVgHaHa&pid=Api&P=0&h=220" },
    { id: 12, price: "$17.60", description: "External SSD", img: "https://tse4.mm.bing.net/th/id/OIP.EoPYBVZHbnt_-fZCr2L4UwHaFj?pid=Api&P=0&h=220" },
  ];

  const services = [
    { 
      name: "Source from Industry Hubs",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    { 
      name: "Customize Your Products",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    { 
      name: "Fast shipping by air",
      img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    { 
      name: "Product inspection",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
  ];

  const regions = [
    { name: "Arabic Emrites", flag: "https://flagcdn.com/w40/ae.png", description: "Shopname.ae" },
    { name: "Australia", flag: "https://flagcdn.com/w40/au.png", description: "Shopname.ae" },
    { name: "United States", flag: "https://flagcdn.com/w40/us.png", description: "Shopname.ae" },
    { name: "Russia", flag: "https://flagcdn.com/w40/ru.png", description: "Shopname.ae" },
    { name: "Italy", flag: "https://flagcdn.com/w40/it.png", description: "Shopname.ae" },
    { name: "Denmark", flag: "https://flagcdn.com/w40/dk.png", description: "Shopname.ae" },
    { name: "France", flag: "https://flagcdn.com/w40/fr.png", description: "Shopname.ae" },
    { name: "China", flag: "https://flagcdn.com/w40/cn.png", description: "Shopname.ae" },
    { name: "Great Britain", flag: "https://flagcdn.com/w40/gb.png", description: "Shopname.ae" },
  ];
  
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/products');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="bg-gray-50 px-4 md:px-8 lg:px-12 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Top Section - Enhanced Desktop Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories Sidebar - Desktop Only */}
        <motion.div 
          className="hidden lg:block w-full lg:w-1/5 bg-white p-5 rounded-xl shadow-lg"
          variants={itemVariants}
        >
          <h3 className="font-bold text-gray-800 text-lg mb-4 pb-2 border-b border-gray-200">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat, i) => (
              <motion.div 
                key={i} 
                className="text-gray-700 hover:text-blue-600 cursor-pointer p-2 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={handleClick}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {cat}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Banner */}
        <motion.div 
          className="w-full lg:w-3/5 bg-white rounded-2xl shadow-lg overflow-hidden relative"
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
          <motion.img
            src={Banner}
            alt="Banner"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-10 lg:px-14 z-20">
            <motion.h4 
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Latest trending
            </motion.h4>
            <motion.h1 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 max-w-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Electronic items
            </motion.h1>
            <motion.button 
              onClick={handleClick} 
              className="bg-white hover:bg-blue-50 text-blue-700 font-bold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Shop now
            </motion.button>
          </div>
        </motion.div>

        {/* Login Box - Enhanced for Desktop */}
        <motion.div 
          className="w-full lg:w-1/5 bg-white p-5 rounded-2xl shadow-lg flex flex-col gap-5"
          variants={itemVariants}
        >
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
                </svg>
              </div>
              <p className="text-gray-800 font-medium">Hi, user <br /> let's get started</p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <motion.button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join now
              </motion.button>
              <motion.button 
                className="border-2 border-blue-600 text-blue-600 font-medium py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Log in
              </motion.button>
            </div>
          </div>
          
          <motion.div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-bold text-lg mb-2">Special Offer</h3>
            <p>Get US $10 off <br /> with a new supplier</p>
          </motion.div>
          
          <motion.button 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="block font-bold">Send quotes with</span>
            <span>supplier preferences</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Categories */}
      <motion.div 
        className="lg:hidden mt-6 bg-white p-4 rounded-xl shadow overflow-x-auto"
        variants={itemVariants}
      >
        <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
        <div className="flex gap-3">
          {categories.map((cat, i) => (
            <motion.div 
              key={i} 
              className="bg-gray-100 px-4 py-2 rounded-xl text-sm whitespace-nowrap cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={handleClick}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {cat}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Deals & Offers - Enhanced Desktop Layout */}
      <motion.div 
        className="mt-8 bg-white p-5 rounded-2xl shadow-lg border border-gray-100"
        variants={fadeIn}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Deals and offers</h2>
            <p className="text-gray-500 mt-1">Hygiene equipment on discount</p>
          </div>
          <div className="flex items-center gap-2 mt-3 md:mt-0">
            <span className="text-gray-500">Ends in:</span>
            <div className="bg-blue-900 text-white font-medium px-3 py-1 rounded">04:13:56:22</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <motion.div 
            className="grid grid-cols-4 gap-3 w-full md:w-auto"
            variants={staggerCards}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: "Days", value: "04" },
              { label: "Hours", value: "13" },
              { label: "Mins", value: "34" },
              { label: "Secs", value: "56" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-blue-900 to-blue-800 text-white rounded-xl p-3 text-center min-w-[70px]"
                variants={cardAnimation}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-xl font-bold">{item.value}</div>
                <div className="text-xs mt-1">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="flex overflow-x-auto pb-4 gap-5 w-full md:grid md:grid-cols-5 md:flex-1"
            variants={staggerCards}
            initial="hidden"
            animate="visible"
          >
            {deals.map((item, i) => (
              <motion.div 
                key={i} 
                className="text-center border border-gray-200 rounded-xl p-4 min-w-[150px] hover:shadow-lg transition-shadow"
                onClick={handleClick}
                variants={cardAnimation}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.1)"
                }}
              >
                {/* <div className="bg-gray-100 rounded-xl p-4 mb-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="mx-auto h-20 object-contain"
                  />
                </div> */}


                <div className="bg-gray-100 rounded-xl p-4 mb-3 h-32 flex items-center justify-center">
  <img
    src={item.img}
    alt={item.name}
    className="w-20 h-20 object-contain"
  />
</div>

                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-red-500 font-bold mt-2">{item.discount}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Product Sections - Enhanced Desktop Layout */}
      <div className="mt-10 space-y-8">
        {productSections.map((section, index) => (
          <motion.div
            key={index}
            className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden"
            variants={itemVariants}
          >
            <motion.div
              className="lg:w-1/5 relative p-6 text-white flex flex-col justify-between min-h-[250px]"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-0"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold">{section.title}</h3>
              </div>
              <motion.button 
                onClick={handleClick} 
                className="relative z-10 mt-4 bg-white text-gray-800 font-medium px-5 py-2.5 rounded-lg hover:bg-gray-100 w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Source now
              </motion.button>
            </motion.div>

            <motion.div 
              className="lg:w-4/5 grid grid-cols-2 md:grid-cols-4 gap-4 p-5"
              variants={staggerCards}
              initial="hidden"
              animate="visible"
            >
              {section.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="text-center border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                  onClick={handleClick}
                  variants={cardAnimation}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.1)"
                  }}
                >
                  <div className="flex items-center justify-between">
  <div className="text-left">
    <p className="font-medium text-gray-800">{item.name}</p>
    <p className="text-gray-500 text-sm mt-1">{item.price}</p>
  </div>
  <div className="bg-gray-100 p-2 rounded-lg h-16 w-16 flex items-center justify-center">
    <img
      src={item.img}
      alt={item.name}
      className="h-12 w-12 object-contain"
    />
  </div>
</div>

                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Inquiry Banner - Enhanced Desktop Layout */}
      <motion.div 
        className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-lg flex flex-col lg:flex-row justify-between gap-8"
        variants={fadeIn}
      >
        <div className="lg:w-1/2">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            An easy way to send requests to all suppliers
          </h3>
          <p className="text-blue-100 text-lg max-w-lg">
            Simplify your sourcing process with our platform that connects you with verified suppliers worldwide.
          </p>
        </div>
        <motion.div 
          className="lg:w-2/5 bg-white text-black p-6 rounded-2xl shadow-xl"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h4 className="font-bold text-lg mb-4 text-gray-800">Send quote to suppliers</h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="What item you need?"
              className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              rows="3"
              placeholder="Type more details"
              className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Quantity"
                className="w-2/3 border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="w-1/3 border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Pcs</option>
                <option>Kg</option>
                <option>Liters</option>
              </select>
            </div>
            <motion.button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Inquiry
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Recommended Items - Enhanced Desktop Layout */}
      <motion.div 
        className="mt-12"
        variants={fadeIn}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl md:text-2xl text-gray-800">Recommended items</h2>
          <button className="text-blue-600 font-medium flex items-center hover:underline">
            View all
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={staggerCards}
          initial="hidden"
          animate="visible"
        >
          {recommendedItems.map((item) => (
            <motion.div 
  key={item.id} 
  className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition-all"
  onClick={handleClick}
  variants={cardAnimation}
  whileHover={{ 
    y: -8,
    boxShadow: "0px 15px 30px rgba(0,0,0,0.12)"
  }}
>
  <div className="bg-gray-100 rounded-xl h-36 flex items-center justify-center mb-3">
    <img 
      src={item.img} 
      alt={`Item ${item.id}`} 
      className="h-28 w-28 object-contain" 
    />
  </div>
  <p className="font-bold text-gray-800">{item.price}</p>
  <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
</motion.div>

          ))}
        </motion.div>
      </motion.div>

      {/* Extra Services - Enhanced Desktop Layout */}
      <motion.div 
        className="mt-14"
        variants={fadeIn}
      >
        <h2 className="font-bold text-2xl md:text-3xl text-center mb-12">Our extra services</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerCards}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-xl transition-all"
              onClick={handleClick}
              variants={cardAnimation}
              whileHover={{ 
                y: -10,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.15)"
              }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.img} 
                  alt={service.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800">{service.name}</h3>
                <button className="mt-3 text-blue-600 font-medium flex items-center hover:underline">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Suppliers by Region - Enhanced Desktop Layout */}
      <motion.div 
        className="mt-14 hidden lg:block"
        variants={fadeIn}
      >
        <h2 className="font-bold text-2xl md:text-3xl text-center mb-10">Suppliers by Region</h2>
        <motion.div 
          className="grid grid-cols-5 gap-6"
          variants={staggerCards}
          initial="hidden"
          animate="visible"
        >
          {regions.map((region, i) => (
            <motion.div 
              key={i} 
              className="bg-white rounded-xl shadow p-4 flex items-center hover:shadow-lg transition-all"
              variants={cardAnimation}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex-shrink-0">
                <img
                  src={region.flag}
                  alt={`${region.name} flag`}
                  className="w-12 h-9 rounded shadow"
                />
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-800">{region.name}</p>
                <p className="text-gray-500 text-sm">{region.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Newsletter Subscription - Enhanced Desktop Layout */}
      <motion.div 
        className="mt-14 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 md:p-12 rounded-2xl shadow-xl text-center"
        variants={fadeIn}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="font-bold text-2xl md:text-3xl mb-3">Subscribe to our newsletter</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Get daily updates on upcoming offers from suppliers all over the world. Stay informed with the latest deals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow border border-gray-600 bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
          />
          <motion.button 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;



















