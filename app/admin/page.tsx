"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import BannersAdmin from "@/components/admin/BannersAdmin";
import PointsTableee from "@/components/admin/PointsTableAdmin";
import UpdateWinners from "@/components/admin/WinnersGrid";
import CandidateDashboard from "@/components/admin/RegisterDetails";

// Define types for Sidebar props
interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

// Define types for menu items
interface MenuItem {
  id: string;
  label: string;
}

const Sidebar = ({ currentPage, onNavigate, onLogout }: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: "banners", label: "Manage Banners" },
    { id: "points", label: "Points Table" },
    { id: "winners", label: "Update Winners" },
    { id: "details", label: "Register Details" },
  ];

  return (
    <>
      {/* Mobile Hamburger Menu Button (fixed position for accessibility) */}
      <div className="lg:hidden fixed top-24 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-10 h-10 bg-white border border-gray-200 text-[#3B3BB7] rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Dark Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-1">Dashboard Navigation</p>
          </div>

          {/* Mobile Menu Items */}
          <div className="p-4 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors flex items-center ${
                  currentPage === item.id
                    ? "bg-[#3B3BB7] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center group border border-gray-300 hover:border-red-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-500 group-hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="group-hover:text-red-600 font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 fixed left-0 top-[124px] bottom-0 overflow-hidden flex-col z-40">
        <div className="p-6 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors flex items-center ${
                currentPage === item.id
                  ? "bg-[#3B3BB7] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Logout button at the bottom */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-500 group-hover:text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-red-600">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

// Define types for AdminLogin props
interface AdminLoginProps {
  onLogin: () => void;
}

// Admin Login Page
const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            id: data.id,
            username: data.username,
            role: data.role,
          }),
        );

        onLogin();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Admin Login
            </h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B3BB7] focus:border-transparent"
                  placeholder="Enter username"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3B3BB7] text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("login");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsLoggedIn(true);
        // Restore saved route if it exists
        const savedRoute = localStorage.getItem("adminActiveRoute");
        if (savedRoute && savedRoute !== "login") {
          setCurrentRoute(savedRoute);
        } else {
          setCurrentRoute("banners");
        }
      } else {
        // Token invalid, clear storage
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    const savedRoute = localStorage.getItem("adminActiveRoute");
    if (savedRoute && savedRoute !== "login") {
      setCurrentRoute(savedRoute);
    } else {
      setCurrentRoute("banners");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsLoggedIn(false);
    setCurrentRoute("login");
  };

  const handleNavigate = (page: string) => {
    setCurrentRoute(page);
    localStorage.setItem("adminActiveRoute", page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Render login page
  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Render admin pages with sidebar
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar
          currentPage={currentRoute}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <div className="flex-1 lg:ml-64 w-full overflow-x-hidden">
          <div className="p-4 md:p-8 pt-20 lg:pt-8 w-full">
            {currentRoute === "banners" && <BannersAdmin />}
            {currentRoute === "points" && <PointsTableee />}
            {currentRoute === "winners" && <UpdateWinners />}
            {currentRoute === "details" && <CandidateDashboard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
