'use client'
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios"
import { useState } from "react"
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const router = useRouter()
    const [name, setName] = useState<any>("")
    const [email, setEmail] = useState<any>("")
    const [password, setPassword] = useState<any>("")

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            const response = await axios.post('/api/signup', { name, email, password })
            console.log("status", response);

            if (response.status != 201) {
                toast.error(response.data?.message || "Error occured in handleSubmit");
                return;
            }
            else {
                localStorage.setItem("user", JSON.stringify(response.data?.user))
                toast.success(response.data?.message || "Registered")
                setEmail("")
                setName("")
                setPassword("")
                router.push('/login')
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong")
            setEmail("")
            setName("")
            setPassword("")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-lime-600 text-white py-2 rounded-md font-semibold hover:bg-lime-700 transition"
                >
                    Sign Up
                </button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default SignUp;