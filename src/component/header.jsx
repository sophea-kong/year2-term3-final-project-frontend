import { useState, useEffect } from "react";
import { Bell, CircleUserRound, Menu } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
export default function Header() {
    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "My Bookings", href: "/bookings" },
        { name: "Buildings", href: "/buildings" },
        { name: "Schedule", href: "/schedule" },
    ];

    const [ openDropdown, setOpenDropdown ] = useState(false);

    return (
        <header className="border-b border-(--secondary-color) bg-white sticky top-0 z-50">
            <div className="mx-auto flex h-20 items-center justify-between px-6">
                {/* Left Side */}
                <div className="flex items-center gap-5">
                    <Link to="/" className="text-2xl md:text-3xl font-bold text-(--primary-color)">
                        CampusReserve
                    </Link>

                    <nav className="flex items-center gap-8">
                        <div className="inline-block md:hidden relative">
                            <button className="cursor-pointer text-(--natural-color) hover:text-(--primary-color)"
                                onClick={() => {setOpenDropdown(!openDropdown)}}
                            >
                                <Menu size={22} />
                            </button>

                            {openDropdown && (
                                <ul className="absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 bg-white shadow-xl rounded-xl py-2 z-50 border border-gray-100 overflow-hidden">                                    {navItems.map((item) => (
                                    <li key={item.href}>
                                        <NavLink
                                            to={item.href}
                                            onClick={() => setOpenDropdown(false)}
                                            className={({ isActive }) =>
                                                `block px-4 py-2 text-sm rounded-md mx-2 my-1 transition-all duration-150
                                                hover:bg-gray-100 hover:text-(--primary-color)
                                                ${isActive ? "bg-gray-100 text-(--primary-color) font-medium" : "text-gray-700"}`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                    ))}
                                </ul>
                            )}

                        </div>

                        <ul className="items-center gap-8 text-[15px] text-gray-600 hidden md:flex">
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