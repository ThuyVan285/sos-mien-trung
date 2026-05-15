
//import StatusStats from "../components/dashboard/StatusStats";
import FilterPanel from "../components/panels/FilterPanel";
import MapView from "../components/map/MapView";
import AIPanel from "../components/panels/AIPanel";
export default function MapPage() {
    return (
        <div className="map-page">
            {/* Vùng bên trái: Chiếm phần lớn diện tích */}
            <div className="map-content">

                {/* Khối thống kê - Tách riêng lên đầu */}
                <section className="glass-card">
                    <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '1.2rem' }}>Thống kê cứu hộ</h2>
                    <StatusStats />
                </section>

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