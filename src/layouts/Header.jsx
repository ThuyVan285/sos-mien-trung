// src/layouts/Header.jsx

import { Search, AlertTriangle, Home, Map, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSOS } from "../store/SOSContext";
import SOSForm from "../features/sos/SOSForm";
import DonationForm from "../features/donation/DonationForm";
import VolunteerForm from "../features/volunteer/VolunteerForm";
import "./Header.css";

export default function Header() {
    const { isFormOpen, setIsFormOpen, isDonationOpen, isVolunteerOpen } = useSOS();
    const location = useLocation();

    return (
        <>
            <header className="header">
                {/* LEFT */}
                <div className="header-left flex items-center gap-16 flex-1">
                    <Link to="/" className="logo-wrap">
                        <div className="logo-icon">
                            <AlertTriangle size={18} strokeWidth={2.5} />
                        </div>

                        <div className="logo-text">
                            <h1 className="logo">
                                <span>SOS</span> MIỀN TRUNG
                            </h1>

                            <p className="logo-sub">
                                Kết nối nhanh — Cứu trợ kịp thời
                            </p>
                        </div>
                    </Link>
                    <nav className="nav-menu flex items-center justify-center gap-14 flex-1">
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
            {isDonationOpen && <DonationForm />}
            {isVolunteerOpen && <VolunteerForm />}
        </>
    );
}