import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogInIcon, Menu, School2Icon, UsersIcon, X } from "lucide-react";
import { logout } from "../Store/slicer";
import { useState } from "react";
import { MdDashboard, MdOutlineLogin } from "react-icons/md";
import LoginModal from "./LoginModal";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Modal state

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="mr-4 text-gray-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold flex items-center">
                <School2Icon className="h-6 w-6 mr-2" />
                Venue
              </span>
            </Link>
          </div>

          {/* Desktop Buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              className="md:flex items-center gap-1 border px-2 md:px-3 py-1 md:py-1 bg-red-700 rounded-full hover:text-white"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="md:flex items-center gap-1 border px-2 md:px-3 py-1 md:py-1 bg-transparent rounded-full hover:text-white"
            >
              <MdOutlineLogin /> Login
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="bg-gray-900 border-t-2 pb-4">
            <div className="flex flex-col space-y-2 px-4 pt-2">
              <Link
                to="/"
                className="py-2 px-3 rounded flex gap-2 items-center hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MdDashboard /> Dashboard
              </Link>
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/all-users"
                      className="py-2 px-3 flex items-center gap-2 rounded hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UsersIcon /> All Members
                    </Link>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 flex gap-2 items-center px-3 rounded hover:bg-gray-700 text-left"
                >
                  <MdOutlineLogin /> Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </nav>
  );
}

export default Navbar;
