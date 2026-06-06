// src/components/panels/LeftPanel.jsx
// ✅ Firebase realtime | Lucide icons | Light theme

import { useMemo } from "react";
import {
    AlertOctagon,
    Clock,
    CheckCircle2,
    ClipboardList,
    Flame,
    MapPin,
    Loader2,
    Wifi,
} from "lucide-react";
import { useSOS } from "../../store/SOSContext";

/* ── Helpers ── */
const timeAgo = (d) => {
    if (!d) return "—";
    const s = (Date.now() - new Date(d)) / 1000;
    if (s < 60)    return "vừa xong";
    if (s < 3600)  return `${Math.floor(s / 60)}ph trước`;
    if (s < 86400) return `${Math.floor(s / 3600)}h trước`;
    return `${Math.floor(s / 86400)}ngày trước`;
};

const last24h = (arr, fn) =>
    arr.filter(r => {
        const h = (Date.now() - new Date(r.createdAt)) / 3_600_000;
        return h < 24 && fn(r);
    }).length;

const STATUS_MAP = {
    urgent:  { label: "URGENT",  cls: "danger"  },
    pending: { label: "PENDING", cls: "warning" },
    helping: { label: "HELPING", cls: "primary" },
    done:    { label: "DONE",    cls: "success" },
};

/* ── Màu badge theo status ── */
const BADGE_STYLE = {
    danger:  { background: "rgba(220,38,38,0.1)",  color: "#dc2626", border: "1px solid rgba(220,38,38,0.25)"  },
    warning: { background: "rgba(217,119,6,0.1)",  color: "#d97706", border: "1px solid rgba(217,119,6,0.25)"  },
    primary: { background: "rgba(37,99,235,0.1)",  color: "#2563eb", border: "1px solid rgba(37,99,235,0.25)"  },
    success: { background: "rgba(22,163,74,0.1)",  color: "#16a34a", border: "1px solid rgba(22,163,74,0.25)"  },
};

const DOT_COLOR = {
    danger:  "#dc2626",
    warning: "#d97706",
    primary: "#2563eb",
    success: "#16a34a",
};

