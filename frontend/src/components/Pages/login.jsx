import { Link } from "react-router-dom";
import { Brain, BarChart2, Share2, ChevronRight, Mail, Lock } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const FloatingMessage = ({ icon: Icon, color, className }) => (
        <div className={`absolute ${className} animate-bounce opacity-20`}>
            <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
                email,
                password,
                username: email,
            });

            const { accessToken } = response.data;
            Cookies.set("accessToken", accessToken, { expires: 1 });
            toast.success("Login successful!", { position: "top-right" });
            navigate("/analyzer");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please check your credentials.", {
                position: "top-right",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                <FloatingMessage
                    icon={Brain}
                    color="text-blue-400"
                    className="top-0 -left-8 animate-[bounce_3s_ease-in-out_infinite]"
                />
                <FloatingMessage
                    icon={BarChart2}
                    color="text-blue-400"
                    className="top-20 -right-8 animate-[bounce_3s_ease-in-out_infinite_0.5s]"
                />
                <FloatingMessage
                    icon={Share2}
                    color="text-indigo-400"
                    className="bottom-20 -left-8 animate-[bounce_3s_ease-in-out_infinite_1s]"
                />

                <div className="relative bg-slate-900/80 p-6 rounded-2xl shadow-xl backdrop-blur-2xl border border-white/10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-blue-500/10 p-3 rounded-xl mb-4 hover:scale-110 transition-transform duration-300">
                            <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-300 text-center">
                            AI-Powered Social Analytics
                        </h2>
                        <p className="text-slate-400 text-sm mt-2 text-center">
                            Leverage AI to supercharge your social media growth
                        </p>
                    </div>

                    <div className="flex justify-around mb-8 px-4">
                        <div className="flex flex-col items-center group">
                            <div className="bg-blue-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                                <Brain className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-xs text-slate-400">AI Analysis</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 mt-3 animate-pulse" />
                        <div className="flex flex-col items-center group">
                            <div className="bg-blue-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                                <BarChart2 className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-xs text-slate-400">Insights</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 mt-3 animate-pulse" />
                        <div className="flex flex-col items-center group">
                            <div className="bg-indigo-500/10 p-2 rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20">
                                <Share2 className="w-5 h-5 text-indigo-400" />
                            </div>
                            <span className="text-xs text-slate-400">Growth</span>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Email Address or Username"
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 text-slate-300 border border-white/10 rounded-xl 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                                    hover:bg-white/10 transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 text-slate-300 border border-white/10 rounded-xl 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                                    hover:bg-white/10 transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 text-white rounded-xl
                            bg-gradient-to-r from-blue-500 to-indigo-500
                            hover:from-blue-600 hover:to-indigo-600
                            shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40
                            transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Start AI Analysis
                        </button>

                        <div className="text-center text-sm text-slate-400 mt-4">
                            Create new an account?{" "}
                            <Link
                                to="/signup"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;