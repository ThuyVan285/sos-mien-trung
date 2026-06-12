import { useEffect, useMemo, useState } from "react";
import { BarChart2, Sparkles, X } from "lucide-react";
import FilterPanel from "../components/panels/FilterPanel";
import MapView from "../components/map/MapView";
import AIPanel from "../components/panels/AIPanel";
import LeftPanel from "../components/panels/LeftPanel";
import AdvancedFilterModal from "../components/panels/AdvancedFilterModal";
import { useSOS } from "../store/SOSContext";
import "./MapPage.css";

export default function MapPage() {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [mobilePanel, setMobilePanel] = useState(null);
    const { sosRequests } = useSOS();

    const urgentCount = useMemo(
        () => sosRequests.filter((r) => r.status === "urgent").length,
        [sosRequests]
    );

    const toggleMobilePanel = (panel) => {
        setMobilePanel((prev) => (prev === panel ? null : panel));
    };

    const closeMobilePanel = () => setMobilePanel(null);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1024px)");
        const onChange = (e) => {
            if (!e.matches) setMobilePanel(null);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 320);
        return () => clearTimeout(timer);
    }, [mobilePanel]);

    return (
        <div className={`map-page ${mobilePanel ? "map-page--mobile-panel-open" : ""}`}>
            <aside className="map-page-sidebar map-page-sidebar--left" aria-label="Thống kê realtime">
                <LeftPanel />
            </aside>

            <div className="map-page-center">
                <FilterPanel onOpenAdvanced={() => setShowAdvanced(true)} />

                <div className="map-page-map-area">
                    <div className="map-page-map-inner">
                        <MapView />
                    </div>

                    <div
                        className={`map-mobile-dock ${mobilePanel ? "map-mobile-dock--expanded" : ""}`}
                        role="region"
                        aria-label="Panel di động bản đồ"
                    >
                        <div
                            className="map-mobile-sheet"
                            aria-hidden={!mobilePanel}
                            id="map-mobile-sheet"
                        >
                            {mobilePanel && (
                                <>
                                    <div className="map-mobile-sheet-header">
                                        <div className="map-mobile-sheet-title">
                                            {mobilePanel === "stats" ? (
                                                <>
                                                    <BarChart2 size={18} aria-hidden="true" />
                                                    Thống kê Realtime
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles size={18} aria-hidden="true" />
                                                    AI Gợi ý
                                                </>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className="map-mobile-sheet-close"
                                            aria-label="Thu gọn panel"
                                            onClick={closeMobilePanel}
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="map-mobile-sheet-body">
                                        {mobilePanel === "stats" && <LeftPanel />}
                                        {mobilePanel === "ai" && <AIPanel />}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="map-mobile-tab-bar" role="tablist" aria-label="Chọn panel">
                            <button
                                type="button"
                                role="tab"
                                id="map-tab-stats"
                                aria-selected={mobilePanel === "stats"}
                                aria-controls="map-mobile-sheet"
                                className={`map-mobile-tab ${mobilePanel === "stats" ? "map-mobile-tab--active" : ""}`}
                                onClick={() => toggleMobilePanel("stats")}
                            >
                                <BarChart2 size={18} aria-hidden="true" />
                                <span>Thống kê</span>
                                {urgentCount > 0 && (
                                    <span className="map-mobile-tab-badge" aria-label={`${urgentCount} ca khẩn cấp`}>
                                        {urgentCount > 99 ? "99+" : urgentCount}
                                    </span>
                                )}
                            </button>

                            <button
                                type="button"
                                role="tab"
                                id="map-tab-ai"
                                aria-selected={mobilePanel === "ai"}
                                aria-controls="map-mobile-sheet"
                                className={`map-mobile-tab ${mobilePanel === "ai" ? "map-mobile-tab--active" : ""}`}
                                onClick={() => toggleMobilePanel("ai")}
                            >
                                <Sparkles size={18} aria-hidden="true" />
                                <span>AI Gợi ý</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <aside className="map-page-sidebar map-page-sidebar--right" aria-label="AI gợi ý">
                <AIPanel />
            </aside>

            {showAdvanced && (
                <AdvancedFilterModal onClose={() => setShowAdvanced(false)} />
            )}
        </div>
    );
}
