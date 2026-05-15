import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Khởi tạo các Icon nếu cần (tránh lỗi hiển thị icon mặc định của Leaflet)
import L from 'leaflet';
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function MiniMap({ interactive = false, dataSOS = [] }) {
    // Tọa độ trung tâm miền Trung (Đà Nẵng)
    const center = [16.0544, 108.2022];

    return (
        <MapContainer
            center={center}
            zoom={7}
            style={{ width: '100%', height: '100%' }}
            // Vô hiệu hóa tương tác nếu là MiniMap ở trang chủ
            dragging={interactive}
            touchZoom={interactive}
            doubleClickZoom={interactive}
            scrollWheelZoom={interactive}
            zoomControl={interactive}
            attributionControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://vietmap.vn/">VietMap</a>'
                url="https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=1581064bec7437481b89c58cd3bfeada9ba10b0dbed1cd4c"
            />

            {/* Hiển thị các điểm SOS thực tế từ dữ liệu */}
            {dataSOS.map((item, index) => (
                <Marker
                    key={index}
                    position={[item.lat, item.lng]}
                    icon={redIcon}
                >
                    {interactive && (
                        <Popup>
                            <p className="font-bold">{item.name}</p>
                            <p className="text-xs">{item.message}</p>
                        </Popup>
                    )}
                </Marker>
            ))}
        </MapContainer>
    );
}