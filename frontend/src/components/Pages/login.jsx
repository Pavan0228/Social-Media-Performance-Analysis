/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { MessageSquare, TrendingUp, Smartphone, ChevronRight, Mail, Lock } from "lucide-react"; // Importing necessary icons
import { useState } from "react"; // Importing useState for form handling

const Signup = () => {
    const FloatingMessage = ({ icon: Icon, color, className }) => (
        <div className={`absolute ${className} animate-bounce opacity-20`}>
            <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );

    const [email, setEmail] = useState(""); // State for email
    const [password, setPassword] = useState(""); // State for password
    const [confirmPassword, setConfirmPassword] = useState(""); // State for confirmPassword

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                <FloatingMessage
                    icon={MessageSquare}
                    color="text-pink-400"
                    className="top-0 -left-8 animate-[bounce_3s_ease-in-out_infinite]"
                />
                <FloatingMessage
                    icon={TrendingUp}
                    color="text-blue-400"
                    className="top-20 -right-8 animate-[bounce_3s_ease-in-out_infinite_0.5s]"
                />
                <FloatingMessage
                    icon={Smartphone}
                    color="text-yellow-400"
                    className="bottom-20 -left-8 animate-[bounce_3s_ease-in-out_infinite_1s]"
                />

                <div className="relative bg-gray-800/90 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-700">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-pink-500/10 p-3 rounded-xl mb-4 hover:scale-110 transition-transform duration-300">
                            <TrendingUp className="w-8 h-8 text-pink-400 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-100 text-center">
                            Welcome to Social Media Performance Analyzer
                        </h2>
                        <p className="text-gray-400 text-sm mt-2 text-center">
                            Sign up to gain insights and track your social growth
                        </p>
                    </div>

                    <div className="flex justify-around mb-8 px-4">
                        <div className="flex flex-col items-center group">
                            <div className="bg-pink-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-500/20">
                                <MessageSquare className="w-5 h-5 text-pink-400" />
                            </div>
                            <span className="text-xs text-gray-400">Engagement</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-3 animate-pulse" />
                        <div className="flex flex-col items-center group">
                            <div className="bg-blue-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                                <TrendingUp className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-xs text-gray-400">Analytics</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-3 animate-pulse" />
                        <div className="flex flex-col items-center group">
                            <div className="bg-yellow-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-500/20">
                                <Smartphone className="w-5 h-5 text-yellow-400" />
                            </div>
                            <span className="text-xs text-gray-400">Tracking</span>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 text-gray-100 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 text-gray-100 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-700/50 text-gray-100 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-pink-600 text-white font-medium rounded-xl hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Sign Up
                        </button>

                        <div className="flex items-center justify-between text-sm pt-2">
                            <label className="flex items-center text-gray-400 hover:text-gray-300 transition-colors">
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-pink-400 hover:text-pink-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="text-center text-sm text-gray-400 mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-pink-400 hover:text-pink-300 transition-colors"
                            >
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
