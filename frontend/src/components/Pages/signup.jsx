import { Link } from "react-router-dom";
import { Brain, BarChart, Search, ChevronRight, Mail, Lock, UserCircle, User, Sparkles, Network } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { apiUrl } from '../../constant';

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
            toast.error("Passwords do not match!", { position: "top-right" });
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/auth/register`, {
                email,
                password,
                fullName,
                username
            });
            const { accessToken } = response.data;

            Cookies.set("accessToken", accessToken, { expires: 1 });

            toast.success("Signup successful!", { position: "top-right" });
            navigate("/analyzer");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again.", {
                position: "top-right",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                <FloatingMessage
                    icon={Brain}
                    color="text-blue-300"
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

                <div className="relative bg-slate-900/80 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-white/10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-white/10 p-3 rounded-xl mb-4 hover:scale-110 transition-transform duration-300">
                            <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-300 text-center">
                            AI-Powered Social Analytics
                        </h2>
                        <p className="text-blue-400/80 text-sm mt-2 text-center">
                            Unlock insights with advanced AI analytics
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="relative transform transition-all duration-300 hover:scale-[1.02]">
                            <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 text-slate-300 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent transition-all"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative transform transition-all duration-300 hover:scale-[1.02]">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 text-slate-300 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative transform transition-all duration-300 hover:scale-[1.02]">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 text-slate-300 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative transform transition-all duration-300 hover:scale-[1.02]">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 text-slate-300 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative transform transition-all duration-300 hover:scale-[1.02]">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 text-slate-300 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-transparent transition-all"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Start AI Analysis
                        </button>

                        <div className="text-center text-sm text-slate-400 mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/"
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
