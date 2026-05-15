// src/layouts/Header.jsx

import { Search, AlertTriangle, Home, Map, Gift, User, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSOS } from "../store/SOSContext";
import SOSForm from "../features/sos/SOSForm";
import DonationForm from "../features/donation/DonationForm";
import VolunteerForm from "../features/volunteer/VolunteerForm";

export default function Header() {
    const { isFormOpen, setIsFormOpen, setIsDonationOpen, setIsVolunteerOpen } = useSOS();
    const location = useLocation();

    return (
        <>
            <header className="header">
                {/* LEFT */}
                <div className="header-left">
                    <Link to="/" className="logo-wrap" style={{ textDecoration: 'none' }}>
                        <div className="logo-icon">🚨</div>
                        <div>
                            <h1 className="logo">
                                <span>SOS</span> MIỀN TRUNG
                            </h1>
                            <p className="logo-sub">Kết nối nhanh – Cứu trợ kịp thời</p>
                        </div>
                    </Link>

                    <nav className="nav-menu">
                        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Home size={15} />Trang chủ
                        </Link>
                        <Link to="/map" className={`nav-item ${location.pathname === '/map' ? 'active' : ''}`}>
                            <Map size={15} />Bản đồ
                        </Link>
                        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); alert("Tính năng Liên hệ đang được phát triển."); }}><Mail size={15} />Liên hệ</a>
                    </nav>
                </div>

                {/* RIGHT */}
                <div className="header-right">
                    <div className="search-box">
                        <Search size={15} />
                        <input placeholder="Tìm kiếm khu vực, địa điểm..." />
                    </div>

                    <button
                        className="sos-btn"
                        onClick={() => setIsFormOpen(true)}
                    >
                        <AlertTriangle size={15} />
                        SOS
                    </button>
                </div>
            </header>

            {/* Modal form SOS */}
            {isFormOpen && <SOSForm />}
            
            {/* Modal form Donation */}
            <DonationForm />

            {/* Modal form Volunteer */}
            <VolunteerForm />
        </>
    );
}