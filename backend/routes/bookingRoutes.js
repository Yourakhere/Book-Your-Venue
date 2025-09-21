<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const auth = require("../auth/authMiddleware");

router.post("/", auth.protect, bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.delete("/", auth.protect, bookingController.cancelBooking);
=======
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../auth/authMiddleware'); // Assuming you have one

router.post('/', auth.protect, bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.put('/:bookingId', auth.protect, bookingController.cancelBooking);
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528

module.exports = router;
