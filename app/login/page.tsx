'use client'
import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("")

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            const response = await axios.post('/api/login', { email, password })
            if (response.status != 200) {
                toast.error(response.data?.message || 'Someting went wrong')

            }
            else {
                toast.success(response?.data?.message || "Logged in successfully")
                localStorage.setItem("user", JSON.stringify(response?.data?.user))
                router.push('/')
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setEmail("")
            setPassword("")
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">Login</h1>

            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
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
                    Login
                </button>

                <p className="text-sm text-gray-500 text-center mt-2">
                    Don't have an account? <span className="text-lime-600 cursor-pointer" onClick={() => router.push("/signup")}>Sign Up</span>
                </p>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default Login;
