// src/components/panels/LeftPanel.jsx
// Kết nối dữ liệu thật từ Firestore qua SOSContext

import { useSOS } from "../../store/SOSContext";

const timeAgo = (d) => {
    if (!d) return "—";
    const s = (Date.now() - new Date(d)) / 1000;
    if (s < 60)    return "vừa xong";
    if (s < 3600)  return `${Math.floor(s / 60)} phút trước`;
    if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
    return `${Math.floor(s / 86400)} ngày trước`;
};

const STATUS_MAP = {
    urgent:  { label: "URGENT",  className: "danger" },
    pending: { label: "PENDING", className: "warning" },
    helping: { label: "HELPING", className: "primary" },
    done:    { label: "DONE",    className: "success" },
};

export default function LeftPanel() {
    const { sosRequests, loading } = useSOS();

    // ── Tính stats từ dữ liệu thật ──
    const stats = [
        {
            title: "CẦN GIÚP",
            value: sosRequests.filter(r => r.status === "urgent").length,
            sub: `${sosRequests.filter(r => {
                const h = (Date.now() - new Date(r.createdAt)) / 3600000;
                return r.status === "urgent" && h < 24;
            }).length} hôm nay`,
            className: "danger",
            icon: "🆘",
        },
        {
            title: "ĐANG XỬ LÝ",
            value: sosRequests.filter(r => r.status === "helping" || r.status === "pending").length,
            sub: `${sosRequests.filter(r => {
                const h = (Date.now() - new Date(r.createdAt)) / 3600000;
                return (r.status === "helping" || r.status === "pending") && h < 24;
            }).length} hôm nay`,
            className: "warning",
            icon: "🟡",
        },
        {
            title: "ĐÃ HỖ TRỢ",
            value: sosRequests.filter(r => r.status === "done").length,
            sub: `${sosRequests.filter(r => {
                const h = (Date.now() - new Date(r.createdAt)) / 3600000;
                return r.status === "done" && h < 24;
            }).length} hôm nay`,
            className: "success",
            icon: "✅",
        },
        {
            title: "TỔNG SOS",
            value: sosRequests.length,
            sub: "tất cả",
            className: "primary",
            icon: "📋",
        },
    ];

    // ── Top 4 hotspot (tỉnh nhiều SOS nhất, chưa done) ──
    const hotspotMap = {};
    sosRequests
        .filter(r => r.status !== "done")
        .forEach(r => {
            const p = r.province || "Không rõ";
            hotspotMap[p] = (hotspotMap[p] || 0) + 1;
        });
    const hotspots = Object.entries(hotspotMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);

    // ── 5 SOS gần nhất ──
    const recentSOS = sosRequests.slice(0, 5);

    if (loading) {
        return (
            <aside className="left-panel" style={{ alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "#9ca3af", fontSize: 13, textAlign: "center" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
                    Đang tải dữ liệu...
                </div>
            </aside>
        );
    }

    return (
        <aside className="left-panel">
            {/* THỐNG KÊ REALTIME */}
            <div className="sidebar-section">
                <div className="section-header">
                    <h3>THỐNG KÊ REALTIME</h3>
                    <span className="live-dot">● LIVE</span>
                </div>
                <div className="stats-grid">
                    {stats.map((item, i) => (
                        <div key={i} className={`stat-card ${item.className}`}>
                            <div className="stat-top">
                                <span>{item.icon}</span>
                                <p>{item.title}</p>
                            </div>
                            <h1>{item.value}</h1>
                            <small>{item.sub}</small>
                        </div>
                    ))}
                </div>
            </div>

            {/* DANH SÁCH SOS GẦN ĐÂY */}
            <div className="sidebar-section">
                <div className="section-header">
                    <h3>DANH SÁCH SOS GẦN ĐÂY</h3>
                </div>
                <div className="sos-list">
                    {recentSOS.length === 0 ? (
                        <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "12px 0" }}>
                            Chưa có yêu cầu nào
                        </p>
                    ) : recentSOS.map((item) => {
                        const st = STATUS_MAP[item.status] || STATUS_MAP.pending;
                        return (
                            <div key={item.id} className="sos-item">
                                <div className="sos-left">
                                    <div className={`sos-dot ${st.className}`}></div>
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>{item.province} · {timeAgo(item.createdAt)}</p>
                                    </div>
                                </div>
                                <span className={`badge ${st.className}`}>{st.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* KHU VỰC NỔI BẬT */}
            <div className="sidebar-section">
                <div className="section-header">
                    <h3>KHU VỰC NỔI BẬT</h3>
                </div>
                <div className="hotspot-list">
                    {hotspots.length === 0 ? (
                        <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "12px 0" }}>
                            Không có dữ liệu
                        </p>
                    ) : hotspots.map(([name, count], i) => (
                        <div key={i} className="hotspot-item">
                            <div className="hotspot-left">
                                🔥 <span>{name}</span>
                            </div>
                            <div className="hotspot-count">{count}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sidebar-footer">© 2026 SOS Miền Trung – Điểm Cứu Trợ</div>
        </aside>
    );
}