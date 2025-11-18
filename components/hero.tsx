'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Hero_Section = () => {
    const route = useRouter()
    const [idx, setIdx] = useState(0)
    const img = ['/travel.jpg', '/hero-2.jpg', '/hero-4.jpg']

    useEffect(() => {
        const interval = setInterval(() => {
            setIdx(prev => (prev + 1) % img.length)
        }, 7000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="relative flex w-full h-[90vh] justify-center items-center overflow-hidden">
            {img.map((image, index) => (
                <Image
                    key={image}
                    className={`object-cover absolute transition-opacity duration-1000 ${index === idx ? 'opacity-100' : 'opacity-0'
                        }`}
                    src={image}
                    fill
                    alt="Travel destination"
                    priority={index === 0}
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-0" />

            <div className="relative z-10 text-white text-center px-6 max-w-4xl">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-in">
                    Discover Your Next Adventure
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
                    Curated travel experiences tailored just for you
                </p>

              
                <button
                    onClick={() => route.push('/travel')}
                    className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-2xl"
                >
                    Start Your Journey →
                </button>

            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </div>
    )
}

export default Hero_Section