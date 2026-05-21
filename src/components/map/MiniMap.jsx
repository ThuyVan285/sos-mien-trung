import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

import L from 'leaflet';

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function ResizeMap() {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    }, [map]);

    return null;
}

export default function MiniMap({ interactive = false, dataSOS = [] }) {
    const center = [16.0544, 108.2022];

    return (
        <div className="w-full h-full">
            <MapContainer
                center={center}
                zoom={7}
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#071122'
                }}
                dragging={interactive}
                touchZoom={interactive}
                doubleClickZoom={interactive}
                scrollWheelZoom={interactive}
                zoomControl={interactive}
                attributionControl={false}
            >
                <ResizeMap />

                <TileLayer
                    attribution='&copy; VietMap'
                    url="https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=1581064bec7437481b89c58cd3bfeada9ba10b0dbed1cd4c"
                    tileSize={256}
                    zoomOffset={0}
                    crossOrigin={true}
                    keepBuffer={4}         // ← giữ buffer tiles
                    updateWhenIdle={false} // ← cập nhật liên tục
                />

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
        </div>
    );
}