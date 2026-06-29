import { useState, useEffect } from "react";
import { Bell, CircleUserRound } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "My Bookings", href: "/bookings" },
        { name: "Buildings", href: "/buildings" },
        { name: "Schedule", href: "/schedule" },
    ];

    return (
        <header className="border-b border-(--secondary-color) bg-white">
            <div className="mx-auto flex h-20 items-center justify-between px-6">
                {/* Left Side */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-3xl font-bold text-(--primary-color)">
                        CampusReserve
                    </Link>

                    <nav>
                        <ul className="flex items-center gap-8 text-[15px] text-gray-600">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <NavLink
                                        to={item.href}
                                        className={({ isActive }) =>
                                            `transition hover:text-(--primary-color) ${
                                                isActive ? "btn-clicked" : ""
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-5">
                    <button className="cursor-pointer text-gray-600 hover:text-(--primary-color)">
                        <Bell size={20} />
                    </button>

                    <Link to="/profile" className="cursor-pointer rounded-full bg-(--primary-color) p-2 text-white">
                        <CircleUserRound size={22} />
                    </Link>
                </div>
            </div>
        </header>
    );
}