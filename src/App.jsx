// src/App.jsx

import "./assets/styles/global.css";
import MainLayout from "./layouts/MainLayout";
import MapPage from "./pages/MapPage";

export default function App() {
  return (
      <div className="app dark-theme">
        <MainLayout>
          <MapPage />
        </MainLayout>
      </div>
  );
}