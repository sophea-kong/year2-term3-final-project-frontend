import { Plus, Minus, SendHorizonal } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import bookingApi from "../api/bookingApi";
import roomApi from "../api/roomApi";

export default function BookingForm({ roomId: propRoomId, initialDate = "", initialTime = "", initialEndTime = "" } = {}) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const roomId = propRoomId || parseInt(searchParams.get("roomId")) || 1;
    const initDate = initialDate || searchParams.get("date") || "";
    const initTime = initialTime || searchParams.get("time") || "";
    const initEndTime = initialEndTime || searchParams.get("endtime") || "";


    const [room, setRoom] = useState(null);
    const [fullName, setFullName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [purpose, setPurpose] = useState("");
    const [note, setNote] = useState("");

    const [numberOfAttendees, setNumberOfAttendees] = useState(0);
    const [bookingDate, setBookingDate] = useState(initDate);
    const [bookingTime, setBookingTime] = useState(initTime);
    const [bookingEndTime, setBookingEndTime] = useState(initEndTime || (initTime ? getOneHourLater(initTime) : ""));
    useEffect(() => {
        if (bookingTime && !bookingEndTime) {
            setBookingEndTime(getOneHourLater(bookingTime));
        }
    }, [bookingTime]);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const rooms = await roomApi.getAllRooms();
                const matchedRoom = rooms.find(r => r.id === roomId || r.roomId === roomId);
                if (matchedRoom) {
                    setRoom(matchedRoom);
                }
            } catch (err) {
                console.error("Error fetching room details:", err);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleBooking = async () => {
        if (!fullName || !studentId || !email || !purpose || !bookingDate || !bookingTime || !bookingEndTime) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const start = new Date(`${bookingDate}T${bookingTime}`);
            const end = new Date(`${bookingDate}T${bookingEndTime}`);

            if (end <= start) {
                alert("End time must be after start time.");
                return;
            }

            const payload = {
                roomId: roomId,
                title: purpose,
                purpose: purpose,
                participantCount: numberOfAttendees,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
                additionalNote: note,
                fullName: fullName,
                studentId: studentId,
                email: email,
                department: department
            };

            const response = await bookingApi.createBooking(payload);
            if (response) {
                alert("Booking submitted successfully!");
                navigate("/myrequests");
            } else {
                alert("Failed to submit booking. Please try again.");
            }
        } catch (err) {
            console.error("Error submitting booking:", err);
            alert("An error occurred while submitting your booking.");
        }
    };

    const handleCancle = () => {
        navigate(-1);
    };

    return(
        <main className="flex-1 px-6 py-4 md:py-6 lg:py-8 bg-slate-50 overflow-y-auto">
            <div className="flex bg-(--primary-color) rounded-lg text-white w-full max-w-4xl mx-auto p-6 shadow-sm">
                <h2 className="text-2xl font-extrabold tracking-tight">
                    {room ? room.name || room.roomName : `Room ${roomId}`}
                </h2>
            </div>

            <section className="bg-white flex flex-col rounded-lg w-full max-w-4xl mx-auto p-6 mt-8 border border-gray-200 shadow-sm gap-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 border-b-2 border-gray-200 pb-8">
                    <div>
                        <p className="text-sm font-medium text-gray-700">Full Name *</p>
                        <input 
                            type="text" 
                            placeholder="eg. Kong Sophea" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 mt-1" 
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Staff/Student ID *</p>
                        <input 
                            type="text" 
                            placeholder="eg. 123456" 
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 mt-1" 
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Email Address *</p>
                        <input 
                            type="email" 
                            placeholder="eg. kong.sophea@university.edu" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 mt-1" 
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Department</p>
                        <input 
                            type="text" 
                            placeholder="eg. Computer Science" 
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 mt-1" 
                        />
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-1 pb-8">
                        <p className="text-sm font-medium text-gray-700">Purpose of booking *</p>
                        <input 
                            type="text" 
                            placeholder="eg. Meeting with faculty" 
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 mt-1" 
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pb-8">
                        <div>
                            <p className="text-sm font-medium text-gray-700">Booking Date *</p>
                            {bookingDate ? (
                                <div className="mt-1 flex items-center justify-between rounded-md border border-gray-300 bg-gray-100 p-2">
                                    <span>{bookingDate}</span>
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-blue-700 hover:underline"
                                        onClick={() => setBookingDate("")}
                                    >
                                        Change
                                    </button>
                                </div>
                            ) : (
                                <input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 mt-1"
                                />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Expected Attendees</p>
                            <div className="flex items-center gap-2 mt-1">
                                <button className="flex h-10 w-10 items-center justify-center border border-gray-300 bg-gray-100 rounded-md text-center hover:cursor-pointer"
                                    onClick={() => countAttendees(-1, setNumberOfAttendees)}
                                >
                                    <Minus size={16} />
                                </button>
                                <p className="flex h-10 w-full items-center justify-center border border-gray-300 bg-gray-100 rounded-md text-center">{numberOfAttendees}</p>
                                <button className="flex h-10 w-10 items-center justify-center border border-gray-300 bg-gray-100 rounded-md text-center hover:cursor-pointer"
                                    onClick={() => countAttendees(1, setNumberOfAttendees)}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">Start Time *</p>
                            {bookingTime ? (
                                <div className="mt-1 flex items-center justify-between rounded-md border border-gray-300 bg-gray-100 p-2">
                                    <span>{bookingTime}</span>
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-blue-700 hover:underline"
                                        onClick={() => setBookingTime("")}
                                    >
                                        Change
                                    </button>
                                </div>
                            ) : (
                                <input
                                    type="time"
                                    value={bookingTime}
                                    onChange={(e) => setBookingTime(e.target.value)}
                                    className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 mt-1"
                                />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">End Time *</p>
                            {bookingEndTime ? (
                                <div className="mt-1 flex items-center justify-between rounded-md border border-gray-300 bg-gray-100 p-2">
                                    <span>{bookingEndTime}</span>
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-blue-700 hover:underline"
                                        onClick={() => setBookingEndTime("")}
                                    >
                                        Change
                                    </button>
                                </div>
                            ) : (
                                <input
                                    type="time"
                                    value={bookingEndTime}
                                    onChange={(e) => setBookingEndTime(e.target.value)}
                                    className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 mt-1"
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Additional Note</p>
                        <textarea 
                            placeholder="eg. Please ensure the room is equipped with a projector" 
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full border border-gray-300 bg-gray-100 rounded-md p-2 mt-1" 
                        />
                    </div>
                </div>

            </section>

            <div className="flex h-20 items-center mt-4 justify-between w-full max-w-4xl mx-auto">
                <button 
                    onClick={handleCancle}
                    className="bg-gray-200 text-(--primary-color) hover:text-(--primary-color-hover) font-bold px-8 py-3 rounded-md hover:bg-gray-300 border border-(--primary-color) hover:border-(--primary-color-hover) text-bold"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleBooking}
                    className="flex items-center bg-(--primary-color) text-white font-bold px-8 py-3 rounded-md hover:bg-(--primary-color-hover) border border-(--primary-color) hover:border-(--primary-color-hover) text-bold"
                >
                    Submit Booking
                    <SendHorizonal size={16} className="ml-2" />
                </button>
            </div>
        </main>
    )
}

function countAttendees(change, setNumberOfAttendees) {
    setNumberOfAttendees((prev) => Math.max(0, prev + change));
}

function getOneHourLater(timeString) {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return "";
    const newHours = (hours + 1) % 24;
    return `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}