


import FilterPanel from "../components/panels/FilterPanel";
import MapView from "../components/map/MapView";
import AIPanel from "../components/panels/AIPanel";
import LeftPanel from "../components/panels/LeftPanel";





export default function MapPage() {
    return (
        <div className="map-page" style={{
            display: 'flex',
            flex: 1,          // ← đổi từ height:'100%' sang flex:1
            minHeight: 0,     // ← thêm
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#020817'
        }}>
            {/* LeftPanel */}
            <div style={{
                width: '320px',
                flexShrink: 0,
                height: '100%',   // giữ nguyên
                overflowY: 'auto',
                borderRight: '1px solid rgba(255,255,255,0.06)'
            }}>
                <LeftPanel />
            </div>

            {/* Vùng giữa */}
            <div className="map-content" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                minHeight: 0,  // ← thêm
                height: '100%'
            }}>
                <FilterPanel />
                <div style={{ flex: 1, position: 'relative', minHeight: 0 }}> {/* ← thêm minHeight:0 */}
                    <div style={{ position: 'absolute', inset: 0 }}>
                        <MapView />
                    </div>
                </div>
            </div>

            {/* AI Panel */}
            <aside style={{
                width: '350px',
                flexShrink: 0,
                height: '100%',
                overflowY: 'auto',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(5, 8, 22, 0.95)'
            }}>
                <AIPanel />
            </aside>
        </div>
    );
}