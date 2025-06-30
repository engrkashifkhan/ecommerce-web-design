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
    { id: 12, price: "$17.60", description: "External SSD", img: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
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
  {
    name: "Arabic Emrites",
    flag: "https://flagcdn.com/w40/ae.png",
    description: "Shopname.ae",
  },
  {
    name: "Australia",
    flag: "https://flagcdn.com/w40/au.png",
    description: "Shopname.ae",
  },
  {
    name: "United State",
    flag: "https://flagcdn.com/w40/us.png",
    description: "Shopname.ae",
  },
  {
    name: "Russia",
    flag: "https://flagcdn.com/w40/ru.png",
    description: "Shopname.ae",
  },
  {
    name: "Italy",
    flag: "https://flagcdn.com/w40/it.png",
    description: "Shopname.ae",
  },
   {
    name: "Denmark",
    flag: "https://flagcdn.com/w40/fr.png",
    description: "Shopname.ae",
  },
  {
    name: "France",
    flag: "https://flagcdn.com/w40/fr.png",
    description: "Shopname.ae",
  },
   {
    name: "Arabic Emrites",
    flag: "https://flagcdn.com/w40/ae.png",
    description: "Shopname.ae",
  },
  {
    name: "China",
    flag: "https://flagcdn.com/w40/cn.png",
    description: "Shopname.ae",
  },
  {
    name: "Great British",
    flag: "https://flagcdn.com/w40/gb.png",
    description: "Shopname.ae",
  },







];
  // ... (your existing data arrays remain the same)

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

  const scaleUp = {
    hover: { scale: 1.03, transition: { duration: 0.3 } },
    tap: { scale: 0.98 }
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
      className="bg-gray-50 px-4 lg:px-10 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Top Section */}
      <div className="flex gap-4">
        {/* Sidebar */}
        <motion.div 
          className="w-1/5 bg-white p-4 rounded shadow text-sm space-y-2"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-gray-700">Categories</h3>
          {categories.map((cat, i) => (
            <motion.p 
              key={i} 
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={handleClick}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cat}
            </motion.p>
          ))}
        </motion.div>

        {/* Banner */}
        <motion.div 
          className="w-3/5 bg-white rounded shadow relative overflow-hidden"
          variants={fadeIn}
        >
          <motion.img
            src={Banner}
            alt="Banner"
            className="rounded w-full h-auto object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-9 bg-black/30 text-white">
            <motion.h4 
              className="text-3xl text-black font-semibold mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Latest trending
            </motion.h4>
            <motion.h1 
              className="text-4xl mb-4 font-bold text-black max-w-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Electronic items
            </motion.h1>
            <motion.button 
              onClick={handleClick} 
              className="bg-white hover:bg-blue-700 text-black font-semibold px-6 py-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Shop now
            </motion.button>
          </div>
        </motion.div>

        {/* Login Box */}
        <motion.div 
          className="w-1/5 bg-white p-4 rounded shadow space-y-4"
          variants={itemVariants}
        >
          <div className="bg-sky-100">
            <div className="flex gap-2 items-center p-2">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG path remains the same */}
              </svg>
              <p className="text-sm text-gray-700 pl-3">Hi, user <br /> let's get started</p>
            </div>
            <motion.button 
              className="mt-2 bg-blue-600 text-white w-[90%] ml-2 py-1 rounded"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join now
            </motion.button>
            <motion.button 
              className="mt-2 border border-blue-600 bg-white text-blue-600 w-[90%] ml-2 mb-2 center py-1 rounded"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Log in
            </motion.button>
          </div>
          <motion.div 
            className="bg-orange-600 p-2 text-lg text-orange-100 rounded"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Get US $10 off <br /> with a new <br /> supplier
          </motion.div>
          <motion.button 
            className="bg-sky-600 text-blue-100 text-lg w-full rounded"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send quotes with <br />supplier <br />preferences
          </motion.button>
        </motion.div>
      </div>

      {/* Deals & Offers */}
      <motion.div 
        className="mt-10 bg-white p-6 rounded shadow border border-gray-200"
        variants={fadeIn}
      >
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">Deals and offers</h2>
          <p className="text-sm text-gray-500">Hygiene equipments</p>
        </div>

        {/* Main content: Timer + Products */}
        <div className="flex gap-6 items-start">
          {/* Countdown Timer */}
          <motion.div 
            className="grid grid-cols-2 gap-2"
            variants={staggerCards}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: "Days", value: "04" },
              { label: "Hour", value: "13" },
              { label: "Min", value: "34" },
              { label: "Sec", value: "56" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-blue-900 text-white rounded px-4 py-2 text-center w-20"
                variants={cardAnimation}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-lg font-bold">{item.value}</div>
                <div className="text-xs">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Product Cards */}
          <motion.div 
            className="grid grid-cols-5 gap-6 flex-1"
            variants={staggerCards}
            initial="hidden"
            animate="visible"
          >
            {deals.map((item, i) => (
              <motion.div 
                key={i} 
                className="text-center border border-gray-200 p-2"
                onClick={handleClick}
                variants={cardAnimation}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="mx-auto h-24 object-contain"
                />
                <p className="text-sm text-gray-800 mt-2">{item.name}</p>
                <p className="text-red-500 text-sm font-medium mt-1">{item.discount}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Product Sections */}
      <div className="mt-10 space-y-8">
        {productSections.map((section, index) => (
          <motion.div
            key={index}
            className="grid grid-cols-1 lg:grid-cols-5 bg-white rounded shadow overflow-hidden"
            variants={itemVariants}
          >
            {/* Left Banner */}
            <motion.div
              className="lg:col-span-1 relative flex flex-col justify-between p-4 text-black"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">{section.title}</h3>
              </div>
              <motion.button 
                onClick={handleClick} 
                className="mt-4 bg-white text-gray-800 border border-gray-300 text-sm px-4 py-1 rounded hover:bg-gray-200 w-fit relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Source now
              </motion.button>
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0" />
            </motion.div>

            {/* Products Grid */}
            <motion.div 
              className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 p-4"
              variants={staggerCards}
              initial="hidden"
              animate="visible"
            >
              {section.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="text-center text-sm border rounded p-2 hover:shadow"
                  onClick={handleClick}
                  variants={cardAnimation}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
                  }}
                >
                  <div className="flex items-center justify-between py-2 h-full">
                    <div>
                      <p className="mt-2 text-gray-700 font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.price}</p>
                    </div>
                    <div>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="mx-auto h-16 w-16 object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Inquiry Banner */}
      <motion.div 
        className="mt-10 bg-blue-500 text-white p-6 rounded shadow flex justify-between"
        variants={fadeIn}
      >
        <div className="w-1/2">
          <h3 className="text-3xl font-semibold mb-2">
            An easy way to send <br /> requests to all suppliers
          </h3>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <motion.div 
          className="w-[45%] bg-white text-black p-4 rounded"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="mb-2 font-semibold text-gray-700">Send quote to suppliers</p>
          <input
            type="text"
            placeholder="What item you need?"
            className="w-full border p-2 rounded mb-2 text-sm"
          />
          <textarea
            rows="2"
            placeholder="Type more details"
            className="w-full border p-2 rounded mb-2 text-sm"
          ></textarea>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Quantity"
              className="w-2/3 border p-2 rounded text-sm"
            />
            <select className="w-1/3 border p-2 rounded text-sm">
              <option>Pcs</option>
              <option>Kg</option>
              <option>Liters</option>
            </select>
          </div>
          <motion.button 
            className="bg-blue-600 text-white py-2 px-4 rounded w-full text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Inquiry
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Recommended Items */}
      <motion.div 
        className="mt-10"
        variants={fadeIn}
      >
        <h2 className="font-semibold text-lg mb-4">Recommended items</h2>
        <motion.div 
          className="grid grid-cols-6 gap-4"
          variants={staggerCards}
          initial="hidden"
          animate="visible"
        >
          {recommendedItems.map((item) => (
            <motion.div 
              key={item.id} 
              className="bg-white p-4 rounded shadow text-center text-sm"
              onClick={handleClick}
              variants={cardAnimation}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              <img 
                src={item.img} 
                alt={`Item ${item.id}`} 
                className="mx-auto mb-2 h-44 w-44 object-contain" 
              />
              <p className="font-medium">{item.price}</p>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Extra Services */}
      <motion.div 
        className="mt-10"
        variants={fadeIn}
      >
        <h2 className="font-semibold text-2xl mb-10">Our extra services</h2>
        <motion.div 
          className="grid grid-cols-4 gap-4"
          variants={staggerCards}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              className="bg-white p-4 rounded shadow text-center text-sm"
              onClick={handleClick}
              variants={cardAnimation}
              whileHover={{ 
                y: -10,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              <img 
                src={service.img} 
                alt={service.name} 
                className="h-28 w-full object-cover rounded mb-2"
              />
              <p className="font-semibold text-lg">{service.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Suppliers by Region */}
      <motion.div 
        className="mt-10 hidden lg:block"
        variants={fadeIn}
      >
        <h2 className="font-semibold text-2xl mb-10">Suppliers by Region</h2>
        <motion.div 
          className="grid grid-cols-4 xl:grid-cols-6 gap-6 text-sm text-gray-600"
          variants={staggerCards}
          initial="hidden"
          animate="visible"
        >
          {regions.map((region, i) => (
            <motion.div 
              key={i} 
              className="flex items-center hover:text-blue-600 cursor-pointer"
              variants={cardAnimation}
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <img
                  src={region.flag}
                  alt={`${region.name} flag`}
                  className="w-12 h-10 rounded shadow mb-2"
                />
              </div>
              <div className="pl-3">
                <p className="font-medium">{region.name}</p>
                <p className="text-xs text-gray-500">{region.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Newsletter Subscription */}
      <motion.div 
        className="mt-10 bg-gray-300 p-6 rounded shadow text-center"
        variants={fadeIn}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <p className="text-gray-700 font-bold text-2xl mb-2">Subscribe on our newsletter</p>
        <p className="text-sm text-gray-500 mb-4">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>
        <div className="flex justify-center gap-2">
          <motion.input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-1/3"
            whileFocus={{ 
              scale: 1.02,
              boxShadow: "0 0 0 2px #3b82f6"
            }}
          />
          <motion.button 
            className="bg-blue-600 text-white px-4 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;