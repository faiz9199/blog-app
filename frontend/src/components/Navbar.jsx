import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import DialogBox from "./DialogBox";

const Navbar = () => {
  const { loggedIn, user, logout } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUserClick = () => {
    setShowLogout(!showLogout);
  };

  const handleWriteClick = (e) => {
    if (!loggedIn) {
      e.preventDefault();
      setShowDialog(true);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center py-3 px-10 shadow-lg z-10 bg-white">
      <div>
        <h1 className="font-bold text-3xl">
          <Link to="/">Medium</Link>
        </h1>
      </div>
      <div className="ml-auto hidden md:flex">
        <ul className="flex gap-6 text-sm text-slate-600 font-semibold">
          <li>
            <a href="#">Our Story</a>
          </li>
          {loggedIn ? (
            <></>
          ) : (
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          )}
          <li>
            <Link to="/write" onClick={handleWriteClick}>
              Write
            </Link>
          </li>
          <li>
            <Link to="/blog">Blogs</Link>
          </li>
        </ul>
      </div>
      <div className="mx-4 relative hidden md:block">
        {loggedIn && user ? (
          <div className="relative">
            <h2
              className="px-4 py-2 cursor-pointer rounded-full bg-slate-400 text-lg"
              onClick={handleUserClick}
            >
              {user.name.charAt(0).toUpperCase()}
            </h2>
            {showLogout && (
              <button
                className="absolute top-10 left-0 mt-2 rounded-full bg-slate-500 text-white text-sm p-2 font-semibold"
                onClick={logout}
              >
                Logout
              </button>
            )}
          </div>
        ) : (
          <button className="rounded-full bg-black text-white text-sm p-2 font-semibold">
            Get Started
          </button>
        )}
      </div>
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-3xl">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 w-full h-screen bg-white shadow-lg md:hidden">
          <ul className="flex flex-col mr-6 items-end gap-8 text-sm text-slate-600 font-semibold p-6">
            <li>
              <a href="#" onClick={toggleMobileMenu}>Our Story</a> {/* Close menu on click */}
            </li>
            {loggedIn ? (
              <></>
            ) : (
              <li>
                <Link to="/signin" onClick={toggleMobileMenu}>Sign In</Link> {/* Close menu on click */}
              </li>
            )}
            <li>
              <Link to="/write" onClick={(e) => { handleWriteClick(e); toggleMobileMenu(); }}>
                Write
              </Link> {/* Close menu on click */}
            </li>
            <li>
              <Link to="/blog" onClick={toggleMobileMenu}>Blogs</Link> {/* Close menu on click */}
            </li>
            {loggedIn && user ? (
              <li>
                <button
                  className="rounded-full bg-slate-500 text-white text-sm p-2 font-semibold"
                  onClick={() => { logout(); toggleMobileMenu(); }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <button className="rounded-full bg-black text-white text-sm p-2 font-semibold" onClick={toggleMobileMenu}>
                  Get Started
                </button> {/* Close menu on click */}
              </li>
            )}
          </ul>
        </div>
      )}
      <DialogBox show={showDialog} onClose={closeDialog} />
    </div>
  );
};

export default Navbar;
