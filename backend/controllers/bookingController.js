<<<<<<< HEAD
const { timeSlots } = require("../../frontend/src/utils/dayTimeSlot");
const Booking = require("../models/bookModel");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { venue, bookedBy, date, day, timeSlot, purpose } = req.body;

    if (!venue || !bookedBy || !date || !day || !timeSlot || !purpose) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize timeslot (take first if array)
    const slot = Array.isArray(timeSlot) ? timeSlot[0] : timeSlot;

    // Convert date string to Date object
    const bookingDate = new Date(date);

    // Concurrency check -> make sure no duplicate booking
    const conflict = await Booking.findOne({
      venue,
      date: bookingDate,
      timeSlot: slot,
      status: "Booked",
    });

    if (conflict) {
      return res.status(409).json({
        message: "This venue is already booked for the given date & time slot",
      });
    }

    // Save booking
    const newBooking = new Booking({
      venue,
      bookedBy: {
        userId: req.user ? req.user._id : null, // from auth middleware
        username: bookedBy, // from frontend
      },
      date: bookingDate,
      day,
      timeSlot: slot,
      purpose,
    });

    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1, timeSlot: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { day, timeSlot, date, venue } = req.body;
    // console.log(day, date, timeSlot, venue);

    if (!day || !date || !timeSlot || !venue) {
      return res.status(400).json({ message: "day, date, time and venue are required" });
    }

    const fdate = new Date(date);
    // console.log(fdate);

    const booking = await Booking.findOne({
      venue,
      timeSlot,
      day,
      date: fdate
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found with the matching details" });
    }

    // console.log(booking?.bookedBy.userId);
    // console.log(req?.user?._id);

    // Only user who booked OR admin can cancel
    if (
      req.user.role !== "admin" && // allow admin always
      booking.bookedBy.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to cancel" });
    }

    await booking.deleteOne();
    return res.json({ message: "Booking cancelled successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
=======
const Booking = require('../models/bookVenueModel');
const Venue = require('../models/venueModel');

// Create Booking (with conflict check)
exports.createBooking = async (req, res) => {
  try {
    const { venueId, date, timeSlot, purpose } = req.body;
    const userId = req.user._id; // From auth middleware
// console.log( venueId, date, timeSlot, purpose)
// console.log(userId)
    // Check if already booked for that time
    const existingBooking = await Booking.findOne({
      venue: venueId,
      date,
      timeSlot,
      status: 'Booked'
    });
    // console.log(existingBooking)

    if (existingBooking) {
      return res.status(409).json({ message: 'Venue already booked for this time slot.' });
    }

    // Create booking
    const booking = new Booking({
      venue: venueId,
      bookedBy: userId,
      date,
      timeSlot,
      purpose,
      status: 'Booked'
    });
    console.log(booking)

    await booking.save();
    res.status(201).json({ message: 'Booking successful.', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    console.log("d")
    const bookingId = req.params.id;
    const user= req.user.id   
   const { date,timeSlot, venueId } = req.body;
console.log(bookingId,user,date,timeSlot,venueId)

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });


const reqDate = new Date(date).toISOString().slice(0, 10); // "2025-07-28"
const bookingDate = new Date(booking.date).toISOString().slice(0, 10);
if (
  bookingDate === reqDate &&
  booking.timeSlot === timeSlot &&
  booking.venue.equals(venueId) &&
  booking.bookedBy.equals(user)
) {
  booking.status = 'Cancelled';
  await booking.save();
  return res.json({ message: 'Booking cancelled.', booking });
} 
 else {
  return res.status(403).json({ message: 'You are not authorized or booking details do not match.' });
}
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Bookings (optionally filtered)
exports.getBookings = async (req, res) => {
  try {
    const { date, venueId} = req.query;
    const filter = {};

    if (date) filter.date = date;
    if (venueId) filter.venue = venueId;

    const bookings = await Booking.find(filter)
      .populate('venue', 'name location')
      .populate('bookedBy', 'name email');

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
  }
};
