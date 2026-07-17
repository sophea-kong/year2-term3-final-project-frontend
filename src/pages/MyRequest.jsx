import { useState, useEffect } from "react";
import RequestCard from "../component/MyRequestCard";
import bookingApi from "../api/bookingApi";

export default function DashBoard() {
    const timeItems = ["Today", "Week", "Month", "All"];
    const [selectedTime, setSelectedTime] = useState("Today");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await bookingApi.getPendingBookings();
            if (data) {
                setBookings(data);
            } else {
                setBookings([]);
            }
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Failed to fetch requests. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking request?")) {
            try {
                await bookingApi.cancelBooking(bookingId);
                // Refresh list
                fetchBookings();
            } catch (err) {
                console.error("Error cancelling booking:", err);
                alert("Failed to cancel booking. Please try again.");
            }
        }
    };

    // Filter bookings based on selectedTime
    const filteredBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.startTime);
        const now = new Date();
        
        // Reset times for comparison
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        
        if (selectedTime === "Today") {
            return bookingDate >= todayStart && bookingDate <= todayEnd;
        } else if (selectedTime === "Week") {
            const weekEnd = new Date(todayStart.getTime() + 7 * 24 * 60 * 60 * 1000);
            return bookingDate >= todayStart && bookingDate <= weekEnd;
        } else if (selectedTime === "Month") {
            const monthEnd = new Date(todayStart.getTime() + 30 * 24 * 60 * 60 * 1000);
            return bookingDate >= todayStart && bookingDate <= monthEnd;
        }
        return true;
    });

    return (
        <main className="flex-1 px-6 py-4 md:py-6 lg:py-8 bg-slate-50 overflow-y-auto">
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
                    Your Pending Requests ({filteredBookings.length})
                </h2>

                {loading ? (
                    <div className="text-center py-8 text-slate-500">Loading your requests...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500 font-medium">{error}</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 bg-white border border-dashed border-slate-200 rounded-xl">
                        No requests found for {selectedTime.toLowerCase()}.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredBookings.map((booking) => {
                            // Extract details safely
                            const roomName = booking.room?.roomName || booking.roomName || `Room ${booking.roomId}`;
                            const buildingName = booking.room?.building || booking.building || "Campus Building";
                            const statusLabel = booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : "Pending";
                            
                            const startDate = new Date(booking.startTime);
                            const endDate = new Date(booking.endTime);
                            
                            const formattedDate = startDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            });
                            
                            const formattedTime = `${startDate.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit"
                            })} - ${endDate.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit"
                            })}`;

                            return (
                                <RequestCard
                                    key={booking.bookingId || booking.id}
                                    bookingId={booking.bookingId || booking.id}
                                    room={roomName}
                                    building={buildingName}
                                    status={statusLabel}
                                    date={formattedDate}
                                    time={formattedTime}
                                    eventTitle={booking.title || "No Title"}
                                    onViewDetails={() => console.log("view details", booking)}
                                    onCancel={() => handleCancel(booking.bookingId || booking.id)}
                                />
                            );
                        })}
                    </div>
                )}
        </main>
    );
}