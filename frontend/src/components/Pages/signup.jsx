import { Link } from "react-router-dom";
import { Brain, BarChart, Search, ChevronRight, Mail, Lock, UserCircle, User, Sparkles, Network } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const FloatingMessage = ({ icon: Icon, color, className }) => (
        <div className={`absolute ${className} animate-bounce opacity-20`}>
            <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", {
                position: "top-right",
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/auth/register", {
                email,
                password,
                fullName,
                username
            });
            const { accessToken } = response.data;

            Cookies.set("accessToken", accessToken, { expires: 1 });

            toast.success("Login successful!", {
                position: "top-right",
            });
            navigate("/home");
        } catch (error) {
            toast.error( error.response?.data?.message ||  "Login failed. Please check your credentials.", {
                position: "top-right",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                <FloatingMessage
                    icon={Brain}
                    color="text-cyan-400"
                    className="top-0 -left-8 animate-[bounce_3s_ease-in-out_infinite]"
                />
                <FloatingMessage
                    icon={Network}
                    color="text-indigo-400"
                    className="top-20 -right-8 animate-[bounce_3s_ease-in-out_infinite_0.5s]"
                />
                <FloatingMessage
                    icon={Sparkles}
                    color="text-blue-400"
                    className="bottom-20 -left-8 animate-[bounce_3s_ease-in-out_infinite_1s]"
                />

                <div className="relative bg-gray-900/90 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-cyan-700">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-cyan-500/10 p-3 rounded-xl mb-4 hover:scale-110 transition-transform duration-300">
                            <Brain className="w-8 h-8 text-cyan-400 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-100 text-center">
                            AI-Powered Social Analytics
                        </h2>
                        <p className="text-gray-400 text-sm mt-2 text-center">
                            Unlock insights with advanced AI analytics
                        </p>
                    </div>

                    <div className="flex justify-around mb-8 px-4">
                        <div className="flex flex-col items-center group">
                            <div className="bg-cyan-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
                                <Brain className="w-5 h-5 text-cyan-400" />
                            </div>
                            <span className="text-xs text-gray-400">AI Insights</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-3 animate-pulse" />
                        <div className="flex flex-col items-center group">
                            <div className="bg-indigo-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20">
                                <BarChart className="w-5 h-5 text-indigo-400" />
                            </div>
                            <span className="text-xs text-gray-400">Smart Analytics</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600 mt-3 animate-pulse" />
                        <div className="flex flex-col items-center group">
                            <div className="bg-blue-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                                <Search className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-xs text-gray-400">Deep Analysis</span>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 text-gray-100 border border-cyan-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="User Name"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 text-gray-100 border border-cyan-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 text-gray-100 border border-cyan-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 text-gray-100 border border-cyan-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
                                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 text-gray-100 border border-cyan-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-cyan-600 text-white font-medium rounded-xl hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Start AI Analysis
                        </button>
                        <div className="text-center text-sm text-gray-400 mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
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

export default Signup