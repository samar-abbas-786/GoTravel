'use client'
import { LuBus } from "react-icons/lu";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const route = useRouter()
    const { user } = useAuth()
    return (
        <>
            <nav className="w-full h-20 bg-white/90 backdrop-blur-lg border-b border-gray-100 flex justify-between items-center px-6 md:px-12 sticky top-0 z-50">

                {/* Logo */}
                <a href="/" className="flex items-center space-x-3 group">
                    <div className="relative">
                        <LuBus className="text-4xl text-lime-600 group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute -inset-2 bg-lime-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Go<span className="text-lime-600">Travel</span>
                    </h1>
                </a>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex space-x-8 text-gray-700 text-lg font-medium">
                    <li>
                        <a href="/" className="hover:text-lime-600 cursor-pointer transition-colors duration-300 relative py-2">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-600 transition-all duration-300 hover:w-full"></span>
                        </a>
                    </li>
                    <li>
                        <a href="/travel/show" className="hover:text-lime-600 cursor-pointer transition-colors duration-300 relative py-2">
                            Recent Search
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-600 transition-all duration-300 hover:w-full"></span>
                        </a>
                    </li>
                    <li>
                        <a href="/history" className="hover:text-lime-600 cursor-pointer transition-colors duration-300 relative py-2">
                            Saved Plans
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-600 transition-all duration-300 hover:w-full"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-lime-600 cursor-pointer transition-colors duration-300 relative py-2">
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-600 transition-all duration-300 hover:w-full"></span>
                        </a>
                    </li>
                </ul>

                {/* Desktop CTA Button */}
                {user ?
                    <button onClick={() => route.push("/travel")} className="hidden md:block bg-gradient-to-r from-lime-500 to-lime-600 text-white px-6 py-2.5 rounded-full font-medium hover:from-lime-600 hover:to-lime-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                        Explore Now
                    </button> :
                    <button onClick={() => route.push("/Signup")} className="hidden md:block bg-gradient-to-r from-lime-500 to-lime-600 text-white px-6 py-2.5 rounded-full font-medium hover:from-lime-600 hover:to-lime-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                        Sign Up
                    </button>}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex flex-col space-y-1.5 w-6 h-6"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className={`w-full h-0.5 bg-gray-700 rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-full h-0.5 bg-gray-700 rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`w-full h-0.5 bg-gray-700 rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-20 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="px-6 py-4 space-y-4">
                    <a
                        href="/"
                        className="block py-3 text-lg font-medium text-gray-700 hover:text-lime-600 transition-colors border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </a>
                    <a
                        href="/travel/show"
                        className="block py-3 text-lg font-medium text-gray-700 hover:text-lime-600 transition-colors border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Recent Search
                    </a>
                    <a
                        href="/history"
                        className="block py-3 text-lg font-medium text-gray-700 hover:text-lime-600 transition-colors border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Saved Plans
                    </a>
                    <a
                        href="#contact"
                        className="block py-3 text-lg font-medium text-gray-700 hover:text-lime-600 transition-colors border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </a>
                    {user ?
                        <button onClick={() => route.push("/travel")} className="w-full bg-gradient-to-r from-lime-500 to-lime-600 text-white py-3 rounded-lg font-medium hover:from-lime-600 hover:to-lime-700 transition-all duration-300 shadow-lg mt-4">
                            Explore Now
                        </button> :
                        <button onClick={() => route.push("/Signup")} className="w-full bg-gradient-to-r from-lime-500 to-lime-600 text-white py-3 rounded-lg font-medium hover:from-lime-600 hover:to-lime-700 transition-all duration-300 shadow-lg mt-4">
                            SignUp
                        </button>
                    }
                </div>
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;