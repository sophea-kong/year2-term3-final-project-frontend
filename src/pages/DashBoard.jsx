import Sidebar from "../component/Sidebar";
import { NavLink } from "react-router-dom";

export default function DashBoard() {

    const timeItems = [
        {name: "Today", href: "/dashboard/today"},
        {name: "Week", href: "/dashboard/week"},
        {name: "Month", href: "/dashboard/month"},
    ]

    return (
        <section className="flex min-h-screen w-full">
            <Sidebar />

            <main className="flex-1 px-6 py-4 md:py-6 lg:py-8">
                <div className="relative">
                    <h1>Room Availability Dashboard</h1>
                    <div className="flex items-center  justify-between gap-4">
                        <p>Manage your room reservations and explore available campus spaces.</p>
                        <ul className="inline-flex w-fit flex-wrap bg-white shadow-xl rounded-md border border-gray-100 overflow-hidden">
                            {timeItems.map((item) => (
                                <li key={item.href}>
                                    <NavLink
                                        to={item.href}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 mx-2 my-1 text-sm rounded-sm transition-all duration-150
                                            hover:bg-gray-100 hover:text-(--primary-color)
                                            ${isActive ? "bg-gray-100 text-(--primary-color) font-medium" : "text-gray-700"}`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>  


                {/* add fake content to test scrolling */}
                <div className="h-[2000px]">

                </div>
            </main>
        </section>
    );
}       