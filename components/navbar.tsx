import { LuBus } from "react-icons/lu";

const Navbar = () => {
    return (
        <nav className="w-full h-20 bg-white/80 backdrop-blur-md shadow-md flex justify-between items-center px-8">

            <div className="flex items-center space-x-3">
                <LuBus className="text-4xl text-lime-600" />
                <h1 className="text-3xl font-bold font-mono text-gray-800">
                    GoTravel
                </h1>
            </div>

            <ul className="hidden md:flex space-x-8 text-gray-700 text-lg font-medium">
                <a href="/" className="hover:text-lime-600 cursor-pointer transition">Home</a>
                <a href="/travel/show" className="hover:text-lime-600 cursor-pointer transition">Recent Search</a>
                <a href="/history" className="hover:text-lime-600 cursor-pointer transition">Saved Plans</a>
                <a href="#contact" className="hover:text-lime-600 cursor-pointer transition">Contact</a>
            </ul>

            {/* Button */}
            <button className="hidden md:block bg-lime-600 text-white px-5 py-2 rounded-full font-medium hover:bg-lime-700 transition">
                Explore
            </button>

        </nav>
    );
};

export default Navbar;
