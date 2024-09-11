import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../../app/services/authService';
import { login } from '../../app/store/features/authSlice';
import LoginIcon from '@mui/icons-material/Login';
import { Button, Input, Loader } from '../index';

interface FormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export default function SignUp() {

    // Dispatch functions.
    const dispatch = useDispatch();

    // State to track error and loading.
    const [appwriteError, setAppwriteError] = useState<string | null>(null);

    // Getting register and handleSubmit function from useForm.
    const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm<FormData>();

    // Function to handle signup.
    const handleSignUp = async (data: FormData) => {

        try {
            // Try to create a new user account.
            const userData = await authService.createAccount(data);

            // If account created, the get current user and update store.
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login({ userData }));
            };
        } catch (error) {
            setAppwriteError((error as Error).message || 'An unexpected error occurred');
        }
    };

    return (
        <div
            className="min-h-[80vh] w-screen mx-auto my-4 flex items-center justify-center relative"
        >
            {isSubmitting && <Loader />}
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
                        appwriteError && <p className="text-red-500 my-2">
                            {appwriteError}
                        </p>
                    }

                    <Input
                        label="Name:"
                        placeholder="Enter your name"
                        error={errors.name}
                        {...register('name', {
                            required: "Name is required",
                        })}
                    />

                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        error={errors.email}
                        {...register('email', {
                            required: "Email is required",
                        })}
                    />

                    <Input
                        label="Password:"
                        placeholder="Create password"
                        type="password"
                        error={errors.password}
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "8 characters requried"
                            },
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
