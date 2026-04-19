import { useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) dispatch(login(userData))
            navigate("/")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="w-full max-w-md rounded-2xl p-8 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Create account</h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium underline underline-offset-2" style={{ color: 'var(--text-primary)' }}>
                        Sign in
                    </Link>
                </p>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="space-y-4">
                    <Input label="Full Name" placeholder="John Doe" {...register("name", { required: true })} />
                    <Input
                        label="Email"
                        placeholder="you@example.com"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: { matchPatern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Invalid email" }
                        })}
                    />
                    <Input label="Password" type="password" placeholder="••••••••" {...register("password", { required: true })} />
                    <Button type="submit" className="w-full mt-2">Create Account</Button>
                </form>
            </div>
        </div>
    )
}
export default Signup;