/* ── Component ── */
export default function LeftPanel() {
    const { sosRequests, loading } = useSOS();

    /* Stats */
    const stats = useMemo(() => [
        {
            title: "CẦN GIÚP",
            value: sosRequests.filter(r => r.status === "urgent").length,
            sub:   `+${last24h(sosRequests, r => r.status === "urgent")} hôm nay`,
            cls:   "danger",
            color: "#dc2626",
            bg:    "rgba(220,38,38,0.06)",
            border:"rgba(220,38,38,0.18)",
            Icon:  AlertOctagon,
        },
        {
            title: "ĐANG XỬ LÝ",
            value: sosRequests.filter(r => r.status === "helping" || r.status === "pending").length,
            sub:   `+${last24h(sosRequests, r => r.status === "helping" || r.status === "pending")} hôm nay`,
            cls:   "warning",
            color: "#d97706",
            bg:    "rgba(217,119,6,0.06)",
            border:"rgba(217,119,6,0.18)",
            Icon:  Clock,
        },
        {
            title: "ĐÃ HỖ TRỢ",
            value: sosRequests.filter(r => r.status === "done").length,
            sub:   `+${last24h(sosRequests, r => r.status === "done")} hôm nay`,
            cls:   "success",
            color: "#16a34a",
            bg:    "rgba(22,163,74,0.06)",
            border:"rgba(22,163,74,0.18)",
            Icon:  CheckCircle2,
        },
        {
            title: "TỔNG SOS",
            value: sosRequests.length,
            sub:   "tất cả thời gian",
            cls:   "primary",
            color: "#2563eb",
            bg:    "rgba(37,99,235,0.06)",
            border:"rgba(37,99,235,0.18)",
            Icon:  ClipboardList,
        },
    ], [sosRequests]);

    /* Hotspots */
    const hotspots = useMemo(() => {
        const map = {};
        sosRequests
            .filter(r => r.status !== "done")
            .forEach(r => {
                const p = r.province || "Không rõ";
                map[p] = (map[p] || 0) + 1;
            });
        return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 4);
    }, [sosRequests]);

    const recentSOS = sosRequests.slice(0, 5);

    /* ── Loading ── */
    if (loading) {
        return (
            <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                height: "100%", gap: 12, padding: 24,
            }}>
                <Loader2 size={28} color="#16a34a"
                         style={{ animation: "spin 1s linear infinite" }} />
                <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>
                    Đang kết nối Firebase...
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    /* ── Main ── */
    return (
        <div style={{
            display:       "flex",
            flexDirection: "column",
            gap:           12,
            padding:       "14px 12px",
            height:        "100%",
            overflowY:     "auto",
        }}>

            {/* ── HEADER SECTION ── */}
            <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 10,
                borderBottom: "1px solid rgba(0,0,0,0.07)",
            }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: 0.5 }}>
                    THỐNG KÊ REALTIME
                </span>
                <span style={{
                    display: "flex", alignItems: "center", gap: 5,
                    fontSize: 10, fontWeight: 700, color: "#16a34a",
                }}>
                    <Wifi size={11} />
                    LIVE
                </span>
            </div>

            {/* ── STATS GRID ── */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
            }}>
                {stats.map((item, i) => (
                    <div key={i} style={{
                        padding:      "12px 10px",
                        borderRadius: 14,
                        border:       `1px solid ${item.border}`,
                        background:   item.bg,
                        display:      "flex",
                        flexDirection:"column",
                        gap:          4,
                    }}>
                        {/* Icon + title */}
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: 8,
                                background: `${item.color}18`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <item.Icon size={14} color={item.color} strokeWidth={2.2} />
                            </div>
                            <span style={{ fontSize: 9.5, fontWeight: 700, color: "#6b7280", letterSpacing: 0.3 }}>
                                {item.title}
                            </span>
                        </div>
                        {/* Value */}
                        <div style={{ fontSize: 30, fontWeight: 800, color: item.color, lineHeight: 1.1 }}>
                            {item.value}
                        </div>
                        {/* Sub */}
                        <div style={{ fontSize: 10, color: item.color, opacity: 0.75, fontWeight: 600 }}>
                            {item.sub}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── DANH SÁCH SOS GẦN ĐÂY ── */}
            <div style={{
                background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 14, padding: "12px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: 0.5, marginBottom: 10 }}>
                    DANH SÁCH SOS GẦN ĐÂY
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {recentSOS.length === 0 ? (
                        <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "16px 0" }}>
                            Chưa có yêu cầu nào
                        </p>
                    ) : recentSOS.map((item, idx) => {
                        const st = STATUS_MAP[item.status] || STATUS_MAP.pending;
                        return (
                            <div key={item.id} style={{
                                display:       "flex",
                                alignItems:    "center",
                                justifyContent:"space-between",
                                padding:       "9px 0",
                                borderBottom:  idx < recentSOS.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                                    {/* Dot */}
                                    <div style={{
                                        width: 8, height: 8, borderRadius: "50%",
                                        background: DOT_COLOR[st.cls],
                                        flexShrink: 0,
                                        boxShadow: `0 0 5px ${DOT_COLOR[st.cls]}80`,
                                    }} />
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{
                                            fontSize: 12, fontWeight: 600, color: "#0f1923",
                                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                            maxWidth: 130,
                                        }}>
                                            {item.name || "—"}
                                        </div>
                                        <div style={{
                                            fontSize: 10, color: "#9ca3af", marginTop: 1,
                                            display: "flex", alignItems: "center", gap: 3,
                                        }}>
                                            <MapPin size={9} />
                                            {item.province || "—"} · {timeAgo(item.createdAt)}
                                        </div>
                                    </div>
                                </div>
                                {/* Badge */}
                                <span style={{
                                    fontSize: 9.5, fontWeight: 700, padding: "2px 7px",
                                    borderRadius: 6, flexShrink: 0, letterSpacing: 0.3,
                                    ...BADGE_STYLE[st.cls],
                                }}>
                                    {st.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── KHU VỰC NỔI BẬT ── */}
            <div style={{
                background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 14, padding: "12px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: 0.5, marginBottom: 10 }}>
                    KHU VỰC NỔI BẬT
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {hotspots.length === 0 ? (
                        <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "12px 0" }}>
                            Không có dữ liệu active
                        </p>
                    ) : hotspots.map(([name, count], i) => {
                        const maxCount = hotspots[0][1];
                        const pct = Math.round((count / maxCount) * 100);
                        return (
                            <div key={i}>
                                <div style={{
                                    display: "flex", alignItems: "center",
                                    justifyContent: "space-between", marginBottom: 4,
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <Flame size={12} color="#ef4444" />
                                        <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
                                            {name}
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: 11, fontWeight: 700, color: "#dc2626",
                                        background: "rgba(220,38,38,0.08)",
                                        border: "1px solid rgba(220,38,38,0.18)",
                                        padding: "1px 7px", borderRadius: 6,
                                    }}>
                                        {count}
                                    </span>
                                </div>
                                {/* Progress bar */}
                                <div style={{
                                    height: 4, background: "rgba(0,0,0,0.06)",
                                    borderRadius: 4, overflow: "hidden",
                                }}>
                                    <div style={{
                                        width: `${pct}%`, height: "100%",
                                        background: "linear-gradient(90deg,#dc2626,#ef4444)",
                                        borderRadius: 4,
                                        transition: "width 0.5s ease",
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Firebase indicator ── */}
            <div style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 12px", borderRadius: 10,
                background: "rgba(22,163,74,0.06)",
                border: "1px solid rgba(22,163,74,0.18)",
                fontSize: 11, color: "#16a34a", fontWeight: 600,
                marginTop: "auto",
            }}>
                <Wifi size={12} />
                <span>Firebase realtime</span>
                <span style={{
                    marginLeft: "auto", background: "#16a34a", color: "white",
                    borderRadius: 6, padding: "1px 8px", fontSize: 11,
                }}>
                    {sosRequests.length} docs
                </span>
            </div>

            <div style={{ fontSize: 10, color: "#c4c9d4", textAlign: "center", paddingBottom: 4 }}>
                © 2026 SOS Miền Trung
            </div>

        </div>
    );
}