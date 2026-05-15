// src/components/dashboard/StatusStats.jsx

import { useSOS } from "../../store/SOSContext";
import { AlertTriangle, Clock, Loader, CheckCircle, List } from "lucide-react";

export default function StatusStats() {
    const { sosRequests } = useSOS();

    // Tính toán số liệu dựa trên mockData / dữ liệu thực tế
    const stats = {
        total: sosRequests.length,
        urgent: sosRequests.filter(r => r.status === "urgent").length,
        pending: sosRequests.filter(r => r.status === "pending").length,
        helping: sosRequests.filter(r => r.status === "helping").length,
        done: sosRequests.filter(r => r.status === "done").length,
    };

    const statCards = [
        { label: "Tổng yêu cầu", value: stats.total, color: "#4db8ff", bg: "rgba(77,184,255,0.06)", icon: <List size={18} /> },
        { label: "Khẩn cấp", value: stats.urgent, color: "#FF4D4F", bg: "rgba(255,77,79,0.06)", icon: <AlertTriangle size={18} /> },
        { label: "Chờ xử lý", value: stats.pending, color: "#FACC15", bg: "rgba(250,204,21,0.06)", icon: <Clock size={18} /> },
        { label: "Đang hỗ trợ", value: stats.helping, color: "#1D9BF0", bg: "rgba(29,155,240,0.06)", icon: <Loader size={18} /> },
        { label: "Hoàn thành", value: stats.done, color: "#22C55E", bg: "rgba(34,197,94,0.06)", icon: <CheckCircle size={18} /> },
    ];

    return (
        <div className="status-stats-grid">
            {statCards.map((card, i) => (
                <div key={i} className="status-stat-card" style={{ borderColor: `${card.color}30`, background: card.bg }}>
                    <div className="stat-icon-wrapper" style={{ color: card.color, background: `${card.color}15` }}>
                        {card.icon}
                    </div>
                    <div className="stat-info">
                        <div className="stat-value" style={{ color: card.color }}>{card.value}</div>
                        <div className="stat-label">{card.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
