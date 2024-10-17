import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../recoil/atoms';
import { useState } from 'react';

function Navbar() {
    // Use Recoil's useRecoilValue to read the authentication state
    const { isLoggedIn, user } = useRecoilValue(authState); // Now reading 'user' from Recoil state

    // Use Recoil's useSetRecoilState to update the authentication state
    const setAuthState = useSetRecoilState(authState);

    const [isProfileOpen, setIsProfileOpen] = useState(false); // State for the profile toggle

    const navigate = useNavigate();

    const handleSignOut = () => {
        // Close the profile menu when signing out
        setIsProfileOpen(false);

        // Update the isLoggedIn state to false
        setAuthState((prevState) => ({
            ...prevState,
            isLoggedIn: false,
            user: null,
        }));

        localStorage.clear();
        navigate('/');
    };

    const handleClick = () => {
        navigate('/');
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen); // Toggle profile menu state
    };

    const closeProfileMenu = () => {
        setIsProfileOpen(false); // Close profile menu
    };

    return (
        <nav className="bg-gray-800 fixed w-full z-10 top-0 shadow-lg">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="text-white text-2xl font-bold flex items-center cursor-pointer" onClick={handleClick}>
                    <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7h.01M12 7h.01M8 7h.01M21 12h-6a2 2 0 00-2-2H7a2 2 0 00-2 2H2m5 0a2 2 0 002-2h6a2 2 0 002 2h6M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6m-8 10v-4m-4 4v-4m8 4v-4m4 4v-4M3 5h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z"></path>
                    </svg>
                    Campus Social
                </div>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            {/* Profile Icon with User's Name */}
                            <div className="relative">
                                <button onClick={toggleProfileMenu} className="flex items-center text-white hover:text-gray-300">
                                    {/* Profile Icon (Man silhouette) */}
                                    <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
                                    </svg>
                                    {/* Show the user's name next to the profile icon */}
                                    <span className="text-white">{user?.name}</span> {/* Display the user's name */}
                                </button>

                                {/* Toggle Menu */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2 z-20">
                                        {/* Red Cross Icon to Close */}
                                        <div className="flex justify-end">
                                            <button onClick={closeProfileMenu} className="text-red-600 hover:text-red-800 px-2 py-1">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/SignUp" className="text-white hover:text-gray-300">
                                Sign Up
                            </Link>
                            <Link to="/login" className="text-white hover:text-gray-300">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
