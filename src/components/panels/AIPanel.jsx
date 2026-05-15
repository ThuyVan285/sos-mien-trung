// src/components/panels/AIPanel.jsx

import { ArrowRight, AlertTriangle, Bot } from "lucide-react";

export default function AIPanel() {
    const suggestions = [
        {
            icon: <AlertTriangle size={16} color="#FF4D4F" />,
            title: "Quảng Ngãi đang quá tải cứu trợ",
            desc: "Số lượng yêu cầu vượt quá khả năng tiếp nhận hiện tại.",
            type: "danger",
        },
        {
            icon: <Bot size={16} color="#1D9BF0" />,
            title: "Đề xuất điều thêm 2 TNV đến khu vực Quảng Ngãi",
            desc: "Để hỗ trợ nhanh hơn",
            type: "info",
        },
    ];

    const floatBtns = [
        { label: "GỬI SOS", icon: "🚨", color: "#FF4D4F", shadow: "rgba(255,77,79,0.5)" },
        { label: "QUYÊN GÓP", icon: "🎁", color: "#7C3AED", shadow: "rgba(124,58,237,0.5)" },
        { label: "TÌNH NGUYỆN VIÊN", icon: "👨‍🚒", color: "#D97706", shadow: "rgba(217,119,6,0.5)" },
        { label: "ĐỊNH VỊ TÔI", icon: "📍", color: "#22C55E", shadow: "rgba(34,197,94,0.5)" },
    ];

    return (
        <div className="ai-panel">
            {/* AI Suggestions */}
            <div className="ai-panel-header">
                <span>AI SUGGESTION</span>
                <span className="ai-badge">AI</span>
            </div>

            <div className="ai-suggestions">
                {suggestions.map((s, i) => (
                    <div key={i} className={`ai-card ai-card-${s.type}`}>
                        <div className="ai-card-title">
                            {s.icon}
                            <strong>{s.title}</strong>
                        </div>
                        {s.desc && <p className="ai-card-desc">{s.desc}</p>}
                    </div>
                ))}

                <button className="ai-detail-btn">
                    Xem phân tích chi tiết
                    <ArrowRight size={14} />
                </button>
            </div>

            {/* Float Action Buttons */}
            <div className="float-actions">
                {floatBtns.map((btn, i) => (
                    <button key={i} className="float-action-btn">
                        <span
                            className="float-action-icon"
                            style={{
                                background: btn.color,
                                boxShadow: `0 0 12px ${btn.shadow}`,
                            }}
                        >
                            {btn.icon}
                        </span>
                        <span className="float-action-label">{btn.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}