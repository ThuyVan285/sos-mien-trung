


import FilterPanel from "../components/panels/FilterPanel";
import MapView from "../components/map/MapView";
import AIPanel from "../components/panels/AIPanel";
import LeftPanel from "../components/panels/LeftPanel";


/*import FilterPanel from "../components/panels/FilterPanel";
import MapView from "../components/map/MapView";
import AIPanel from "../components/panels/AIPanel";*/

export default function MapPage() {
    return (
        <div className="map-page" style={{ display: 'flex', width: '100%', height: '100%', margin: 0, padding: 0, boxSizing: 'border-box', backgroundColor: '#020817', overflow: 'hidden' }}>
            {/* Vùng ngoài cùng bên trái: LeftPanel */}
            <div style={{ width: '320px', flexShrink: 0, height: '100%', overflowY: 'auto', borderRight: '1px solid rgba(255,255,255,0.06)', margin: 0, padding: 0 }}>
                <LeftPanel />
            </div>


            {/* Vùng giữa: Chiếm phần lớn diện tích */}
            <div className="map-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', padding: 0, margin: 0 }}>

                {/* Khối thống kê - Tách riêng lên đầu */}



                {/* Khối bộ lọc */}
                <FilterPanel />

                {/* Khối bản đồ - Chiếm phần còn lại */}
                <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                        <MapView />
                    </div>
                </div>
            </div>

            {/* Vùng bên phải: Bảng điều khiển AI */}
            <aside className="ai-sidebar" style={{ width: '350px', flexShrink: 0, height: '100%', overflowY: 'auto', borderLeft: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5, 8, 22, 0.95)', margin: 0, padding: 0 }}>
                <AIPanel />
            </aside>
        </div>
    );
}