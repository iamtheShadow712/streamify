import { useState } from 'react';
import { ShipWheelIcon } from "lucide-react";
import FormInput from '../components/FormInput';
import { Link } from 'react-router';
import videoCall from "../assets/video-call.png";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';
import useApp from '../store/useApp';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const queryClient = useQueryClient()
    const { theme } = useApp();

    const { mutate: loginMutation, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
            toast.success("Login Success");
        }
    })
    const handleChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation(loginData);
        console.log(error)
    }
    return (
        <div className='min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme={theme}>
            <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
                {/* Register form */}
                <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
                    {/* Logo */}
                    <div className='mb-4 flex items-center justify-start gap-2'>
                        <ShipWheelIcon className="size-9 text-primary" />
                        <span className='text-3xl md:text-5xl font-bold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider'>
                            Streamify
                        </span>
                    </div>
                    {/* ERROR MESSAGE IF ANY */}
                    {error && (
                        <div className='alert alert-error mb-4'>
                            <span>{error.response?.data?.message}</span>
                        </div>
                    )}
                    <div className='w-full'>
                        <form onSubmit={handleLogin}>
                            <div className='space-y-4'>
                                <div>
                                    <h2 className='text-xl font-semibold'>Login to your Account</h2>
                                    <p className='text-sm opacity-70'>Join Streamify and start your language learning adventure</p>
                                </div>
                                <FormInput
                                    name="email"
                                    label="Email"
                                    placeholder="johndoe@gmail.com"
                                    onChange={handleChange}
                                    required={true}
                                    value={loginData.email}
                                    type="email"
                                />
                                <FormInput
                                    name="password"
                                    label="Password"
                                    placeholder="******"
                                    onChange={handleChange}
                                    required={true}
                                    value={loginData.password}
                                    type="password"
                                />
                            </div>
                            <button className='btn btn-primary w-full mt-2' type='submit'>
                                {isPending ? (
                                    <>
                                        <span className='loading loading-spinner loading-xs'></span>
                                        "Signing In"
                                    </>
                                ) : "Login"}
                            </button>
                            <div className='text-center mt-4'>
                                <p className='text-sm'>
                                    Don't have an account?&nbsp;
                                    <Link to="/auth/register" className='text-primary hover:underline'>Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Image screen */}
                <div className='hidden lg:w-1/2 lg:flex bg-primary/10 items-center justify-center'>
                    <div className='max-w-md p-8'>
                        <div className='relative aspect-square max-w-sm mx-auto'>
                            <img src={videoCall} alt="Language Connection Illustration" className='w-full h-full' />
                        </div>
                        <div className='text-center space-y-3 mt-6'>
                            <h2>Connect with language partners worldwide</h2>
                            <div className='flex gap-2 flex-wrap justify-center'>
                                {["practice conversations", "make friends", "improve language skill together"].map((item, index) => (
                                    <span className='px-3 py-1 rounded-full bg-green-600 text-xs w-fit capitalize text-white/70 font-semibold' key={index}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage