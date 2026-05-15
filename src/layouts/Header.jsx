// src/layouts/Header.jsx

import { Search, AlertTriangle, Home, Map, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSOS } from "../store/SOSContext";
import SOSForm from "../features/sos/SOSForm";
import "./Header.css";

export default function Header() {
    const { isFormOpen, setIsFormOpen } = useSOS();
    const location = useLocation();

    return (
        <>
            <header className="header">
                {/* LEFT */}
                <div className="header-left">
                    <Link to="/" className="logo-wrap" style={{ textDecoration: 'none', height: '100%', alignItems: 'center' }}>
                        <div className="logo-icon">🚨</div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '2px' }}>
                            <h1 className="logo" style={{ lineHeight: '1.1', marginBottom: '2px' }}>
                                <span>SOS</span> MIỀN TRUNG
                            </h1>
                            <p className="logo-sub" style={{ margin: 0 }}>Kết nối nhanh – Cứu trợ kịp thời</p>
                        </div>
                    </Link>

                    <nav className="nav-menu">
                        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Home size={15} />Trang chủ
                        </Link>
                        <Link to="/map" className={`nav-item ${location.pathname === '/map' ? 'active' : ''}`}>
                            <Map size={15} />Bản đồ
                        </Link>
                        <a href="#lien-he" className="nav-item"><Mail size={15} />Liên hệ</a>
                    </nav>
                </div>

                {/* RIGHT */}
                <div className="header-right">
                    <div className="search-box">
                        <Search size={16} />
                        <input placeholder="Tìm kiếm khu vực, địa điểm..." />
                    </div>

                    <button
                        className="sos-btn"
                        onClick={() => setIsFormOpen(true)}
                    >
                        <AlertTriangle size={16} />
                        SOS
                    </button>
                </div>
            </header>

            {isFormOpen && <SOSForm />}
        </>
    );
}