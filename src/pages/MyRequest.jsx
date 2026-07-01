import { useState } from "react";
import Sidebar from "../component/Sidebar";
import RequestCard from "../component/MyRequestCard";

export default function DashBoard() {
    const timeItems = ["Today", "Week", "Month"];
    const [selectedTime, setSelectedTime] = useState("Today");

    return (
        <section className="flex min-h-screen w-full bg-slate-50">
            <Sidebar />

            <main className="flex-1 px-6 py-4 md:py-6 lg:py-8">
                <div className="relative mb-4">
                    <h1 className="text-3xl font-extrabold tracking-tight text-(--primary-color)">
                        Room Availability Dashboard
                    </h1>
                    <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <p className="max-w-2xl text-sm text-slate-500">
                            Manage your room reservations and explore available campus spaces.
                        </p>
                        <ul className="inline-flex w-fit overflow-hidden p-1 rounded-md bg-gray-200">
                            {timeItems.map((item) => (
                                <li
                                    key={item}
                                    onClick={() => setSelectedTime(item)}
                                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
                                        selectedTime === item
                                            ? "bg-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-(--primary-color) mb-4">
                    Your Pending Requests
                </h2>

                {/* card */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <RequestCard
                        room="Room 302"
                        building="Science North"
                        status="Pending Approval"
                        date="Oct 24, 2024"
                        time="10:00 AM - 11:30 AM"
                        eventTitle="Student Study Group"
                        onViewDetails={() => console.log("view details")}
                        onCancel={() => console.log("cancel request")}
                    />
                </div>
            </main>
        </section>
    );
}