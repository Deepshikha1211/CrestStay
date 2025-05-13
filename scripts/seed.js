// scripts/seed.js
const mongoose = require('mongoose');
const Room = require('../models/Room');
const MenuItem = require('../models/MenuItem');
const News = require('../models/News');

mongoose.connect('mongodb://127.0.0.1:27017/creststay');

const seedDatabase = async () => {
  try {
    // Seed Rooms
    const rooms = [
      { name: "Deluxe Suite", description: "Well-appointed rooms...", price: "$399", image: "room-1.jpg" },
      { name: "Family Suite", description: "Multiple rooms...", price: "$599", image: "room-2.jpg" },
      { name: "Luxury Penthouse", description: "Top-tier accommodations...", price: "$799", image: "room-3.jpg" }
    ];
    await Room.insertMany(rooms);
    console.log('Rooms added');

    // Seed Menu Items
    const menuItems = [
      { name: "Fggs & Bacon", description: "It is a culinary innovation...", image: "menu-1.jpg" },
      { name: "Tea or Coffee", description: "A classic choice...", image: "menu-2.jpg" },
      { name: "Chia Oatmeal", description: "Our Chia Oatmeal is a wholesome...", image: "menu-3.jpg" },
      { name: "Fruit Parfait", description: "Our Fruit Parfait is a delightful...", image: "menu-4.jpg" },
      { name: "Marmalade Selection", description: "Our Marmalade Selection is a delectable...", image: "menu-5.jpg" },
      { name: "Cheese Plate", description: "Our cheese plate is a masterpiece...", image: "menu-6.jpg" }
    ];
    await MenuItem.insertMany(menuItems);
    console.log('Menu items added');

    // Seed News
    const newsItems = [
      {
        date: "25th March 2022",
        author: "Emily",
        title: "Exploring Local Culinary Gems: A Foodie's Guide.",
        description: "Join Emily as she takes you on a gastronomic adventure...",
        image: "news-1.jpg"
      },
      {
        date: "15th June 2022",
        author: "David",
        title: "Balancing Mind, Body, and Soul at Our Hotel.",
        description: "Discover holistic spa treatments, fitness facilities...",
        image: "news-2.jpg"
      },
      {
        date: "08th August 2022",
        author: "Sarah",
        title: "Exploring Outdoor Activities Near Our Hotel.",
        description: "From hiking and biking trails to water sports...",
        image: "news-3.jpg"
      }
    ];
    await News.insertMany(newsItems);
    console.log('News items added');

  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedDatabase();
