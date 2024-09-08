import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div
            className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center"
        >
            <section className="flex-grow flex items-center justify-center text-white">
                <div className="text-center px-4 py-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to <span className="text-yellow-300">
                            WriteWise
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8">
                        Discover insightful articles, tutorials, and more. Join our community of readers and writers!
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/signup"
                            className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition duration-300"
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/login"
                            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg border border-blue-600 hover:bg-blue-50 transition duration-300"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
