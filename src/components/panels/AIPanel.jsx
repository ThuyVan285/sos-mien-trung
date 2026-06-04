// src/components/panels/AIPanel.jsx
// Kết nối dữ liệu thật từ Firestore — tự sinh AI suggestions dựa trên data

import { useMemo } from "react";
import { ArrowRight, AlertTriangle, Bot } from "lucide-react";
import { useSOS } from "../../store/SOSContext";

export default function AIPanel() {
    const { setIsFormOpen, setIsDonationOpen, setIsVolunteerOpen, sosRequests } = useSOS();

    // ── Sinh AI suggestions dựa trên dữ liệu thật ──
    const suggestions = useMemo(() => {
        const result = [];

        // Tìm tỉnh có nhiều SOS khẩn cấp nhất
        const urgentByProv = {};
        sosRequests
            .filter(r => r.status === "urgent")
            .forEach(r => {
                const p = r.province || "Không rõ";
                urgentByProv[p] = (urgentByProv[p] || 0) + 1;
            });
        const topUrgent = Object.entries(urgentByProv).sort((a, b) => b[1] - a[1]);

        if (topUrgent.length > 0) {
            const [prov, count] = topUrgent[0];
            result.push({
                icon: <AlertTriangle size={16} color="#FF4D4F" />,
                title: `${prov} đang quá tải cứu trợ`,
                desc: `${count} yêu cầu khẩn cấp chưa được xử lý.`,
                type: "danger",
            });
        }

        // Tìm tỉnh có nhiều SOS nhất và đề xuất TNV
        const allByProv = {};
        sosRequests
            .filter(r => r.status !== "done")
            .forEach(r => {
                const p = r.province || "Không rõ";
                allByProv[p] = (allByProv[p] || 0) + 1;
            });
        const topProv = Object.entries(allByProv).sort((a, b) => b[1] - a[1]);

        if (topProv.length > 1) {
            const [needProv] = topProv[0];
            // Tỉnh gần nhất (đơn giản chọn thứ 2 làm nguồn TNV)
            const nearby = topProv.length > 2 ? topProv[1][0] : "TP. Đà Nẵng";
            const needed = Math.ceil(topProv[0][1] / 5);
            result.push({
                icon: <Bot size={16} color="#1D9BF0" />,
                title: `Đề xuất điều thêm ${needed} TNV đến ${needProv}`,
                desc: `Phân bổ từ khu vực ${nearby} để hỗ trợ nhanh hơn`,
                type: "info",
            });
        } else if (topProv.length === 1) {
            result.push({
                icon: <Bot size={16} color="#1D9BF0" />,
                title: `Cần thêm tình nguyện viên`,
                desc: `Đăng ký để hỗ trợ đồng bào miền Trung`,
                type: "info",
            });
        }

        // Fallback nếu chưa có data
        if (result.length === 0) {
            result.push(
                {
                    icon: <AlertTriangle size={16} color="#FF4D4F" />,
                    title: "Hệ thống sẵn sàng hoạt động",
                    desc: "Chưa có yêu cầu khẩn cấp nào.",
                    type: "danger",
                },
                {
                    icon: <Bot size={16} color="#1D9BF0" />,
                    title: "Đăng ký tình nguyện viên",
                    desc: "Tham gia hỗ trợ cộng đồng miền Trung",
                    type: "info",
                }
            );
        }

        return result;
    }, [sosRequests]);

    const handleLocateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => alert(`Vị trí: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`),
                (err) => alert("Không thể lấy vị trí: " + err.message)
            );
        } else {
            alert("Trình duyệt không hỗ trợ định vị.");
        }
    };

    const floatBtns = [
        { label: "GỬI SOS",          icon: "🚨", color: "#FF4D4F", shadow: "rgba(255,77,79,0.5)",   onClick: () => setIsFormOpen(true)    },
        { label: "QUYÊN GÓP",        icon: "🎁", color: "#7C3AED", shadow: "rgba(124,58,237,0.5)",  onClick: () => setIsDonationOpen(true) },
        { label: "TÌNH NGUYỆN VIÊN", icon: "👨‍🚒", color: "#D97706", shadow: "rgba(217,119,6,0.5)",   onClick: () => setIsVolunteerOpen(true)},
        { label: "ĐỊNH VỊ TÔI",      icon: "📍", color: "#22C55E", shadow: "rgba(34,197,94,0.5)",   onClick: handleLocateMe               },
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

                <button className="ai-detail-btn" onClick={() => alert("Tính năng phân tích chi tiết đang phát triển...")}>
                    Xem phân tích chi tiết
                    <ArrowRight size={14} />
                </button>
            </div>

            {/* Float Action Buttons */}
            <div className="float-actions">
                {floatBtns.map((btn, i) => (
                    <button key={i} className="float-action-btn" onClick={btn.onClick}>
                        <span className="float-action-icon" style={{ background: btn.color, boxShadow: `0 0 12px ${btn.shadow}` }}>
                            {btn.icon}
                        </span>
                        <span className="float-action-label">{btn.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}