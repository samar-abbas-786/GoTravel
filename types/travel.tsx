type TravelOption = {
    mode: string;
    travel_cost: number;
    places_to_visit: {
        name: string;
        entry_fee: number;
        description: string;
    }[];
    hotels: {
        name: string;
        price_per_night: number;
    }[];
    food_options: {
        type: string;
        average_cost: number;
    }[];
    itinerary: {
        day: number;
        activities: string[];
    }[];
    total_estimated_cost: number;
    budget_match: string;
};

type TravelData = {
    source: string;
    destination: string;
    budget: number;
    travel_options: TravelOption[];
};
