// src/layouts/Sidebar.jsx

export default function Sidebar() {
    const stats = [
        {
            title: "CẦN GIÚP",
            value: 128,
            sub: "+12 hôm nay",
            className: "danger",
            icon: "🆘",
        },
        {
            title: "ĐANG XỬ LÝ",
            value: 56,
            sub: "+5 hôm nay",
            className: "warning",
            icon: "🟡",
        },
        {
            title: "ĐÃ HỖ TRỢ",
            value: 320,
            sub: "+25 hôm nay",
            className: "success",
            icon: "✅",
        },
        {
            title: "ĐIỂM CỨU TRỢ",
            value: 24,
            sub: "+2 hôm nay",
            className: "primary",
            icon: "📍",
        },
    ];

    const sosList = [
        {
            name: "Nguyễn Văn A",
            time: "2 phút trước",
            status: "URGENT",
            className: "danger",
        },
        {
            name: "Trần Thị B",
            time: "9 Huế",
            status: "PENDING",
            className: "warning",
        },
        {
            name: "Lê Văn C",
            time: "8 phút trước",
            status: "HELPING",
            className: "primary",
        },
        {
            name: "Phạm Thị D",
            time: "Quảng Trị",
            status: "PENDING",
            className: "warning",
        },
        {
            name: "Hoàng Văn E",
            time: "15 phút trước",
            status: "DONE",
            className: "success",
        },
    ];

    const hotspots = [
        {
            name: "Quảng Ngãi",
            value: 48,
        },
        {
            name: "Huế",
            value: 36,
        },
        {
            name: "Đà Nẵng",
            value: 28,
        },
        {
            name: "Khánh Hòa",
            value: 16,
        },
    ];

    return (
        <aside className="sidebar glass">
            {/* HEADER */}
            <div className="sidebar-brand">
                <div className="sidebar-logo">🚨</div>

                <div>
                    <h2>SOS MIỀN TRUNG</h2>

                    <p>Kết nối nhanh — Cứu trợ kịp thời</p>
                </div>
            </div>

            {/* REALTIME */}
            <div className="sidebar-section glass">
                <div className="section-header">
                    <h3>THỐNG KÊ REALTIME</h3>

                    <span className="live-dot">● LIVE</span>
                </div>

                <div className="stats-grid">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className={`stat-card ${item.className}`}
                        >
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

            {/* SOS LIST */}
            <div className="sidebar-section glass">
                <div className="section-header">
                    <h3>DANH SÁCH SOS GẦN ĐÂY</h3>

                    <button>Xem tất cả</button>
                </div>

                <div className="sos-list">
                    {sosList.map((item, index) => (
                        <div key={index} className="sos-item">
                            <div className="sos-left">
                                <div className={`sos-dot ${item.className}`}></div>

                                <div>
                                    <h4>{item.name}</h4>

                                    <p>{item.time}</p>
                                </div>
                            </div>

                            <span className={`badge ${item.className}`}>
                {item.status}
              </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* HOTSPOTS */}
            <div className="sidebar-section glass">
                <div className="section-header">
                    <h3>KHU VỰC NỔI BẬT</h3>
                </div>

                <div className="hotspot-list">
                    {hotspots.map((item, index) => (
                        <div key={index} className="hotspot-item">
                            <div className="hotspot-left">
                                🔥

                                <span>{item.name}</span>
                            </div>

                            <div className="hotspot-count">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FOOTER */}
            <div className="sidebar-footer">
                © 2024 SOS Miền Trung – Điểm Cứu Trợ
            </div>
        </aside>
    );
}