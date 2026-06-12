// src/components/map/MapView.jsx
import { useEffect, useState } from "react";
import {
    MapContainer, TileLayer, Marker,
    Popup, Polyline, Circle, useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSOS } from "../../store/SOSContext";
import { Phone, MapPin, Heart, Zap, FileText, Plus, Minus, LocateFixed } from "lucide-react";

const createCustomIcon = (status) => {
    const colors = { urgent: "#FF4D4F", pending: "#FACC15", helping: "#1D9BF0", done: "#22C55E" };
    const color = colors[status] || "#FF4D4F";
    return L.divIcon({
        className: "custom-marker-wrapper",
        html: `
            <div class="marker-glow" style="background:${color};box-shadow:0 0 10px ${color},0 0 20px ${color},0 0 40px ${color};">
                <div class="marker-pulse" style="border-color:${color};"></div>
            </div>
        `,
        iconSize: [20, 20], iconAnchor: [10, 10],
    });
};

const STATUS_LABEL = { urgent: "URGENT", pending: "PENDING", helping: "HELPING", done: "DONE" };
const STATUS_COLOR = { urgent: "#FF4D4F", pending: "#FACC15", helping: "#1D9BF0", done: "#22C55E" };

function MapControls() {
    const map = useMap();
    return (
        <div className="map-controls">
            <button className="map-ctrl-btn" onClick={() => map.zoomIn()} title="Phóng to">
                <Plus size={16} />
            </button>
            <button className="map-ctrl-btn" onClick={() => map.zoomOut()} title="Thu nhỏ">
                <Minus size={16} />
            </button>
            <button className="map-ctrl-btn" onClick={() => window.dispatchEvent(new Event('trigger-locate-me'))} title="Định vị của tôi">
                <LocateFixed size={16} />
            </button>
        </div>
    );
}

function ResizeMap() {
    const map = useMap();
    useEffect(() => {
        const timers = [100, 300, 600, 1000].map(d => setTimeout(() => map.invalidateSize(), d));
        return () => timers.forEach(clearTimeout);
    }, [map]);
    return null;
}

function UserLocationMarker() {
    const map = useMap();
    const [position, setPosition] = useState(null);

    useEffect(() => {
        const onLocate = () => {
            if (!navigator.geolocation) {
                alert("Trình duyệt không hỗ trợ định vị.");
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    const newPos = [lat, lng];
                    setPosition(newPos);
                    map.flyTo(newPos, 16, { animate: true, duration: 1.5 });
                },
                (err) => {
                    alert("Không thể lấy vị trí: " + err.message);
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        };

        window.addEventListener('trigger-locate-me', onLocate);
        return () => window.removeEventListener('trigger-locate-me', onLocate);
    }, [map]);

    const userIcon = L.divIcon({
        className: "custom-marker-wrapper",
        html: `
            <div class="marker-glow" style="background:#8b5cf6;box-shadow:0 0 10px #8b5cf6,0 0 20px #8b5cf6;">
                <div class="marker-pulse" style="border-color:#8b5cf6;"></div>
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:6px; height:6px; background:white; border-radius:50%;"></div>
            </div>
        `,
        iconSize: [20, 20], iconAnchor: [10, 10],
    });

    return position === null ? null : (
        <Marker position={position} icon={userIcon}>
            <Popup className="dark-popup" closeButton={false}>
                <div className="popup-card" style={{ width: 'auto', padding: '10px 14px' }}>
                    <div className="popup-header" style={{ marginBottom: 0 }}>
                        <strong style={{ color: '#8b5cf6', fontSize: 13 }}>📍 Vị trí của bạn</strong>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default function MapView() {
    const { sosRequests, updateStatus } = useSOS();

    return (
        <MapContainer center={[16.2, 107.9]} zoom={6} style={{ width: "100%", height: "100%" }} zoomControl={false}>
            <ResizeMap />
            <UserLocationMarker />
            <TileLayer
                attribution="&copy; VietMap"
                url="https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=1581064bec7437481b89c58cd3bfeada9ba10b0dbed1cd4c"
            />
            <Polyline
                positions={[[19.8, 105.8], [18.7, 105.7], [18.3, 105.9], [17.5, 106.3], [16.7, 107.2], [16.4, 107.6], [16.05, 108.2], [15.6, 108.0], [15.1, 108.8], [14.2, 109.0], [13.1, 109.3], [12.2, 109.2], [11.9, 108.4]]}
                color="#37E2D5" weight={2} opacity={0.5} dashArray="6,6"
            />

            {sosRequests.map((item) => (
                <Marker key={item.id} position={[item.lat, item.lng]} icon={createCustomIcon(item.status)}>
                    <Popup className="dark-popup" closeButton={false}>
                        <div className="popup-card">
                            <div className="popup-header">
                                <strong>{item.name}</strong>
                                <span className="popup-badge" style={{ background: STATUS_COLOR[item.status] }}>
                                    {STATUS_LABEL[item.status]}
                                </span>
                            </div>
                            <div className="popup-body">
                                <p style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <Phone size={11} color="#6b7280" /> {item.phone}
                                </p>
                                <p style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <MapPin size={11} color="#6b7280" /> {item.address}
                                </p>
                                <p style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <Heart size={11} color="#6b7280" /> Hỗ trợ: {item.supportType}
                                </p>
                                <p style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <Zap size={11} color="#6b7280" /> Mức độ:{" "}
                                    <span style={{ color: STATUS_COLOR[item.status], fontWeight: 700 }}>
                                        {item.priority?.toUpperCase()}
                                    </span>
                                </p>
                                {item.note && (
                                    <p style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <FileText size={11} color="#6b7280" /> {item.note}
                                    </p>
                                )}
                            </div>
                            <div className="popup-actions">
                                <button className="popup-btn accept" onClick={() => updateStatus(item.id, "helping")}>Nhận hỗ trợ</button>
                                <button className="popup-btn done" onClick={() => updateStatus(item.id, "done")}>Hoàn thành</button>
                                <button className="popup-btn cancel" onClick={() => updateStatus(item.id, "urgent")}>Khẩn cấp</button>
                            </div>
                        </div>
                    </Popup>
                    <Circle center={[item.lat, item.lng]} radius={5000}
                            pathOptions={{ color: STATUS_COLOR[item.status], fillColor: STATUS_COLOR[item.status], fillOpacity: 0.1, weight: 1 }} />
                </Marker>
            ))}

            <div className="map-legend">
                <div className="legend-title">CHÚ THÍCH</div>
                {[
                    { color: "#FF4D4F", label: "Cần giúp khẩn cấp" },
                    { color: "#FACC15", label: "Chờ xử lý" },
                    { color: "#1D9BF0", label: "Đang hỗ trợ" },
                    { color: "#22C55E", label: "Đã hoàn thành" },
                ].map((item) => (
                    <div key={item.label} className="legend-item">
                        <span className="legend-dot" style={{ background: item.color }}></span>
                        {item.label}
                    </div>
                ))}
                <div className="legend-item">
                    <span className="legend-dot legend-ring"></span>
                    Điểm cứu trợ
                </div>
            </div>

            <MapControls />
        </MapContainer>
    );
}