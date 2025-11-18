'use client'

import { useEffect, useState } from "react";

const TravelDetailShow = () => {
    const [data, setData] = useState<any>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("travel_data");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && Array.isArray(parsed.travel_options)) {
                    setData(parsed);
                }
            } catch (e) {
                console.error("Error parsing travel data", e);
            }
        }
    }, []);

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🧭</span>
                    </div>
                    <p className="text-gray-600">No travel plans found</p>
                </div>
            </div>
        );
    }

    const travelOptions = data.travel_options;

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Travel Plans</h1>
                    <p className="text-gray-600">Choose from your personalized options</p>
                </div>

                {/* Travel Options */}
                <div className="space-y-4">
                    {travelOptions.map((option: any, idx: number) => {
                        const isOpen = openIndex === idx;
                        const isWithinBudget = option.budget_match === "within budget";

                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                            >
                                {/* Header */}
                                <div
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                {option.mode}
                                            </h2>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    isWithinBudget 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {isWithinBudget ? 'Within Budget' : 'Over Budget'}
                                                </span>
                                                <span className="text-gray-600">
                                                    ₹{option.total_estimated_cost}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-gray-500 text-lg">
                                            {isOpen ? "▲" : "▼"}
                                        </span>
                                    </div>
                                </div>

                                {/* Details */}
                                {isOpen && (
                                    <div className="p-6 border-t border-gray-200 space-y-6">
                                        {/* Cost Summary */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-gray-600">Travel Cost</p>
                                                <p className="text-lg font-semibold text-blue-700">₹{option.travel_cost}</p>
                                            </div>
                                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                                <p className="text-sm text-gray-600">Total Cost</p>
                                                <p className="text-lg font-semibold text-green-700">₹{option.total_estimated_cost}</p>
                                            </div>
                                        </div>

                                        {/* Places */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Places to Visit</h3>
                                            <div className="space-y-2">
                                                {option.places_to_visit.map((place: any, i: number) => (
                                                    <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                        <div>
                                                            <p className="font-medium text-gray-800">{place.name}</p>
                                                            <p className="text-sm text-gray-600">{place.description}</p>
                                                        </div>
                                                        <span className="text-gray-700">₹{place.entry_fee}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Hotels */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Hotels</h3>
                                            <div className="space-y-2">
                                                {option.hotels.map((hotel: any, i: number) => (
                                                    <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                        <p className="font-medium text-gray-800">{hotel.name}</p>
                                                        <span className="text-gray-700">₹{hotel.price_per_night}/night</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Food */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Food Options</h3>
                                            <div className="space-y-2">
                                                {option.food_options.map((food: any, i: number) => (
                                                    <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                        <p className="font-medium text-gray-800">{food.type}</p>
                                                        <span className="text-gray-700">₹{food.average_cost}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Itinerary */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Daily Plan</h3>
                                            <div className="space-y-3">
                                                {option.itinerary.map((plan: any, i: number) => (
                                                    <div key={i} className="p-3 bg-gray-50 rounded-lg">
                                                        <h4 className="font-semibold text-gray-800 mb-2">Day {plan.day}</h4>
                                                        <ul className="space-y-1">
                                                            {plan.activities.map((activity: string, j: number) => (
                                                                <li key={j} className="text-sm text-gray-700">• {activity}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-4">
                                            <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                                                Save Plan
                                            </button>
                                            <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TravelDetailShow;