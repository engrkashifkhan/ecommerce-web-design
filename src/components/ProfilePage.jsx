import React, { useState } from "react";
import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import * as Yup from "yup";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=3");
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Show custom notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
        showNotification("Profile photo updated successfully!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  // Formik setup for profile information
  const profileFormik = useFormik({
    initialValues: {
      name: "Angela Zafirovska",
      email: "angela@example.com",
      location: "New York, USA",
      bio: "Digital designer passionate about creating beautiful user experiences",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      location: Yup.string(),
      bio: Yup.string().max(200, "Bio must be 200 characters or less"),
    }),
    onSubmit: (values) => {
      showNotification("Profile information updated successfully!", "success");
    },
  });

  // Formik setup for password change
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .notOneOf(
          [Yup.ref("currentPassword")],
          "New password must be different"
        )
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      showNotification("Password changed successfully!", "success");
      passwordFormik.resetForm();
    },
  });

  const tabs = ["Profile", "Password"];

  // Notification animation variants
  const notificationVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex bg-pink-50 font-sans"
    >
      {/* Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-[100] ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {notification.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md">
        <div className="flex flex-col items-center">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={avatar}
              alt="Profile"
            />
            <div className="text-xs mt-2 text-blue-500 hover:text-blue-700">
              Change Photo
            </div>
          </label>
          <h2 className="mt-4 font-semibold text-lg text-gray-800">
            {profileFormik.values.name}
          </h2>
          <p className="text-sm text-gray-500">@angelzaff</p>
        </div>

        <div className="mt-10 space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block text-left w-full px-4 py-2 rounded ${
                activeTab === tab
                  ? "bg-pink-100 text-pink-600 font-medium"
                  : "text-gray-700 hover:text-pink-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 bg-white p-10">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{activeTab}</h2>
        </div>

        {activeTab === "Profile" && (
          <form onSubmit={profileFormik.handleSubmit} className="space-y-6">
            {[
              { name: "name", label: "Name" },
              { name: "email", label: "Email" },
              { name: "location", label: "Location" },
            ].map(({ name, label }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="text-sm text-gray-600 font-medium block"
                >
                  {label.toUpperCase()}
                </label>
                <input
                  id={name}
                  name={name}
                  type="text"
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  value={profileFormik.values[name]}
                  className={`w-full border ${
                    profileFormik.touched[name] && profileFormik.errors[name]
                      ? "border-red-500"
                      : "border-gray-300"
                  } mt-1 p-2 rounded focus:outline-none focus:border-pink-500`}
                />
                {profileFormik.touched[name] && profileFormik.errors[name] && (
                  <div className="text-red-500 text-xs mt-1">
                    {profileFormik.errors[name]}
                  </div>
                )}
              </div>
            ))}

            <div>
              <label className="text-sm text-gray-600 font-medium block">
                BIO
              </label>
              <textarea
                name="bio"
                maxLength={200}
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
                value={profileFormik.values.bio}
                placeholder="Maximum 200 characters"
                className={`w-full border ${
                  profileFormik.touched.bio && profileFormik.errors.bio
                    ? "border-red-500"
                    : "border-gray-300"
                } mt-1 p-2 rounded focus:outline-none focus:border-pink-500`}
              />
              <div className="flex justify-between">
                {profileFormik.touched.bio && profileFormik.errors.bio && (
                  <div className="text-red-500 text-xs">
                    {profileFormik.errors.bio}
                  </div>
                )}
                <div className="text-xs text-gray-500 ml-auto">
                  {profileFormik.values.bio.length}/200
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </form>
        )}

        {activeTab === "Password" && (
          <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
            {[
              {
                name: "currentPassword",
                label: "Current Password",
                type: showPassword ? "text" : "password",
              },
              {
                name: "newPassword",
                label: "New Password",
                type: showPassword ? "text" : "password",
              },
              {
                name: "confirmPassword",
                label: "Confirm Password",
                type: showPassword ? "text" : "password",
              },
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="text-sm text-gray-600 font-medium block"
                >
                  {label.toUpperCase()}
                </label>
                <div className="relative">
                  <input
                    id={name}
                    name={name}
                    type={type}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values[name]}
                    className={`w-full border ${
                      passwordFormik.touched[name] &&
                      passwordFormik.errors[name]
                        ? "border-red-500"
                        : "border-gray-300"
                    } mt-1 p-2 rounded focus:outline-none focus:border-pink-500`}
                  />
                  {name === "currentPassword" && (
                    <motion.button
                      type="button"
                      className="absolute right-3 top-3 text-xs text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </motion.button>
                  )}
                </div>
                {passwordFormik.touched[name] &&
                  passwordFormik.errors[name] && (
                    <div className="text-red-500 text-xs mt-1">
                      {passwordFormik.errors[name]}
                    </div>
                  )}
              </div>
            ))}

            <motion.button
              type="submit"
              className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change Password
            </motion.button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;
