// src/components/map/MapView.jsx

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSOS } from "../../store/SOSContext";

const createCustomIcon = (status) => {
    const colors = {
        urgent:  "#FF4D4F",
        pending: "#FACC15",
        helping: "#1D9BF0",
        done:    "#22C55E",
    };
    const color = colors[status] || "#FF4D4F";
    return L.divIcon({
        className: "custom-marker-wrapper",
        html: `
            <div class="marker-glow" style="
                background: ${color};
                box-shadow: 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color};
            ">
                <div class="marker-pulse" style="border-color: ${color};"></div>
            </div>
        `,
        iconSize:   [20, 20],
        iconAnchor: [10, 10],
    });
};

const STATUS_LABEL = { urgent:"URGENT", pending:"PENDING", helping:"HELPING", done:"DONE" };
const STATUS_COLOR = { urgent:"#FF4D4F", pending:"#FACC15", helping:"#1D9BF0", done:"#22C55E" };

export default function MapView() {
    const { sosRequests, updateStatus } = useSOS();
    const center = [16.2, 107.9];

    return (
        <MapContainer
            center={center}
            zoom={6}
            style={{ width: "100%", height: "100%" }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            <Polyline
                positions={[[19.8,105.8],[18.7,105.7],[18.3,105.9],[17.5,106.3],
                    [16.7,107.2],[16.4,107.6],[16.05,108.2],[15.6,108.0],
                    [15.1,108.8],[14.2,109.0],[13.1,109.3],[12.2,109.2],
                    [11.9,108.4]]}
                color="#37E2D5"
                weight={2}
                opacity={0.5}
                dashArray="6,6"
            />

            {sosRequests.map((item) => (
                <Marker
                    key={item.id}
                    position={[item.lat, item.lng]}
                    icon={createCustomIcon(item.status)}
                >
                    <Popup className="dark-popup" closeButton={false}>
                        <div className="popup-card">
                            <div className="popup-header">
                                <strong>{item.name}</strong>
                                <span className="popup-badge" style={{ background: STATUS_COLOR[item.status] }}>
                                    {STATUS_LABEL[item.status]}
                                </span>
                            </div>
                            <div className="popup-body">
                                <p>📞 {item.phone}</p>
                                <p>📍 {item.address}</p>
                                <p>🏠 Hỗ trợ: {item.supportType}</p>
                                <p>⚡ Mức độ: <span style={{ color: STATUS_COLOR[item.status], fontWeight: 700 }}>{item.priority?.toUpperCase()}</span></p>
                                {item.note && <p>📝 {item.note}</p>}
                            </div>
                            <div className="popup-actions">
                                <button className="popup-btn accept" onClick={() => updateStatus(item.id, "helping")}>Nhận hỗ trợ</button>
                                <button className="popup-btn done"   onClick={() => updateStatus(item.id, "done")}>Hoàn thành</button>
                                <button className="popup-btn cancel" onClick={() => updateStatus(item.id, "urgent")}>Khẩn cấp</button>
                            </div>
                        </div>
                    </Popup>
                    <Circle
                        center={[item.lat, item.lng]}
                        radius={5000}
                        pathOptions={{ color: STATUS_COLOR[item.status], fillColor: STATUS_COLOR[item.status], fillOpacity: 0.1, weight: 1 }}
                    />
                </Marker>
            ))}

            <div className="map-legend">
                <div className="legend-title">CHÚ THÍCH</div>
                {[
                    { color:"#FF4D4F", label:"Cần giúp khẩn cấp" },
                    { color:"#FACC15", label:"Chờ xử lý" },
                    { color:"#1D9BF0", label:"Đang hỗ trợ" },
                    { color:"#22C55E", label:"Đã hoàn thành" },
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

            <div className="map-controls">
                <button className="map-ctrl-btn">＋</button>
                <button className="map-ctrl-btn">－</button>
                <button className="map-ctrl-btn">⊙</button>
            </div>
        </MapContainer>
    );
}