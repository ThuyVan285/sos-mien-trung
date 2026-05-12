import {
    Search,
    AlertTriangle,
    Home,
    Map,
    Gift,
    User,
    Mail,
} from "lucide-react";

export default function Header() {
    return (
        <header className="header glass">
            {/* LEFT */}
            <div className="header-left">
                <div className="logo-wrap">
                    <div className="logo-icon">🚨</div>

                    <div>
                        <h1 className="logo">SOS MIỀN TRUNG</h1>

                        <p className="logo-sub">
                            Kết nối nhanh - Cứu trợ kịp thời
                        </p>
                    </div>
                </div>

                {/* MENU */}
                <nav className="nav-menu">
                    <a href="#" className="nav-item">
                        <Home size={16} />
                        Trang chủ
                    </a>

                    <a href="#" className="nav-item active">
                        <Map size={16} />
                        Bản đồ
                    </a>

                    <a href="#" className="nav-item">
                        <Gift size={16} />
                        Quyên góp
                    </a>

                    <a href="#" className="nav-item">
                        <User size={16} />
                        TNV
                    </a>

                    <a href="#" className="nav-item">
                        <Mail size={16} />
                        Liên hệ
                    </a>
                </nav>
            </div>

            {/* RIGHT */}
            <div className="header-right">
                <div className="search-box">
                    <Search size={16} />

                    <input placeholder="Tìm kiếm khu vực, địa điểm..." />
                </div>

                <button className="sos-btn">
                    <AlertTriangle size={16} />
                    SOS
                </button>
            </div>
        </header>
    );
}