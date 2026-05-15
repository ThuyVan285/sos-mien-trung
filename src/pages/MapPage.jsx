// src/pages/MapPage.jsx

import LeftPanel from "../components/panels/LeftPanel";
import FilterPanel from "../components/panels/FilterPanel";
import AIPanel from "../components/panels/AIPanel";
import MapView from "../components/map/MapView";

export default function MapPage() {
    return (
        <div className="map-page">
            {/* Cột bên trái - Thống kê + Danh sách SOS */}
            <LeftPanel />

            {/* Khu vực giữa - Filter + Bản đồ */}
            <div className="map-center">
                <FilterPanel />
                <div className="map-wrapper">
                    <MapView />
                </div>
            </div>

            {/* Cột bên phải - AI Suggestion + Float buttons */}
            <AIPanel />
        </div>
    );
}