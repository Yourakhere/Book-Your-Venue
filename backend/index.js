const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({quiet:true});

// Route imports
<<<<<<< HEAD
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const VacantRoute = require('./routes/vacantRoutes');
const UploadRoute= require('./routes/uploadRoutes');
=======
const venueRoutes = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
<<<<<<< HEAD
app.use('/api/bookings', bookingRoutes);
app.use('/api/users',userRoutes );
app.use("/api/vacent",VacantRoute)
app.use("/api/upload",UploadRoute)
=======
app.use('/api/venues', venueRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users',userRoutes );
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
// Root route
app.get('/', (req, res) => {
res.send('🎓 College Venue Booking API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});