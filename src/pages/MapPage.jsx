// src/pages/MapPage.jsx

import MapView from "../components/map/MapView";
import LeftPanel from "../components/panels/LeftPanel";
import FilterPanel from "../components/panels/FilterPanel";
import AIPanel from "../components/panels/AIPanel";

export default function MapPage() {
    return (
        <div className="map-page">
            <LeftPanel />

            <div className="map-wrapper">
                <FilterPanel />
                <MapView />
            </div>

            <AIPanel />
        </div>
    );
}