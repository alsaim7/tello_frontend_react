import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import Avatar from 'boring-avatars';

export function Navbar({setCurrentUser, currentUser}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isLoggedIn = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        if (isLoggedIn) {
            const decodedToken = jwtDecode(isLoggedIn);
            const expTime = decodedToken.exp * 1000;
            const currentTime = Date.now();
            const timeOutDuration = expTime - currentTime;

            if (timeOutDuration > 0) {
                const timeout = setTimeout(() => {
                    localStorage.removeItem('token');
                    setCurrentUser(null);
                    navigate('/login');
                }, timeOutDuration);

                return () => clearTimeout(timeout);
            } else {
                // Token already expired
                localStorage.removeItem('token');
                setCurrentUser(null);
                navigate('/login');
            }
        }
    }, [isLoggedIn, navigate, setCurrentUser]);
    

    return (
        <nav className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="text-2xl font-bold tracking-tight"
                    onClick={() => setIsOpen(false)} // Close menu on logo click
                >
                    MyTello <span style={{color:'red'}}>.</span>
                </NavLink>

                {/* Hamburger Button for Mobile */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>

                {/* Navigation Links */}
                <div
                    className={`${isOpen ? 'block' : 'hidden'
                        } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent z-10`}
                >
                    <div className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `py-2 md:py-0 text-white hover:text-gray-300 ${isActive ? 'font-bold underline' : ''
                                }`
                            }
                            onClick={() => setIsOpen(false)} // Close menu on link click
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to={isLoggedIn ? '/create' : '/login'}
                            className={() => {
                                const activePath = isLoggedIn ? '/create' : '';
                                return `py-2 md:py-0 text-white hover:text-gray-300 ${location.pathname === activePath ? 'font-bold underline' : ''
                                    }`;
                            }}
                            onClick={() => setIsOpen(false)}
                        >
                            Create
                        </NavLink>
                        {isLoggedIn ? null : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `py-2 md:py-0 text-white hover:text-gray-300 ${isActive ? 'font-bold underline' : ''
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)} // Close menu on link click
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        `py-2 md:py-0 text-white hover:text-gray-300 ${isActive ? 'font-bold underline' : ''
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)} // Close menu on link click
                                >
                                    Register
                                </NavLink>
                            </>
                        )}


                        {isLoggedIn && (
                            <NavLink
                                to="/login"
                                // className={({ isActive }) =>
                                //     `py-2 md:py-0 text-white hover:text-gray-300 ${isActive ? 'font-bold underline' : ''
                                //     }`
                                // }
                                className={'py-2 md:py-0 text-white hover:text-gray-300'}
                                onClick={() => {
                                    localStorage.removeItem('token')
                                    setCurrentUser(null)
                                    navigate('/login') // or navigate using React Router
                                }} // Close menu on link click
                            >

                                Logout
                            </NavLink>
                        )}


                        {isLoggedIn && (

                            <NavLink
                                to={`/profile/${currentUser?.user_id}`}
                                // className={({ isActive }) =>
                                //     `py-2 md:py-0 text-white hover:text-gray-300 ${isActive ? 'font-bold underline' : ''
                                //     }`
                                // }
                                onClick={() => setIsOpen(false)} // Close menu on link click
                            >
                                <Avatar
                                    size={30}
                                    variant='beam'
                                    name={currentUser?.username}
                                    square={false}
                                    colors={
                                        [
                                            "#FF6B6B", // Soft Red
                                            "#6BCB77", // Fresh Green
                                            "#4D96FF", // Cool Blue
                                            "#FFD93D", // Bright Yellow
                                            "#FF6F91", // Pinkish Red
                                            "#845EC2", // Deep Purple
                                            "#00C9A7", // Teal
                                            "#F9A826", // Warm Orange
                                            "#2C73D2", // Royal Blue
                                            "#D65DB1", // Light Magenta
                                            "#0081CF", // Sky Blue
                                            "#FFC75F", // Sunflower
                                            "#B0A8B9", // Cool Gray
                                            "#FF9671", // Coral
                                            "#7C83FD"  // Indigo Blue
                                        ]
                                    }
                                />
                            </NavLink>

                        )}
                        

                    </div>
                </div>
            </div>
        </nav>
    );
}