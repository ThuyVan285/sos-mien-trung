// src/App.jsx

import 'leaflet/dist/leaflet.css';
import "./assets/styles/global.css";
import { SOSProvider } from "./store/SOSContext";
import MainLayout from "./layouts/MainLayout";
import MapPage from "./pages/MapPage";

export default function App() {
    return (
        <SOSProvider>
            <div className="app dark-theme">
                <MainLayout>
                    <MapPage />
                </MainLayout>
            </div>
        </SOSProvider>
    );
}