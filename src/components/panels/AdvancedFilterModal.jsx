// src/components/panels/AdvancedFilterModal.jsx

import { useState, useMemo } from "react";
import {
    X, SlidersHorizontal, Search, ChevronDown,
    AlertTriangle, Clock, CheckCircle, Loader,
    MapPin, Heart, User, Phone, BarChart2, Filter
} from "lucide-react";
import { useSOS } from "../../store/SOSContext";

const PROVINCES = [
    "Tất cả", "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Bình", "Quảng Trị",
    "Thừa Thiên Huế", "Đà Nẵng", "Quảng Nam", "Quảng Ngãi", "Bình Định",
    "Phú Yên", "Khánh Hòa", "Ninh Thuận", "Bình Thuận", "Gia Lai",
    "Kon Tum", "Đắk Lắk", "Đắk Nông", "Lâm Đồng",
];

const STATUS_CONFIG = {
    urgent:  { label: "Khẩn cấp",    color: "#FF4D4F", bg: "rgba(255,77,79,0.12)",  icon: <AlertTriangle size={12} /> },
    pending: { label: "Chờ xử lý",   color: "#FACC15", bg: "rgba(250,204,21,0.12)", icon: <Clock size={12} /> },
    helping: { label: "Đang hỗ trợ", color: "#1D9BF0", bg: "rgba(29,155,240,0.12)", icon: <Loader size={12} /> },
    done:    { label: "Hoàn thành",  color: "#22C55E", bg: "rgba(34,197,94,0.12)",  icon: <CheckCircle size={12} /> },
};

const PRIORITY_CONFIG = {
    high:   { label: "Cao",    color: "#FF4D4F" },
    medium: { label: "Trung bình", color: "#FACC15" },
    low:    { label: "Thấp",   color: "#22C55E" },
};

