import Image from "next/image";

function About() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-white px-10 py-20">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                <div className="w-full h-[350px] relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                        src="/about.jpg"
                        alt="Travel Image"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="text-gray-800">
                    <h1 className="text-4xl font-bold mb-4 text-lime-600 font-mono">About GoTravel</h1>
                    <p className="text-lg leading-relaxed mb-4">
                        GoTravel is a simple and smart travel planning tool. Just enter your
                        destination and your budget, and our AI will suggest the best places
                        you can visit within that budget.
                    </p>

                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li>Choose your destination and set your budget.</li>
                        <li>AI recommends places, activities, and things to do.</li>
                        <li>Save your travel plan and view it offline anytime.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default About;





