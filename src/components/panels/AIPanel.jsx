// src/components/panels/AIPanel.jsx
import { useEffect, useState, useMemo } from "react";
import {
    ArrowRight, AlertTriangle, Bot, Users, MapPin,
    UserCheck, Bell, Navigation, Clock, Siren,
    ShieldAlert, Info, CheckCircle2,
} from "lucide-react";
import { useSOS } from "../../store/SOSContext";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../../services/firebase";

// ── Config màu theo mức độ cảnh báo ─────────────────────────────────────────
const LEVEL_CFG = {
    critical: { color: "#dc2626", bg: "rgba(220,38,38,0.07)",  border: "rgba(220,38,38,0.2)",  Icon: ShieldAlert   },
    warning:  { color: "#d97706", bg: "rgba(217,119,6,0.07)",  border: "rgba(217,119,6,0.2)",  Icon: AlertTriangle },
    info:     { color: "#2563eb", bg: "rgba(37,99,235,0.07)",  border: "rgba(37,99,235,0.2)",  Icon: Info          },
};

// ── Thời gian tương đối ───────────────────────────────────────────────────────
const timeAgo = (d) => {
    if (!d) return "";
    const s = (Date.now() - new Date(d)) / 1000;
    if (s < 60)   return "vừa xong";
    if (s < 3600) return `${Math.floor(s / 60)}ph trước`;
    return `${Math.floor(s / 3600)}h trước`;
};

