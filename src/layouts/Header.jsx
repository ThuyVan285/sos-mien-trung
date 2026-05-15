// src/layouts/Header.jsx

import { Search, AlertTriangle, Home, Map, Gift, User, Mail } from "lucide-react";
import { useSOS } from "../store/SOSContext";
import SOSForm from "../features/sos/SOSForm";

export default function Header() {
    const { isFormOpen, setIsFormOpen } = useSOS();

    return (
        <>
            <header className="header">
                {/* LEFT */}
                <div className="header-left">
                    <div className="logo-wrap">
                        <div className="logo-icon">🚨</div>
                        <div>
                            <h1 className="logo">
                                <span>SOS</span> MIỀN TRUNG
                            </h1>
                            <p className="logo-sub">Kết nối nhanh – Cứu trợ kịp thời</p>
                        </div>
                    </div>

                    <nav className="nav-menu">
                        <a href="#" className="nav-item"><Home size={15} />Trang chủ</a>
                        <a href="#" className="nav-item active"><Map size={15} />Bản đồ</a>
                        <a href="#" className="nav-item"><Gift size={15} />Quyên góp</a>
                        <a href="#" className="nav-item"><User size={15} />TNV</a>
                        <a href="#" className="nav-item"><Mail size={15} />Liên hệ</a>
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
        </>
    );
}