function MyRequestCard({ room, building, status, date, time, eventTitle, onViewDetails, onCancel }) {
    return (
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* Header */}
            {/* {userId && (
                <p className="text-sm text-slate-500">
                    User ID: {userId}
                </p>
            )} */}

            <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-(--primary-color)">
                    {room} - {building}
                </h3>
                <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    {status}
                </span>
            </div>

            {/* Date / Time */}
            <p className="mt-1 text-sm font-medium text-(--primary-color)">
                {date} <span className="mx-1 text-slate-400">•</span> {time}
            </p>

            {/* Event title */}
            <div className="mt-4">
                <p className="text-xs font-bold tracking-wide text-emerald-700">
                    EVENT TITLE
                </p>
                <p className="mt-1 text-base font-bold text-slate-800">
                    {eventTitle}
                </p>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
                <button
                    onClick={onViewDetails}
                    className="flex-1 rounded-md bg-slate-100 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                >
                    View Details
                </button>
                <button
                    onClick={onCancel}
                    className="flex-1 rounded-md bg-red-100 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-200"
                >
                    Cancel Request
                </button>
            </div>
        </div>
    );
}

export default MyRequestCard;