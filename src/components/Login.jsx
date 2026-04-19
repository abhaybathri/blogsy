import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from "react";
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { Input, Button } from './index'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin({ $id: userData.$id, name: userData.name, email: userData.email }))
                navigate('/')
            }
        } catch (err) {
            setError(err.message || "Login failed")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="w-full max-w-md rounded-2xl p-8 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Welcome back</h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium underline underline-offset-2" style={{ color: 'var(--text-primary)' }}>
                        Sign up
                    </Link>
                </p>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="space-y-4">
                    <Input
                        label="Email"
                        placeholder="you@example.com"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: { matchPatern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Invalid email" }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" className="w-full mt-2">Sign in</Button>
                </form>
            </div>
        </div>
    )
}
export default Login;
