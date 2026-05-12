// src/features/analytics/Dashboard.jsx

export default function Dashboard() {
    return (
        <div className="dashboard-grid">
            {[
                "Cần giúp",
                "Đang xử lý",
                "Đã hỗ trợ",
                "Điểm cứu trợ",
            ].map((item) => (
                <div key={item} className="dashboard-card glass">
                    <h2>{Math.floor(Math.random() * 500)}</h2>
                    <p>{item}</p>
                </div>
            ))}
        </div>
    );
}