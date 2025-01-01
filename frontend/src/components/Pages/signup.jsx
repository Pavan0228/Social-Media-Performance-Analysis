/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { MessageSquare, Receipt, Smartphone, CreditCard, ChevronRight, Mail, Lock, User } from "lucide-react";

const Signup = () => {
    const FloatingMessage = ({ icon: Icon, color, className }) => (
        <div className={`absolute ${className} animate-bounce opacity-20`}>
            <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                <FloatingMessage
                    icon={MessageSquare}
                    color="text-green-400"
                    className="top-0 -left-8 animate-[bounce_3s_ease-in-out_infinite]"
                />
                <FloatingMessage
                    icon={Receipt}
                    color="text-blue-400"
                    className="top-20 -right-8 animate-[bounce_3s_ease-in-out_infinite_0.5s]"
                />
                <FloatingMessage
                    icon={CreditCard}
                    color="text-purple-400"
                    className="bottom-20 -left-8 animate-[bounce_3s_ease-in-out_infinite_1s]"
                />

                <div className="relative bg-zinc-800/90 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-zinc-700">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-blue-500/10 p-3 rounded-xl mb-4 hover:scale-110 transition-transform duration-300">
                            <Smartphone className="w-8 h-8 text-blue-400 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100 text-center">
                            SMS Expense Tracker
                        </h2>
                        <p className="text-zinc-400 text-sm mt-2 text-center">
                            Create an account to get started
                        </p>
                    </div>

                    <div className="flex justify-around mb-8 px-4">
                        <div className="flex flex-col items-center group">
                            <div className="bg-green-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500/20">
                                <MessageSquare className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="text-xs text-zinc-400">SMS</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-600 mt-3 animate-pulse" />
                        <div className="flex flex-col items-center group">
                            <div className="bg-blue-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                                <Receipt className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-xs text-zinc-400">GPay</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-600 mt-3 animate-pulse" />
                        <div className="flex flex-col items-center group">
                            <div className="bg-purple-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500/20">
                                <CreditCard className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xs text-zinc-400">Bank</span>
                        </div>
                    </div>

                    <form className="space-y-5">
                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full pl-12 pr-4 py-3 bg-zinc-700/50 text-zinc-100 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-3 bg-zinc-700/50 text-zinc-100 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full pl-12 pr-4 py-3 bg-zinc-700/50 text-zinc-100 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full pl-12 pr-4 py-3 bg-zinc-700/50 text-zinc-100 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Create Account
                        </button>

                        <div className="text-center text-sm text-zinc-400 mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;