import React, { useContext, useState } from "react";
import {
    Video,
    FileText,
    BarChart3,
    LogIn,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Sparkles,
    UserPlus,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, Link  } from "react-router-dom";

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { isAuthenticated, logout } = useContext(AuthContext);

    const menuItems = [
        {
            title: "Thumbnail Analyzer",
            icon: <Video size={20} />,
            path: "/thumbnail",
        },
        {
            title: "Video Transcript",
            icon: <FileText size={20} />,
            path: "/transcript",
        },
        { title: "Analyzer", icon: <BarChart3 size={20} />, path: "/analyzer" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 text-blue-300 hover:text-blue-200 bg-white/5 hover:bg-white/10 rounded-xl 
                    transition-all duration-300 backdrop-blur-lg border border-white/10"
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-slate-900/80 backdrop-blur-2xl 
                border-r border-white/10
                transition-all duration-500 ease-in-out z-40
                ${isCollapsed ? "w-20" : "w-72"} 
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-3 top-8 p-1.5 
                    bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
                    rounded-full shadow-lg shadow-blue-500/20 
                    hover:shadow-blue-500/40 hover:scale-110 
                    transition-all duration-300"
                >
                    <ChevronRight
                        size={16}
                        className={`transform transition-transform duration-500 ${
                            isCollapsed ? "rotate-0" : "rotate-180"
                        }`}
                    />
                </button>

                {/* Logo Area */}
                <div className="h-20 flex items-center justify-center border-b border-white/10">
                    <div
                        className={`flex items-center gap-3 ${
                            isCollapsed ? "scale-0" : "scale-100"
                        } transition-transform duration-300`}
                    >
                        <Sparkles className="text-blue-400" size={24} />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text font-bold text-xl">
                            Analytics
                        </span>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="mt-8 px-3">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="flex items-center px-4 py-3.5 my-2 
                            text-slate-300 rounded-xl
                            hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-indigo-500/10
                            hover:border-blue-500/20
                            border border-transparent
                            transition-all duration-300 transform hover:scale-[1.02] group"
                        >
                            <span className="flex-shrink-0 text-blue-400/80 group-hover:text-blue-400 transition-colors">
                                {item.icon}
                            </span>
                            <span
                                className={`ml-4 font-medium whitespace-nowrap group-hover:text-white
                                ${isCollapsed ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"}
                                transition-all duration-300`}
                            >
                                {item.title}
                            </span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div
                className={`transition-all duration-500 ${
                    isCollapsed ? "lg:ml-20" : "lg:ml-72"
                }`}
            >
                {/* Top Navigation */}
                <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-white/10">
                    <div className="h-full flex items-center justify-end px-8 gap-4">
                        {isAuthenticated ? (
                            <button
                                onClick={logout}
                                className="flex items-center px-5 py-2.5 
                                text-slate-300 bg-white/5 rounded-xl 
                                hover:bg-white/10 hover:text-white
                                border border-white/10 hover:border-blue-500/20
                                transition-all duration-300 transform hover:scale-[1.02]"
                            >
                                <LogOut size={20} />
                                <span className="ml-2 font-medium">Logout</span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="flex items-center px-5 py-2.5 
                                    text-slate-300 bg-white/5 rounded-xl
                                    hover:bg-white/10 hover:text-white
                                    border border-white/10 hover:border-blue-500/20
                                    transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    <LogIn size={20} />
                                    <span className="ml-2 font-medium">Login</span>
                                </Link>
                                <Link
                                    to="/signup"
                                    className="flex items-center px-5 py-2.5 
                                    text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl
                                    hover:from-blue-600 hover:to-indigo-600
                                    shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40
                                    transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    <UserPlus size={20} />
                                    <span className="ml-2 font-medium">Sign Up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="">
                    <Outlet  />
                </main>
            </div>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;