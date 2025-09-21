import { useSelector } from 'react-redux';
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import axiosInstance from '../Config/apiconfig';
import { useState } from 'react';
import Loader from './Loader';
import LoginModal from './LoginModal'; // ✅ Import your LoginModal

const VenueCard = ({ venue, onBookVenue, date, refreshVenues }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // ✅ modal state

=======
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../config/apiconfig';
import UnavailableSlotsModal from './UnavailableSlotsModal';
const VenueCard = ({ venue, onBookVenue, }) => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  console.log(venue)
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
  const getCategoryColor = (category) => {
    const colors = {
      lab: 'bg-blue-100 text-blue-800',
      complab: 'bg-gray-100 text-blue-800',
      classroom: 'bg-yellow-100 text-yellow-800',
      seminar: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

<<<<<<< HEAD
  // booking info coming from backend
  const bookingDetails = venue?.booking;
  const bookedBy = bookingDetails?.bookedBy;
  const bookedTime = bookingDetails?.timeSlot;

  const getAvailabilityStatus = () => {
    if (!bookingDetails) {
      return {
        text: 'Available',
        className: 'bg-green-600 text-white',
=======
  const getAvailabilityStatus = () => {
    if (venue.isAvailable) {
      return {
        text: 'Available',
        className: 'bg-success text-white',
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
        dotClass: 'bg-green-400'
      };
    }
    return {
<<<<<<< HEAD
      text: 'Booked',
      className: 'bg-red-600 text-white',
      dotClass: 'bg-red-400'
    };
  };

  const handleCancelBooking = async (venueName) => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/bookings`, {
        data: {
          day: venue.selectedDay,
          date: date,
          timeSlot: venue.availableTimes,
          venue: venueName
        }
      });
      console.log(res.data.message);
      refreshVenues();
    } catch (error) {
      console.error("Error canceling booking:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
=======
      text: 'Limited Availability',
      className: 'bg-warning text-white',
      dotClass: 'bg-yellow-400'
    };
  };

  const hadnleDeleteVenue = () => {

  }
  const hadnleUpdateVenue = () => {

  }
  const handleCancleBooking = async (id) => {
    console.log(id)
    try {
      //  const bookingId = req.params.id;
      const user = req.user.id
      const { date, timeSlot, venueId } = req.body;
      const res = await axiosInstance.get(`/bookings/${id}`, { date, timeSlot, venueId });
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching venues:", error);
    }


  }

>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528

  const status = getAvailabilityStatus();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
<<<<<<< HEAD
      {/* Venue Image + Status */}
=======
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
<<<<<<< HEAD

        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
=======
        {user && user.role == "superAdmin" && (
          <div className='absolute top-3 right-1   rounded-full text-xs font-medium'>

            <div className='flex gap-1 items-center'>
              <MdEdit onClick={hadnleUpdateVenue} className='h-5 w-5 bg-amber-50 ' />
              <MdDelete onClick={hadnleDeleteVenue} className='h-5 w-5 bg-amber-50' />

            </div>
          </div>
        )}

        <div className={`absolute top-3 left-3 bg-slate-500 px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${status.dotClass}`}></div>
            {status.text}
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-md font-semibold text-gray-900">{venue.name}</h2>

          {venue?.category && (
            <span className={`px-2 py-1 rounded-full text-xs font-small ${getCategoryColor(venue.category)}`}>
              {venue.category.toUpperCase()}
            </span>
          )}
        </div>

        <div className="text-sm flex justify-between text-gray-600 mb-2">
          <p>Capacity: {venue.capacity} 45</p>
          {venue.selectedDay && (
            <p>Day: <span className="capitalize font-medium">{venue.selectedDay}</span></p>
          )}
        </div>

        {/* Timeslot / Booking Info */}
        <div className="mb-2 flex justify-between h-5 lg:h-6">
          {!bookingDetails ? (
            <>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Available Time</h4>
              {venue?.availableTimes && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">
                  {venue.availableTimes}
                </span>
              )}
            </>
          ) : (
            <>
              <h4 className="text-sm font-medium text-gray-900">Unavailable Time</h4>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md">
                {bookedTime}
              </span>
            </>
          )}
        </div>

        {/* Action button */}
        <div className="flex flex-col text-sm md:flex-row w-full relative gap-1">
          {user ? (
            !bookingDetails ? (
              <button
                onClick={() => onBookVenue(venue)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-small py-2 px-4 rounded-md transition-colors"
              >
                Book Now
              </button>
            ) : (
              <button
                onClick={() => handleCancelBooking(venue?.booking?.venue)}
                className="w-full md:w-max h-12 bg-red-500 hover:bg-red-600 text-white px-4 rounded-md transition-colors"
              >
                Cancel Booking
              </button>
            )
          ) : (
            <button
              className="text-center w-full bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-md text-white text-sm transition-colors"
              onClick={() => setLoginModalOpen(true)} // ✅ open modal instead of redirect
            >
              Login required to book
            </button>
          )}

          
        </div>

        {/* BookedBy card or Login Modal */}
{bookedBy ? (
  <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200 rounded-lg p-3 text-center mt-2">
    <p className="text-xs text-gray-600 mb-1">Booked By</p>
    <p className="text-sm font-bold text-blue-800">
      {(bookedBy?.username || bookedBy?.name || "Unknown User").toUpperCase()}
    </p>
  </div>
) : (
  loginModalOpen && (
    <LoginModal
      isOpen={loginModalOpen}
      onClose={() => setLoginModalOpen(false)}
    />
  )
)}
=======
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-semibold text-gray-900">{venue.name}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-small ${getCategoryColor(venue.category)}`}>
            {venue.category}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>Capacity: {venue.capacity} people</p>
        </div>

        {/* Available Times */}
        <div className="mb-4 h-25">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Available Time</h4>
          <div className="flex flex-wrap gap-1">
            {venue?.availableTimes.map((time, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        {/* Unavailable Times */}

        <div className="mb-6 ">
      
          <UnavailableSlotsModal
            venue={venue}
            user={user}
            onCancel={(venue, slot) => handleCancleBooking(venue.id, slot)}
          />
          {/* <div className="flex flex-wrap">
            {venue.bookingDetials
              ?.slice(0, showAll ? venue.bookingDetials.length : 1) // show 2 or all
              .map((slot, index) => (
                <div
                  key={index}
                  className="flex gap-2 justify-between my-1 w-max"
                >
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md">
                    {slot?.timeSlot} : {slot?.bookedBy.bookingName}
                  </span>

                  {slot?.bookedBy?.bookingId === user?.id && (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-0 px-2 rounded-md"
                      onClick={() => handleCancleBooking(venue.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))}

            {venue.bookingDetials?.length > 1 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-500 text-xs ml-2"
              >
                {showAll ? "See Less" : "See More"}
              </button>
            )}
          </div> */}
        </div>

        <div className='flex w-full relative  gap-1 '>

          {user ? (
            <button
              onClick={() => onBookVenue(venue)}
              className=" bg-blue-500  hover:bg-blue-600 text-white font-small py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={venue.availableTimes.length === 0}
            >
              {venue.availableTimes.length === 0 ? 'No Times Available' : 'Book Venue'}
            </button>
          ) : (
            <button className="text-center w-full  bg-red-500 py-2 px-4 rounded-md text-gray-900 text-sm" onClick={(e) => navigate('/login')}>
              Login required to book

            </button>
          )}


        </div>
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528

      </div>
    </div>
  );
};

<<<<<<< HEAD
export default VenueCard;
=======
export default VenueCard;
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
