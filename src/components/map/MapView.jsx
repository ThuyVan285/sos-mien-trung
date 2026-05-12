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

import mockData from "../../mock/mockData";

const createCustomIcon = (status) => {
    const colors = {
        urgent: "#FF4D4F",
        pending: "#FACC15",
        helping: "#1D9BF0",
        done: "#22C55E",
    };

    return L.divIcon({
        className: "custom-marker-wrapper",

        html: `
      <div class="marker-glow"
        style="
          background:${colors[status]};
          box-shadow:
            0 0 10px ${colors[status]},
            0 0 20px ${colors[status]},
            0 0 40px ${colors[status]};
        "
      >
        <div class="marker-pulse"></div>
      </div>
    `,

        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
};

export default function HMapView() {
    const center = [16.2, 107.9];

    return (
        <div className="map-container">
            <MapContainer center={center} zoom={6} className="leaflet-map">
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {mockData.sosRequests.map((item) => (
                    <Marker
                        key={item.id}
                        position={[item.lat, item.lng]}
                        icon={createCustomIcon(item.status)}
                    >
                        <Popup className="dark-popup">
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.address}</p>
                                <p>{item.status}</p>

                                <div className="popup-actions">
                                    <button>Nhận hỗ trợ</button>
                                    <button>Hoàn thành</button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <Polyline
                    positions={[
                        [16.1, 108.2],
                        [15.5, 108.8],
                    ]}
                    color="#37E2D5"
                />

                {mockData.sosRequests.map((item) => (
                    <Circle
                        key={item.id}
                        center={[item.lat, item.lng]}
                        radius={5000}
                        pathOptions={{
                            color: "#FF4D4F",
                            fillOpacity: 0.15,
                        }}
                    />
                ))}
            </MapContainer>

            <div className="map-overlay"></div>
        </div>
    );
}