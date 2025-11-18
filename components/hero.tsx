'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
const Hero_Section = () => {
    const route = useRouter()
    return (
        <div className=" relative flex w-full h-[80vh] justify-center items-center">

            <Image
                className="object-cover absolute brightness-40"
                src="/travel.jpg"
                fill
                alt="Picture of the author"
            />
            <div className="relative z-10 text-white text-center">
                <h1 className="text-5xl font-bold">Explore the World</h1>
                <p className="text-lg mt-4">Find your next destination with us</p>
                <div className="btn">
                    <button onClick={() => route.push('/travel')} className="bg-white/20 mt-3 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold border border-white/30 hover:bg-white/30 transition">
                        Travel Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero_Section
