import { useState } from "react";
import FilterPanel from "../components/panels/FilterPanel";
import MapView from "../components/map/MapView";
import AIPanel from "../components/panels/AIPanel";
import LeftPanel from "../components/panels/LeftPanel";
import AdvancedFilterModal from "../components/panels/AdvancedFilterModal";

export default function MapPage() {
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <div className="map-page" style={{
            display: 'flex',
            flex: 1,
            minHeight: 0,
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#020817'
        }}>
            {/* LeftPanel */}
            <div style={{
                width: '320px',
                flexShrink: 0,
                height: '100%',
                overflowY: 'auto',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                background: "#ffffff"
            }}>
                <LeftPanel />
            </div>

            {/* Vùng giữa */}
            <div className="map-content" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                minHeight: 0,
                height: '100%'
            }}>
                <FilterPanel onOpenAdvanced={() => setShowAdvanced(true)} />
                <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
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
                background: "#ffffff"
            }}>
                <AIPanel />
            </aside>

            {/* Modal render ở đây, ngoài mọi stacking context */}
            {showAdvanced && (
                <AdvancedFilterModal onClose={() => setShowAdvanced(false)} />
            )}
        </div>
    );
}