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
            <div className="w-full flex justify-center items-center h-[60vh]">
                <p className="text-lg text-gray-500">No travel data found</p>
            </div>
        );
    }

    const travelOptions = data.travel_options;

    return (
        <div className="px-6 md:px-16 py-10">

            <h1 className="text-3xl font-bold text-lime-700 mb-8 tracking-tight">
                Travel Plan Options
            </h1>

            <div className="space-y-5">
                {travelOptions.map((option: any, idx: number) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md border border-lime-100"
                        >
                            {/* HEADER CARD */}
                            <div
                                onClick={() =>
                                    setOpenIndex(isOpen ? null : idx)
                                }
                                className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-lime-50 rounded-2xl transition"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold text-lime-700">
                                        {option.mode}
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        Estimated cost: ₹{option.total_estimated_cost}
                                    </p>
                                </div>

                                <span className="text-lime-700 text-lg">
                                    {isOpen ? "▲" : "▼"}
                                </span>
                            </div>

                            {/* COLLAPSIBLE DETAILS */}
                            {isOpen && (
                                <div className="px-6 pb-6 space-y-4 text-[15px]">

                                    {/* Travel Cost */}
                                    <p className="text-gray-700">
                                        <b>Travel Cost:</b> ₹{option.travel_cost}
                                    </p>

                                    {/* Places */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Places to Visit
                                        </h3>
                                        <ul className="list-disc ml-6 mt-2 space-y-1">
                                            {option.places_to_visit.map((p: any, i: number) => (
                                                <li key={i}>
                                                    <b>{p.name}</b> — ₹{p.entry_fee}
                                                    <p className="text-gray-600 text-sm">
                                                        {p.description}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Hotels */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Hotels
                                        </h3>
                                        <ul className="list-disc ml-6 mt-2 space-y-1">
                                            {option.hotels.map((h: any, i: number) => (
                                                <li key={i}>
                                                    <b>{h.name}</b> — ₹{h.price_per_night}/night
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Food */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Food Options
                                        </h3>
                                        <ul className="list-disc ml-6 mt-2 space-y-1">
                                            {option.food_options.map((f: any, i: number) => (
                                                <li key={i}>
                                                    {f.type} — ₹{f.average_cost}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Itinerary */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Itinerary
                                        </h3>
                                        <div className="ml-6 mt-2 space-y-3">
                                            {option.itinerary.map((plan: any, i: number) => (
                                                <div
                                                    key={i}
                                                    className="bg-gray-50 border border-gray-200 p-4 rounded-xl"
                                                >
                                                    <b className="text-lime-700 text-[15px]">
                                                        Day {plan.day}
                                                    </b>
                                                    <ul className="list-disc ml-6 mt-1 text-[14px]">
                                                        {plan.activities.map((a: any, j: number) => (
                                                            <li key={j}>{a}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <p className="text-[16px] font-semibold text-gray-800">
                                        Total Estimated Cost: ₹{option.total_estimated_cost}
                                    </p>

                                    <p
                                        className={`font-semibold ${option.budget_match === "within budget"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}
                                    >
                                        Budget: {option.budget_match}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default TravelDetailShow;