export default function AIPanel() {
    const { sosRequests, setIsFormOpen, setIsDonationOpen, setIsVolunteerOpen } = useSOS();

    // ── Subscribe Firestore alerts (realtime) ────────────────────────────────
    const [alerts,      setAlerts]      = useState([]);
    const [alertsLoading, setAlertsLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "alerts")),
            (snap) => {
                const data = snap.docs
                    .map(d => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate?.() ?? new Date() }))
                    .filter(a => a.active !== false)
                    .sort((a, b) => {
                        const p = { critical: 0, warning: 1, info: 2 };
                        return (p[a.level] ?? 2) - (p[b.level] ?? 2);
                    });
                setAlerts(data);
                setAlertsLoading(false);
            },
            (err) => {
                console.error("AIPanel alerts error:", err);
                setAlertsLoading(false);
            }
        );
        return () => unsub();
    }, []);

    // ── AI Suggestions từ dữ liệu SOS thực ──────────────────────────────────
    const aiSuggestions = useMemo(() => {
        const suggestions = [];

        // Tỉnh có nhiều khẩn cấp nhất
        const urgentByProv = {};
        sosRequests.filter(r => r.status === "urgent").forEach(r => {
            if (r.province) urgentByProv[r.province] = (urgentByProv[r.province] || 0) + 1;
        });
        const topProv = Object.entries(urgentByProv).sort((a, b) => b[1] - a[1])[0];
        if (topProv && topProv[1] >= 1) {
            suggestions.push({
                type: "danger",
                Icon: AlertTriangle,
                title: `${topProv[0]} đang quá tải`,
                desc: `${topProv[1]} yêu cầu khẩn cấp chưa được xử lý`,
            });
        }

        // Yêu cầu chưa có TNV
        const unassigned = sosRequests.filter(
            r => (r.status === "urgent" || r.status === "pending") && !r.assignedVolunteerId
        );
        if (unassigned.length > 0) {
            const provs = [...new Set(unassigned.map(r => r.province).filter(Boolean))].slice(0, 2);
            suggestions.push({
                type: "info",
                Icon: Bot,
                title: `Cần thêm ${Math.ceil(unassigned.length / 5)} TNV`,
                desc: `${unassigned.length} yêu cầu chưa có TNV tại ${provs.join(", ") || "các khu vực"}`,
            });
        }

        return suggestions;
    }, [sosRequests]);

    // ── Danh sách TNV đang được điều phối ───────────────────────────────────
    const dispatchedList = useMemo(() => {
        return sosRequests
            .filter(r => r.assignedVolunteerId && r.assignedVolunteerName && r.status !== "done")
            .sort((a, b) => {
                const order = { urgent: 0, helping: 1, pending: 2 };
                return (order[a.status] ?? 3) - (order[b.status] ?? 3);
            })
            .slice(0, 6);
    }, [sosRequests]);

    // ── Geolocation ──────────────────────────────────────────────────────────
    const handleLocateMe = () => {
        if (!navigator.geolocation) { alert("Trình duyệt không hỗ trợ định vị."); return; }
        navigator.geolocation.getCurrentPosition(
            pos => alert(`Vị trí của bạn:\n${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`),
            err => alert("Không thể lấy vị trí: " + err.message)
        );
    };

    const floatBtns = [
        { label: "GỬI SOS",          icon: "🚨", color: "#FF4D4F", shadow: "rgba(255,77,79,0.5)",   onClick: () => setIsFormOpen(true)      },
        { label: "QUYÊN GÓP",         icon: "🎁", color: "#7C3AED", shadow: "rgba(124,58,237,0.5)",  onClick: () => setIsDonationOpen(true)  },
        { label: "TÌNH NGUYỆN VIÊN",  icon: "👨‍🚒", color: "#D97706", shadow: "rgba(217,119,6,0.5)",   onClick: () => setIsVolunteerOpen(true) },
        { label: "ĐỊNH VỊ TÔI",       icon: "📍", color: "#22C55E", shadow: "rgba(34,197,94,0.5)",   onClick: handleLocateMe                  },
    ];

    const statusLabel = { urgent: "Khẩn cấp", helping: "Đang hỗ trợ", pending: "Chờ xử lý" };
    const statusColor = { urgent: "#dc2626",   helping: "#2563eb",       pending: "#d97706"    };

    return (
        <div className="ai-panel">

            {/* ── HEADER ── */}
            <div className="ai-panel-header">
                <span>AI SUGGESTION</span>
                <span className="ai-badge">AI</span>
            </div>

            {/* ── ALERTS TỪ FIREBASE (realtime) ── */}
            <div className="ai-suggestions">
                {alertsLoading && (
                    <div style={{ textAlign: "center", padding: "12px 0", fontSize: 12, color: "#9ca3af" }}>
                        Đang tải cảnh báo...
                    </div>
                )}

                {/* Cảnh báo thủ công từ admin */}
                {alerts.slice(0, 3).map(alert => {
                    const cfg      = LEVEL_CFG[alert.level] || LEVEL_CFG.info;
                    const IconComp = cfg.Icon;
                    return (
                        <div key={alert.id} style={{
                            padding: "11px 13px", borderRadius: 12,
                            background: cfg.bg, border: `1px solid ${cfg.border}`,
                        }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: alert.message ? 5 : 0 }}>
                                <IconComp size={15} color={cfg.color} style={{ flexShrink: 0, marginTop: 1 }} />
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#111827", lineHeight: 1.4 }}>
                                    {alert.title}
                                </span>
                            </div>
                            {alert.message && (
                                <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 0 23px", lineHeight: 1.5 }}>
                                    {alert.message}
                                </p>
                            )}
                            {alert.province && (
                                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, marginLeft: 23 }}>
                                    <MapPin size={9} color="#9ca3af" />
                                    <span style={{ fontSize: 10, color: "#9ca3af" }}>{alert.province}</span>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* AI suggestions từ dữ liệu thực */}
                {aiSuggestions.map((s, i) => {
                    const IconComp = s.Icon;
                    return (
                        <div key={i} className={`ai-card ai-card-${s.type}`}>
                            <div className="ai-card-title">
                                <IconComp size={16} color={s.type === "danger" ? "#FF4D4F" : "#1D9BF0"} />
                                <strong>{s.title}</strong>
                            </div>
                            {s.desc && <p className="ai-card-desc">{s.desc}</p>}
                        </div>
                    );
                })}

                {!alertsLoading && alerts.length === 0 && aiSuggestions.length === 0 && (
                    <div style={{ textAlign: "center", padding: "16px 0", color: "#9ca3af", fontSize: 12 }}>
                        <CheckCircle2 size={24} style={{ display: "block", margin: "0 auto 6px", opacity: 0.4 }} />
                        Không có cảnh báo nào
                    </div>
                )}

                <button className="ai-detail-btn" onClick={() => window.open("/admin", "_blank")}>
                    Xem chi tiết trên Admin
                    <ArrowRight size={14} />
                </button>
            </div>

            {/* ── ĐIỀU PHỐI TNV (mới) ── */}
            <div style={{
                marginTop: 8, padding: "12px 4px 0",
                borderTop: "1px solid rgba(0,0,0,0.06)",
            }}>
                {/* Header */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <UserCheck size={13} color="#16a34a" />
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: 0.5, textTransform: "uppercase" }}>
                            ĐIỀU PHỐI TNV
                        </span>
                    </div>
                    <span style={{
                        fontSize: 10, fontWeight: 700, color: "#2563eb",
                        background: "rgba(37,99,235,0.1)", padding: "2px 8px",
                        borderRadius: 20, border: "1px solid rgba(37,99,235,0.2)",
                    }}>
                        {dispatchedList.length} đang xử lý
                    </span>
                </div>

                {/* Danh sách */}
                {dispatchedList.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "16px 8px", color: "#9ca3af", fontSize: 12 }}>
                        <Users size={24} style={{ display: "block", margin: "0 auto 6px", opacity: 0.35 }} />
                        Chưa có TNV nào được phân công
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {dispatchedList.map(item => (
                            <div key={item.id} style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "10px 12px", borderRadius: 12,
                                background: "#ffffff",
                                border: "1px solid #f1f5f9",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                            }}>
                                {/* Avatar */}
                                <div style={{
                                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                                    background: "linear-gradient(135deg,#dcfce7,#bbf7d0)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <UserCheck size={16} color="#16a34a" />
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    {/* TNV name */}
                                    <div style={{
                                        fontSize: 12, fontWeight: 700, color: "#111827",
                                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                    }}>
                                        {item.assignedVolunteerName}
                                    </div>
                                    {/* Arrow + province */}
                                    <div style={{
                                        fontSize: 11, color: "#6b7280", marginTop: 2,
                                        display: "flex", alignItems: "center", gap: 4,
                                    }}>
                                        <Navigation size={9} color="#16a34a" />
                                        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                                            {item.province}
                                        </span>
                                    </div>
                                    {/* Support type */}
                                    <div style={{
                                        fontSize: 10, color: "#9ca3af", marginTop: 2,
                                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                    }}>
                                        {item.supportType} · {item.name}
                                    </div>
                                </div>

                                {/* Status badge */}
                                <div style={{ flexShrink: 0 }}>
                                    <span style={{
                                        fontSize: 9, fontWeight: 800, padding: "3px 7px",
                                        borderRadius: 8, display: "block", whiteSpace: "nowrap",
                                        color: statusColor[item.status] || "#6b7280",
                                        background: `${statusColor[item.status] || "#6b7280"}12`,
                                        border: `1px solid ${statusColor[item.status] || "#6b7280"}30`,
                                    }}>
                                        {statusLabel[item.status] || item.status}
                                    </span>
                                    {item.assignedAt && (
                                        <span style={{ fontSize: 9, color: "#9ca3af", display: "block", textAlign: "center", marginTop: 3 }}>
                                            {timeAgo(item.assignedAt?.toDate?.() || item.assignedAt)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── FLOAT ACTION BUTTONS ── */}
            <div className="float-actions">
                {floatBtns.map((btn, i) => (
                    <button key={i} className="float-action-btn" onClick={btn.onClick}>
                        <span className="float-action-icon" style={{
                            background: btn.color,
                            boxShadow: `0 0 12px ${btn.shadow}`,
                        }}>
                            {btn.icon}
                        </span>
                        <span className="float-action-label">{btn.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}