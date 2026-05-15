
import FilterPanel from "../components/panels/FilterPanel";
import MapView from "../components/map/MapView";
import AIPanel from "../components/panels/AIPanel";

export default function MapPage() {
    return (
        <div className="map-page">
            {/* Vùng bên trái: Chiếm phần lớn diện tích */}
            <div className="map-content">

                {/* Khối thống kê - Tách riêng lên đầu */}


                {/* Khối bộ lọc - Tách riêng */}
                <section className="glass-card">
                    <FilterPanel />
                </section>

                {/* Khối bản đồ - Chiếm phần còn lại */}
                <section className="map-container-wrapper">
                    <MapView />
                </section>
            </div>

            {/* Vùng bên phải: Bảng điều khiển AI */}
            <aside className="ai-sidebar" style={{ width: '350px' }}>
                <AIPanel />
            </aside>
        </div>
    );
}