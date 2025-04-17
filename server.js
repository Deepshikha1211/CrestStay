const express = require('express'); 
const path = require('path'); 
const morgan = require('morgan'); 
const helmet = require('helmet'); 
const cors = require('cors'); 
const compression = require('compression'); // Middleware for response compression
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const rateLimit = require('express-rate-limit'); // Middleware for rate limiting

const app = express();
const PORT = 8080;

// Import middlewares
const errorHandler = require('./middlewares/errorHandler'); 

// Set view engine for EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors({
  origin: 'http://localhost:8080', 
  methods: 'GET, POST, PUT, DELETE',
  credentials: true // Allows cookies & authentication headers
}));

// Configure Helmet for security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://unpkg.com", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:", "https://*"],
        frameSrc: ["'self'", "https://www.google.com/maps/embed"], 
      },
    },
  })
);
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const apiRoutes = require('./api/apiRoutes'); 
app.use('/api', apiRoutes); 

// Serve HTML files
app.get('/', (req, res) => {
  const rooms = [
    {
      name: "Deluxe Suite",
      description: "Well-appointed rooms designed for guests who desire more.",
      price: "$399",
      image: "room-1.jpg"
    },
    {
      name: "Family Suite",
      description: "Consists of multiple rooms and a common living area.",
      price: "$599",
      image: "room-2.jpg"
    },
    {
      name: "Luxury Penthouse",
      description: "Top-tier accommodations usually on the highest floors of a hotel.",
      price: "$799",
      image: "room-3.jpg"
    }
  ];
  
  res.render('home', { title: 'CrestStay', rooms: rooms });
});

app.get('/api/adminDashboard', (req, res) => {
  res.status(200).render('adminDashboard', { title: 'CrestStay | Admin Dashboard'});
});
app.get('/api/userDashboard', (req, res) => {
  res.status(200).render('userDashboard', { title: 'CrestStay | Guest Dashboard'});
});
app.get('/api/rooms', (req, res) => {
  res.status(200).render('rooms', { title: 'CrestStay | Rooms'});
});
app.get('/api/rooms2', (req, res) => {
  res.status(200).render('rooms2', { title: 'CrestStay | Rooms'});
});
app.get('/api/staff', (req, res) => {
  res.status(200).render('staff', { title: 'CrestStay | Staff'});
});
app.get('/api/contact', (req, res) => {
  res.status(200).render('contact', { title: 'CrestStay | Contact Us'});
});

app.get('/api/reservation', (req, res) => {
  res.status(200).render('reservation', { title: 'CrestStay | Reservation' });
});


// login route uses EJS
app.get('/api/login', (req, res) => {
  res.status(200).render('login', { 
    title: 'CrestStay | Login',
    message: '',
    username: '',
    role: 'user'
  });
});




// Registration page with dynamic EJS rendering
app.get('/api/register', (req, res) => {
  // Example dynamic data to pass into the EJS template
  const roles = ['user', 'admin'];  
  const selectedRole = 'user';  // Default selected role
  res.status(200).render('register', { 
    title: 'CrestStay | Register', 
    roles: roles, 
    message: '',
    selectedRole: selectedRole,  
  });
});


// 404 Middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Page Not Found' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
