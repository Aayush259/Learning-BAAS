import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../../app/services/authService.js';
import { login } from '../../app/store/features/authSlice.js';
import LoginIcon from '@mui/icons-material/Login';
import { Button, Input, Loader } from '../index.js';

export default function SignUp() {

    // Navigate and dispatch functions.
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State to track error and loading.
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Getting register and handleSubmit function from useForm.
    const { register, handleSubmit } = useForm();

    // Function to handle signup.
    const handleSignUp = async (data) => {
        // Set loading true and error null.
        setLoading(true);
        setError(null);

        try {
            // Try to create a new user account.
            const userData = await authService.createAccount(data);

            // If account created, the get current user and update store.
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login);

                // Navigate to home page.
                navigate('/home');
            };
        } catch (error) {
            setError(error.message);
        }
        // Set loading false.
        setLoading(false);
    };

    return loading ? <Loader /> : (
        <div
            className="min-h-[80vh] w-screen mx-auto my-4 flex items-center justify-center"
        >
            <div className="bg-[#cbd5e11a] p-4 mx-auto w-[600px] max-w-[90vw] rounded-xl">
                <h2 className="text-xl font-semibold flex items-center justify-center w-fit gap-2">
                    <LoginIcon />
                    Sign Up
                </h2>

                <form
                    className="mt-7 w-fit mx-auto"
                    onSubmit={handleSubmit(handleSignUp)}
                >

                    {
                        error && <p className="text-red-500 my-2">
                            {error}
                        </p>
                    }

                    <Input
                        label="Name:"
                        placeholder="Enter your name"
                        {...register('name', {
                            required: true,
                        })}
                    />

                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        {...register('email', {
                            required: true,
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Must be a valid email"
                        })}
                    />

                    <Input
                        label="Password:"
                        placeholder="Create password"
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 8,
                        })}
                    />

                    <Button
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>

                <p className="flex gap-1 w-fit mx-auto my-5">
                    Already have an account?
                    <Link
                        to='/login'
                        className="text-sky-400 hover:underline underline-offset-4"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};