export default function AdvancedFilterModal({ onClose }) {
    const { sosRequests } = useSOS();

    // Filter state
    const [search, setSearch]           = useState("");
    const [filterProvince, setFilterProvince] = useState("Tất cả");
    const [filterStatus, setFilterStatus]     = useState("Tất cả");
    const [filterType, setFilterType]         = useState("Tất cả");
    const [filterPriority, setFilterPriority] = useState("Tất cả");
    const [activeTab, setActiveTab]           = useState("table"); // "table" | "stats"

    // Derived filter
    const filtered = useMemo(() => {
        return sosRequests.filter((r) => {
            const matchSearch = !search ||
                r.name?.toLowerCase().includes(search.toLowerCase()) ||
                r.address?.toLowerCase().includes(search.toLowerCase()) ||
                r.province?.toLowerCase().includes(search.toLowerCase());
            const matchProvince  = filterProvince  === "Tất cả" || r.province === filterProvince;
            const matchStatus    = filterStatus    === "Tất cả" || r.status === filterStatus;
            const matchType      = filterType      === "Tất cả" || r.supportType === filterType;
            const matchPriority  = filterPriority  === "Tất cả" || r.priority === filterPriority;
            return matchSearch && matchProvince && matchStatus && matchType && matchPriority;
        });
    }, [sosRequests, search, filterProvince, filterStatus, filterType, filterPriority]);

    // Stats derived
    const stats = useMemo(() => {
        const all = filtered;
        const byStatus = Object.fromEntries(
            Object.keys(STATUS_CONFIG).map((k) => [k, all.filter((r) => r.status === k).length])
        );
        const byProvince = all.reduce((acc, r) => {
            const p = r.province || "Không rõ";
            acc[p] = (acc[p] || 0) + 1;
            return acc;
        }, {});
        const byType = all.reduce((acc, r) => {
            const t = r.supportType || "Khác";
            acc[t] = (acc[t] || 0) + 1;
            return acc;
        }, {});
        return { total: all.length, byStatus, byProvince, byType };
    }, [filtered]);

    const resetFilters = () => {
        setSearch(""); setFilterProvince("Tất cả"); setFilterStatus("Tất cả");
        setFilterType("Tất cả"); setFilterPriority("Tất cả");
    };

    const supportTypes = ["Tất cả", ...new Set(sosRequests.map((r) => r.supportType).filter(Boolean))];

    return (
        <div className="adv-overlay" onClick={onClose}>
            <div className="adv-modal" onClick={(e) => e.stopPropagation()}>

                {/* ── HEADER ── */}
                <div className="adv-header">
                    <div className="adv-header-left">
                        <div className="adv-header-icon">
                            <SlidersHorizontal size={20} color="#4db8ff" />
                        </div>
                        <div>
                            <h2>Bộ lọc nâng cao</h2>
                            <p>Thống kê & phân tích các trường hợp SOS</p>
                        </div>
                    </div>
                    <button className="adv-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* ── FILTER BAR ── */}
                <div className="adv-filters">
                    {/* Search */}
                    <div className="adv-search-wrap">
                        <Search size={13} className="adv-search-icon" />
                        <input
                            className="adv-search-input"
                            placeholder="Tìm theo tên, địa chỉ..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Tỉnh/Thành */}
                    <div className="adv-select-wrap">
                        <select className="adv-select" value={filterProvince} onChange={(e) => setFilterProvince(e.target.value)}>
                            {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                        </select>
                        <ChevronDown size={12} className="adv-select-arrow" />
                    </div>

                    {/* Trạng thái */}
                    <div className="adv-select-wrap">
                        <select className="adv-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option>Tất cả</option>
                            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={12} className="adv-select-arrow" />
                    </div>

                    {/* Loại hỗ trợ */}
                    <div className="adv-select-wrap">
                        <select className="adv-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            {supportTypes.map((t) => <option key={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={12} className="adv-select-arrow" />
                    </div>

                    {/* Mức độ */}
                    <div className="adv-select-wrap">
                        <select className="adv-select" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                            <option>Tất cả</option>
                            {Object.entries(PRIORITY_CONFIG).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={12} className="adv-select-arrow" />
                    </div>

                    <button className="adv-reset-btn" onClick={resetFilters} title="Xoá bộ lọc">
                        <Filter size={13} /> Xoá lọc
                    </button>
                </div>

                {/* ── TABS ── */}
                <div className="adv-tabs">
                    <button
                        className={`adv-tab ${activeTab === "table" ? "adv-tab-active" : ""}`}
                        onClick={() => setActiveTab("table")}
                    >
                        📋 Danh sách ({filtered.length})
                    </button>
                    <button
                        className={`adv-tab ${activeTab === "stats" ? "adv-tab-active" : ""}`}
                        onClick={() => setActiveTab("stats")}
                    >
                        📊 Thống kê
                    </button>
                </div>

                {/* ── BODY ── */}
                <div className="adv-body">

                    {/* ─── TAB: TABLE ─── */}
                    {activeTab === "table" && (
                        <>
                            {filtered.length === 0 ? (
                                <div className="adv-empty">
                                    <div style={{ fontSize: 36 }}>🔍</div>
                                    <p>Không tìm thấy trường hợp nào phù hợp.</p>
                                </div>
                            ) : (
                                <div className="adv-table-wrap">
                                    <table className="adv-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th><User size={11} style={{ display: "inline", marginRight: 4 }} />Họ tên</th>
                                                <th><Phone size={11} style={{ display: "inline", marginRight: 4 }} />SĐT</th>
                                                <th><MapPin size={11} style={{ display: "inline", marginRight: 4 }} />Khu vực</th>
                                                <th><Heart size={11} style={{ display: "inline", marginRight: 4 }} />Hỗ trợ</th>
                                                <th>Mức độ</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((r, i) => {
                                                const st = STATUS_CONFIG[r.status] || STATUS_CONFIG.pending;
                                                const pr = PRIORITY_CONFIG[r.priority] || PRIORITY_CONFIG.medium;
                                                return (
                                                    <tr key={r.id || i} className="adv-table-row">
                                                        <td className="adv-td-id">{i + 1}</td>
                                                        <td className="adv-td-name">{r.name || "—"}</td>
                                                        <td className="adv-td-phone">{r.phone || "—"}</td>
                                                        <td className="adv-td-province">
                                                            <span className="adv-province-badge">{r.province || r.address || "—"}</span>
                                                        </td>
                                                        <td className="adv-td-type">{r.supportType || "—"}</td>
                                                        <td>
                                                            <span className="adv-priority-dot" style={{ background: pr.color }} />
                                                            <span style={{ color: pr.color, fontSize: 11, fontWeight: 700 }}>{pr.label}</span>
                                                        </td>
                                                        <td>
                                                            <span className="adv-status-badge" style={{ color: st.color, background: st.bg }}>
                                                                {st.icon}&nbsp;{st.label}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}

                    {/* ─── TAB: STATS ─── */}
                    {activeTab === "stats" && (
                        <div className="adv-stats-wrap">
                            {/* Summary cards */}
                            <div className="adv-summary-grid">
                                <SummaryCard label="Tổng" value={stats.total} color="#4db8ff" icon="📋" />
                                <SummaryCard label="Khẩn cấp"    value={stats.byStatus.urgent  || 0} color="#FF4D4F" icon="🆘" />
                                <SummaryCard label="Chờ xử lý"   value={stats.byStatus.pending || 0} color="#FACC15" icon="⏳" />
                                <SummaryCard label="Đang hỗ trợ" value={stats.byStatus.helping || 0} color="#1D9BF0" icon="🚣" />
                                <SummaryCard label="Hoàn thành"  value={stats.byStatus.done    || 0} color="#22C55E" icon="✅" />
                            </div>

                            <div className="adv-charts-row">
                                {/* By Province */}
                                <div className="adv-chart-block">
                                    <div className="adv-chart-title"><MapPin size={13} /> Theo khu vực</div>
                                    {Object.entries(stats.byProvince).sort((a, b) => b[1] - a[1]).map(([name, count]) => (
                                        <BarRow key={name} label={name} value={count} max={stats.total} color="#4db8ff" />
                                    ))}
                                    {Object.keys(stats.byProvince).length === 0 && <p className="adv-no-data">Không có dữ liệu</p>}
                                </div>

                                {/* By Support Type */}
                                <div className="adv-chart-block">
                                    <div className="adv-chart-title"><Heart size={13} /> Theo loại hỗ trợ</div>
                                    {Object.entries(stats.byType).sort((a, b) => b[1] - a[1]).map(([name, count]) => (
                                        <BarRow key={name} label={name} value={count} max={stats.total} color="#FACC15" />
                                    ))}
                                    {Object.keys(stats.byType).length === 0 && <p className="adv-no-data">Không có dữ liệu</p>}
                                </div>

                                {/* By Status donut-like */}
                                <div className="adv-chart-block">
                                    <div className="adv-chart-title"><BarChart2 size={13} /> Theo trạng thái</div>
                                    {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                                        const count = stats.byStatus[key] || 0;
                                        return (
                                            <BarRow key={key} label={cfg.label} value={count} max={stats.total || 1} color={cfg.color} />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── FOOTER ── */}
                <div className="adv-footer">
                    <span className="adv-footer-count">
                        Hiển thị <strong>{filtered.length}</strong> / <strong>{sosRequests.length}</strong> trường hợp
                    </span>
                    <button className="adv-close-footer-btn" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
}

/* ── Helper: summary card ── */
function SummaryCard({ label, value, color, icon }) {
    return (
        <div className="adv-summary-card" style={{ borderColor: `${color}30` }}>
            <div className="adv-summary-icon">{icon}</div>
            <div className="adv-summary-num" style={{ color }}>{value}</div>
            <div className="adv-summary-label">{label}</div>
        </div>
    );
}

/* ── Helper: horizontal bar row ── */
function BarRow({ label, value, max, color }) {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div className="adv-bar-row">
            <div className="adv-bar-label">{label}</div>
            <div className="adv-bar-track">
                <div className="adv-bar-fill" style={{ width: `${pct}%`, background: color }} />
            </div>
            <div className="adv-bar-value" style={{ color }}>{value}</div>
        </div>
    );
}
