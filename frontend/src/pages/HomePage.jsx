import { useState } from "react";
import SearchComponent from "../Component/SearchComponent";
import VenuesList from "../Component/VenuesList";
import BookingModal from "../Component/BookingModal";
import LoginModal from "../Component/LoginModal"; // import your login modal
import { useSelector } from "react-redux";

const HomePage = () => {
  const [searchFilters, setSearchFilters] = useState({
    search: "",
    category: "all",
    availability: "all",
  });

  const { venues } = useSelector((state) => state.venue);
  const { user } = useSelector((state) => state.auth);

  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSearchChange = (filters) => setSearchFilters(filters);

  const handleBookVenue = (venue) => {
    setSelectedVenue(venue);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedVenue(null);
  };

  const handleGetStarted = () => {
    // Example: automatically filter venues on Get Started
    setSearchFilters({ ...searchFilters, category: "all", availability: "available" });
    if (!user) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Left Content */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Explore & Book Your{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                Ideal Venue
              </span>
            </h1>
            <p className="text-gray-100 text-lg md:text-xl mb-8">
              Search, filter, and book venues easily with our intuitive platform.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>

         
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchComponent onSearchChange={handleSearchChange} filters={searchFilters} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <VenuesList filters={searchFilters} onBookVenue={handleBookVenue} />
        </div>
      </main>

      {/* Modals */}
      {isBookingModalOpen && selectedVenue && (
        <BookingModal
          venue={selectedVenue}
          isOpen={isBookingModalOpen}
          onClose={handleCloseBooking}
        />
      )}

      {!user && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
