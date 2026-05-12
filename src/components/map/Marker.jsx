// src/components/map/Marker.jsx

export default function CustomMarker({ type, priority, status }) {
    const getColor = () => {
        if (status === "urgent") return "#FF4D4F";
        if (status === "pending") return "#FACC15";
        if (status === "helping") return "#1D9BF0";

        return "#22C55E";
    };

    return (
        <div
            className="custom-marker pulse"
            style={{
                background: getColor(),
            }}
        >
            {priority}
        </div>
    );
}