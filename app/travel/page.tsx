'use client'
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLocationArrow, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const Travel_Detail = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handlePost = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/ai", {
        source,
        destination,
        budget,
      });

      if (res?.data?.travel) {
        console.log(res.data.travel);

        localStorage.setItem("travel_data", JSON.stringify(res.data?.travel));
        router.push("/travel/show");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-[80vh] bg-gradient-to-b from-lime-50 to-gray-100 flex justify-center items-center px-6 py-16">
      <div className="bg-white/70 backdrop-blur-xl border border-lime-200 rounded-3xl shadow-xl p-12 max-w-3xl w-full">

        <h1 className="text-5xl font-extrabold text-center text-lime-700 mb-4 font-mono tracking-wide">
          Travel Guidance
        </h1>

        <p className="text-center text-gray-600 mb-10 text-lg">
          Enter your details and get AI-powered travel recommendations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Source */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-lime-600" /> Current Location
            </label>
            <div className="bg-white/50 backdrop-blur-lg rounded-xl px-4 py-3 shadow-md border border-gray-200 hover:border-lime-400">
              <input
                type="text"
                placeholder="Enter city"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Destination */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
              <FaLocationArrow className="text-lime-600" /> Destination
            </label>
            <div className="bg-white/50 backdrop-blur-lg rounded-xl px-4 py-3 shadow-md border border-gray-200 hover:border-lime-400">
              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
              <FaRupeeSign className="text-lime-600" /> Budget
            </label>
            <div className="bg-white/50 backdrop-blur-lg rounded-xl px-4 py-3 shadow-md border border-gray-200 hover:border-lime-400">
              <input
                type="number"
                placeholder="₹ Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>

        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={handlePost}
            className="px-10 py-4 text-lg font-semibold bg-lime-600 text-white rounded-full shadow-lg hover:bg-lime-700 hover:shadow-xl transition-all tracking-wide">
            Explore Travel Options
          </button>
        </div>

      </div>
    </div>
  );
};

export default Travel_Detail;
