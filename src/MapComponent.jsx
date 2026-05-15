import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    // Tọa độ trung tâm Miền Trung
    const position = [16.4637, 107.5908];

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer
                center={position}
                zoom={7}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%", background: "#1a1a1a" }}
            >
                {/* Layer bản đồ màu tối (Dark Mode) giống ảnh mẫu */}
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* Ví dụ một điểm cứu trợ */}
                <Marker position={[16.047, 108.206]}>
                    <Popup>
                        <b>Nguyễn Văn A</b> <br /> Cần hỗ trợ thực phẩm.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;