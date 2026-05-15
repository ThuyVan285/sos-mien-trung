// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import "./assets/styles/global.css";
import { SOSProvider } from "./store/SOSContext";
import MainLayout from "./layouts/MainLayout";
import MapPage from "./pages/MapPage";
import Homepage from "./pages/Homepage";

export default function App() {
    return (
        <SOSProvider>
            <BrowserRouter>
                <div className="app dark-theme">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/map" element={
                            <MainLayout>
                                <MapPage />
                            </MainLayout>
                        } />
                    </Routes>
                </div>
            </BrowserRouter>
        </SOSProvider>
    );
}