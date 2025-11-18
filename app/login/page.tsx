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
        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            const response = await axios.post('/api/login', { email, password })
            if (response.status != 200) {
                toast.error(response.data?.message || 'Someting went wrong')
                setEmail("")
                setPassword("")
            }
            else {
                toast.success(response?.data?.message || "Logged in successfully")
                localStorage.setItem("user", JSON.stringify(response?.data?.user))
                router.push('/')
                setEmail("")
                setPassword("")



            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
            setEmail("")
            setPassword("")
        }
    }
    return (
        <div>
            <h1>Login Page</h1>
            <ToastContainer />
        </div>
    )
}

export default Login
