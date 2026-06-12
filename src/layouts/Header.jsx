import { useEffect, useState } from "react";
import { Search, AlertTriangle, Home, Map, Mail, GitFork, BarChart2, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSOS } from "../store/SOSContext";
import SOSForm from "../features/sos/SOSForm";
import DonationForm from "../features/donation/DonationForm";
import VolunteerForm from "../features/volunteer/VolunteerForm";
import "./Header.css";

const NAV_ITEMS = [
    { type: "link", to: "/", label: "Trang chủ", icon: Home, activePath: "/" },
    { type: "map", label: "Bản đồ", icon: Map, activePath: "/map" },
    { type: "anchor", href: "#quy-trinh", label: "Quy trình", icon: GitFork },
    { type: "anchor", href: "#thong-ke", label: "Thống kê", icon: BarChart2 },
    { type: "anchor", href: "#lien-he", label: "Liên hệ", icon: Mail },
];

export default function Header() {
    const { isFormOpen, setIsFormOpen, isDonationOpen, isVolunteerOpen } = useSOS();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleMapClick = (e) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        if (location.pathname === "/") {
            document.getElementById("ban-do")?.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate("/map");
        }
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    };

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const renderNavItem = (item, className) => {
        const Icon = item.icon;
        const isActive =
            item.type === "link"
                ? location.pathname === item.activePath
                : item.type === "map"
                    ? location.pathname === item.activePath
                    : false;

        if (item.type === "link") {
            return (
                <Link
                    key={item.label}
                    to={item.to}
                    className={`${className} ${isActive ? "active" : ""}`}
                    onClick={handleNavClick}
                >
                    <Icon size={18} aria-hidden="true" />
                    {item.label}
                </Link>
            );
        }

        if (item.type === "map") {
            return (
                <a
                    key={item.label}
                    href="#ban-do"
                    onClick={handleMapClick}
                    className={`${className} ${isActive ? "active" : ""}`}
                >
                    <Icon size={18} aria-hidden="true" />
                    {item.label}
                </a>
            );
        }

        return (
            <a
                key={item.label}
                href={item.href}
                className={className}
                onClick={handleNavClick}
            >
                <Icon size={18} aria-hidden="true" />
                {item.label}
            </a>
        );
    };

    return (
        <>
            <header className={`header ${isSearchOpen ? "header--search-open" : ""}`}>
                <div className="header-left flex items-center gap-16 flex-1">
                    <button
                        type="button"
                        className="header-menu-btn"
                        aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="header-mobile-nav"
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                    >
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <Link to="/" className="logo-wrap" onClick={handleNavClick}>
                        <div className="logo-icon">
                            <AlertTriangle size={18} strokeWidth={2.5} />
                        </div>
                        <div className="logo-text">
                            <h1 className="logo">
                                <span>SOS</span> MIỀN TRUNG
                            </h1>
                            <p className="logo-sub">Kết nối nhanh — Cứu trợ kịp thời</p>
                        </div>
                    </Link>

                    <nav className="nav-menu nav-menu--desktop flex items-center justify-center gap-14 flex-1" aria-label="Điều hướng chính">
                        {NAV_ITEMS.map((item) => renderNavItem(item, "nav-item"))}
                    </nav>
                </div>

                <div className="header-right">
                    <button
                        type="button"
                        className="search-toggle-btn"
                        aria-label={isSearchOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
                        aria-expanded={isSearchOpen}
                        aria-controls="header-search-box"
                        onClick={() => setIsSearchOpen((open) => !open)}
                    >
                        {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                    </button>

                    <div id="header-search-box" className={`search-box ${isSearchOpen ? "search-box--open" : ""}`}>
                        <Search size={16} aria-hidden="true" />
                        <label htmlFor="header-search-input" className="search-label">
                            Tìm kiếm khu vực, địa điểm
                        </label>
                        <input
                            id="header-search-input"
                            type="search"
                            inputMode="search"
                            enterKeyHint="search"
                            autoComplete="off"
                            placeholder="Tìm kiếm khu vực, địa điểm..."
                        />
                    </div>

                    <button
                        type="button"
                        className="sos-btn"
                        aria-label="Gửi yêu cầu SOS khẩn cấp"
                        onClick={() => setIsFormOpen(true)}
                    >
                        <AlertTriangle size={16} aria-hidden="true" />
                        <span className="sos-btn-text">SOS</span>
                    </button>
                </div>

                <div
                    className={`mobile-nav-backdrop ${isMobileMenuOpen ? "mobile-nav-backdrop--open" : ""}`}
                    aria-hidden="true"
                    onClick={closeMobileMenu}
                />

                <nav
                    id="header-mobile-nav"
                    className={`mobile-nav-drawer ${isMobileMenuOpen ? "mobile-nav-drawer--open" : ""}`}
                    aria-label="Menu di động"
                    aria-hidden={!isMobileMenuOpen}
                >
                    <div className="mobile-nav-header">
                        <span className="mobile-nav-title">Menu</span>
                        <button
                            type="button"
                            className="mobile-nav-close"
                            aria-label="Đóng menu"
                            onClick={closeMobileMenu}
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <div className="mobile-nav-links">
                        {NAV_ITEMS.map((item) => renderNavItem(item, "mobile-nav-item"))}
                    </div>
                </nav>
            </header>

            {isFormOpen && <SOSForm />}
            {isDonationOpen && <DonationForm />}
            {isVolunteerOpen && <VolunteerForm />}
        </>
    );
}
