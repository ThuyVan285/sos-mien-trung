// src/components/panels/AIPanel.jsx

import { useMemo, useState } from "react";
import {
    ArrowRight, AlertTriangle, Bot, Siren, Gift,
    Users, LocateFixed, X, BarChart2, MapPin,
    TrendingUp, Activity, ShieldCheck, Clock,
    AlertOctagon, CheckCircle2, Zap,
} from "lucide-react";
import { useSOS } from "../../store/SOSContext";

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const STATUS_CFG = {
    urgent:  { label: "Khẩn cấp",    color: "#dc2626", bg: "rgba(220,38,38,0.1)",  Icon: AlertOctagon  },
    pending: { label: "Chờ xử lý",   color: "#d97706", bg: "rgba(217,119,6,0.1)",  Icon: Clock         },
    helping: { label: "Đang hỗ trợ", color: "#2563eb", bg: "rgba(37,99,235,0.1)",  Icon: Activity      },
    done:    { label: "Hoàn thành",  color: "#16a34a", bg: "rgba(22,163,74,0.1)",  Icon: CheckCircle2  },
};

function BarRow({ label, value, max, color, suffix = "" }) {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151",
                    maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {label}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color }}>{value}{suffix}</span>
            </div>
            <div style={{ height: 6, background: "rgba(0,0,0,0.07)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                    width: `${pct}%`, height: "100%", background: color,
                    borderRadius: 4, transition: "width 0.5s ease",
                }} />
            </div>
        </div>
    );
}

function StatMini({ Icon, label, value, color }) {
    return (
        <div style={{
            background: "#f8fafc", border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 12, padding: "12px 10px", textAlign: "center",
        }}>
            <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: `${color}15`, margin: "0 auto 8px",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <Icon size={15} color={color} strokeWidth={2.2} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</div>
        </div>
    );
}

/* ─────────────────────────────────────────
   ANALYSIS MODAL
───────────────────────────────────────── */
function AnalysisModal({ onClose, sosRequests }) {
    const [tab, setTab] = useState("overview"); // overview | province | type | trend

    const analytics = useMemo(() => {
        const total   = sosRequests.length;
        const urgent  = sosRequests.filter(r => r.status === "urgent").length;
        const pending = sosRequests.filter(r => r.status === "pending").length;
        const helping = sosRequests.filter(r => r.status === "helping").length;
        const done    = sosRequests.filter(r => r.status === "done").length;
        const active  = urgent + pending + helping;
        const resolvedRate = total > 0 ? Math.round((done / total) * 100) : 0;

        /* By province */
        const byProv = {};
        sosRequests.forEach(r => {
            const p = r.province || "Không rõ";
            if (!byProv[p]) byProv[p] = { total: 0, urgent: 0, helping: 0, done: 0, pending: 0 };
            byProv[p].total++;
            byProv[p][r.status] = (byProv[p][r.status] || 0) + 1;
        });
        const provinces = Object.entries(byProv)
            .sort((a, b) => b[1].total - a[1].total)
            .slice(0, 8);

        /* By support type */
        const byType = {};
        sosRequests.forEach(r => {
            const t = r.supportType || "Khác";
            byType[t] = (byType[t] || 0) + 1;
        });
        const types = Object.entries(byType).sort((a, b) => b[1] - a[1]).slice(0, 8);

        /* By day (last 7 days) */
        const byDay = {};
        for (let i = 6; i >= 0; i--) {
            const d = new Date(); d.setDate(d.getDate() - i);
            const key = d.toLocaleDateString("vi-VN", { weekday: "short", day: "numeric" });
            byDay[key] = 0;
        }
        sosRequests.forEach(r => {
            const d = new Date(r.createdAt);
            const now = new Date();
            const diffDays = Math.floor((now - d) / 86400000);
            if (diffDays <= 6) {
                const key = d.toLocaleDateString("vi-VN", { weekday: "short", day: "numeric" });
                if (byDay[key] !== undefined) byDay[key]++;
            }
        });
        const trend = Object.entries(byDay);
        const maxTrend = Math.max(...trend.map(([,v]) => v), 1);

        /* AI insights */
        const insights = [];
        if (urgent > 0) {
            const topProv = provinces[0];
            if (topProv) insights.push({
                type: "danger", Icon: AlertTriangle,
                text: `${topProv[0]} có ${topProv[1].urgent || 0} ca khẩn cấp — ưu tiên điều phối ngay.`,
            });
        }
        if (resolvedRate >= 70) insights.push({
            type: "success", Icon: ShieldCheck,
            text: `Tỉ lệ hoàn thành ${resolvedRate}% — hệ thống đang hoạt động hiệu quả.`,
        });
        if (active > 10) insights.push({
            type: "warning", Icon: Zap,
            text: `${active} ca đang active — cần thêm tình nguyện viên hỗ trợ.`,
        });
        if (insights.length === 0) insights.push({
            type: "info", Icon: Bot,
            text: "Hệ thống ổn định. Chưa phát hiện điểm bất thường.",
        });

        return { total, urgent, pending, helping, done, active, resolvedRate, provinces, types, trend, maxTrend, insights };
    }, [sosRequests]);

    const TABS = [
        { key: "overview", label: "Tổng quan",     Icon: BarChart2   },
        { key: "province", label: "Theo tỉnh",     Icon: MapPin      },
        { key: "type",     label: "Loại hỗ trợ",   Icon: Activity    },
        { key: "trend",    label: "Xu hướng",      Icon: TrendingUp  },
    ];

    const INSIGHT_COLOR = { danger: "#dc2626", success: "#16a34a", warning: "#d97706", info: "#2563eb" };
    const INSIGHT_BG    = { danger: "rgba(220,38,38,0.06)", success: "rgba(22,163,74,0.06)", warning: "rgba(217,119,6,0.06)", info: "rgba(37,99,235,0.06)" };

    return (
        <div style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
            zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
        }} onClick={onClose}>
            <div style={{
                width: "100%", maxWidth: 740, maxHeight: "88vh",
                background: "#ffffff", borderRadius: 22,
                boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
                display: "flex", flexDirection: "column", overflow: "hidden",
            }} onClick={e => e.stopPropagation()}>

                {/* ── HEADER ── */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "18px 24px", borderBottom: "1px solid rgba(0,0,0,0.07)",
                    background: "rgba(22,163,74,0.04)", flexShrink: 0,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <BarChart2 size={20} color="#16a34a" />
                        </div>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: "#0f1923" }}>Phân tích AI chi tiết</div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                                Dữ liệu realtime từ Firebase · {analytics.total} bản ghi
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: 34, height: 34, borderRadius: 10,
                        border: "1px solid rgba(0,0,0,0.1)", background: "#f8fafc",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: "#9ca3af",
                    }}>
                        <X size={16} />
                    </button>
                </div>

                {/* ── TABS ── */}
                <div style={{
                    display: "flex", gap: 4, padding: "12px 24px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.07)", flexShrink: 0,
                }}>
                    {TABS.map(t => (
                        <button key={t.key} onClick={() => setTab(t.key)} style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: "10px 10px 0 0",
                            border: "1px solid transparent", borderBottom: "none",
                            cursor: "pointer", fontFamily: "inherit",
                            fontSize: 12, fontWeight: 600,
                            background: tab === t.key ? "rgba(22,163,74,0.07)" : "transparent",
                            color:      tab === t.key ? "#16a34a" : "#9ca3af",
                            borderColor: tab === t.key ? "rgba(22,163,74,0.2)" : "transparent",
                        }}>
                            <t.Icon size={13} />
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* ── BODY ── */}
                <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

                    {/* ══ OVERVIEW ══ */}
                    {tab === "overview" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {/* Stat mini cards */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                                <StatMini Icon={AlertOctagon}  label="Khẩn cấp"   value={analytics.urgent}        color="#dc2626" />
                                <StatMini Icon={Clock}         label="Chờ xử lý"  value={analytics.pending}       color="#d97706" />
                                <StatMini Icon={Activity}      label="Đang hỗ trợ" value={analytics.helping}      color="#2563eb" />
                                <StatMini Icon={CheckCircle2}  label="Hoàn thành" value={analytics.done}          color="#16a34a" />
                            </div>

                            {/* Status breakdown */}
                            <div style={{
                                background: "#f8fafc", border: "1px solid rgba(0,0,0,0.07)",
                                borderRadius: 16, padding: 16,
                            }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 14 }}>
                                    Phân bổ theo trạng thái
                                </div>
                                {Object.entries(STATUS_CFG).map(([key, cfg]) => {
                                    const count = analytics[key] ?? 0;
                                    return (
                                        <BarRow key={key}
                                                label={cfg.label} value={count}
                                                max={analytics.total || 1} color={cfg.color}
                                        />
                                    );
                                })}
                                <div style={{
                                    marginTop: 12, paddingTop: 12,
                                    borderTop: "1px solid rgba(0,0,0,0.07)",
                                    display: "flex", justifyContent: "space-between",
                                    fontSize: 12, color: "#6b7280",
                                }}>
                                    <span>Tổng: <strong style={{ color: "#0f1923" }}>{analytics.total}</strong></span>
                                    <span>Tỉ lệ hoàn thành: <strong style={{ color: "#16a34a" }}>{analytics.resolvedRate}%</strong></span>
                                    <span>Đang active: <strong style={{ color: "#dc2626" }}>{analytics.active}</strong></span>
                                </div>
                            </div>

                            {/* AI Insights */}
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10,
                                    display: "flex", alignItems: "center", gap: 6 }}>
                                    <Bot size={14} color="#16a34a" /> AI Insights
                                </div>
                                {analytics.insights.map((ins, i) => (
                                    <div key={i} style={{
                                        display: "flex", gap: 10, alignItems: "flex-start",
                                        padding: "10px 12px", borderRadius: 12,
                                        background: INSIGHT_BG[ins.type],
                                        border: `1px solid ${INSIGHT_COLOR[ins.type]}25`,
                                        marginBottom: 8,
                                    }}>
                                        <ins.Icon size={15} color={INSIGHT_COLOR[ins.type]} style={{ flexShrink: 0, marginTop: 1 }} />
                                        <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.5, margin: 0 }}>{ins.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══ PROVINCE ══ */}
                    {tab === "province" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ fontSize: 12, color: "#6b7280" }}>
                                Top {analytics.provinces.length} tỉnh/thành có nhiều SOS nhất
                            </div>

                            {analytics.provinces.length === 0 ? (
                                <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Chưa có dữ liệu</p>
                            ) : analytics.provinces.map(([prov, data], i) => (
                                <div key={prov} style={{
                                    background: "#f8fafc", border: "1px solid rgba(0,0,0,0.07)",
                                    borderRadius: 14, padding: "14px 16px",
                                    borderLeft: `3px solid ${i === 0 ? "#dc2626" : i === 1 ? "#d97706" : "#16a34a"}`,
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{
                                                width: 22, height: 22, borderRadius: 6, background: "#0f1923",
                                                color: "white", display: "flex", alignItems: "center",
                                                justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0,
                                            }}>#{i + 1}</span>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: "#0f1923" }}>{prov}</span>
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: "#6b7280" }}>
                                            {data.total} yêu cầu
                                        </span>
                                    </div>
                                    {/* Mini status bars */}
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {Object.entries(STATUS_CFG).map(([key, cfg]) => {
                                            const c = data[key] || 0;
                                            if (c === 0) return null;
                                            return (
                                                <span key={key} style={{
                                                    fontSize: 10, fontWeight: 700, padding: "2px 8px",
                                                    borderRadius: 6, background: cfg.bg, color: cfg.color,
                                                    border: `1px solid ${cfg.color}30`,
                                                }}>
                                                    {cfg.label}: {c}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    {/* Bar */}
                                    <div style={{ marginTop: 10, height: 4, background: "rgba(0,0,0,0.07)", borderRadius: 4, overflow: "hidden" }}>
                                        <div style={{
                                            width: `${Math.round((data.total / analytics.provinces[0][1].total) * 100)}%`,
                                            height: "100%", borderRadius: 4,
                                            background: i === 0 ? "#dc2626" : i === 1 ? "#d97706" : "#16a34a",
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ══ TYPE ══ */}
                    {tab === "type" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ fontSize: 12, color: "#6b7280" }}>
                                Phân loại theo nhu cầu hỗ trợ
                            </div>

                            {analytics.types.length === 0 ? (
                                <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Chưa có dữ liệu</p>
                            ) : (
                                <div style={{
                                    background: "#f8fafc", border: "1px solid rgba(0,0,0,0.07)",
                                    borderRadius: 16, padding: 16,
                                }}>
                                    {analytics.types.map(([type, count], i) => {
                                        const colors = ["#dc2626","#d97706","#2563eb","#16a34a","#7c3aed","#0891b2","#ea580c","#4f46e5"];
                                        const c = colors[i % colors.length];
                                        return (
                                            <BarRow key={type}
                                                    label={type} value={count}
                                                    max={analytics.types[0][1]} color={c}
                                            />
                                        );
                                    })}
                                </div>
                            )}

                            {/* Summary table */}
                            {analytics.types.length > 0 && (
                                <div style={{
                                    background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)",
                                    borderRadius: 14, overflow: "hidden",
                                }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                                        <thead>
                                        <tr style={{ background: "#f8fafc", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                                            <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#6b7280", fontSize: 11 }}>Loại hỗ trợ</th>
                                            <th style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, color: "#6b7280", fontSize: 11 }}>Số lượng</th>
                                            <th style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, color: "#6b7280", fontSize: 11 }}>Tỉ lệ</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {analytics.types.map(([type, count]) => (
                                            <tr key={type} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                                                <td style={{ padding: "9px 14px", color: "#374151", fontWeight: 600 }}>{type}</td>
                                                <td style={{ padding: "9px 14px", textAlign: "right", color: "#0f1923", fontWeight: 700 }}>{count}</td>
                                                <td style={{ padding: "9px 14px", textAlign: "right", color: "#16a34a", fontWeight: 700 }}>
                                                    {analytics.total > 0 ? Math.round((count / analytics.total) * 100) : 0}%
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ══ TREND ══ */}
                    {tab === "trend" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ fontSize: 12, color: "#6b7280" }}>
                                Số yêu cầu SOS theo ngày (7 ngày gần nhất)
                            </div>

                            {/* Bar chart */}
                            <div style={{
                                background: "#f8fafc", border: "1px solid rgba(0,0,0,0.07)",
                                borderRadius: 16, padding: "20px 16px",
                            }}>
                                <div style={{
                                    display: "flex", alignItems: "flex-end",
                                    gap: 8, height: 140, paddingBottom: 4,
                                }}>
                                    {analytics.trend.map(([day, count]) => {
                                        const pct = analytics.maxTrend > 0
                                            ? Math.round((count / analytics.maxTrend) * 100)
                                            : 0;
                                        return (
                                            <div key={day} style={{
                                                flex: 1, display: "flex",
                                                flexDirection: "column", alignItems: "center", gap: 4,
                                            }}>
                                                <span style={{ fontSize: 10, fontWeight: 700, color: count > 0 ? "#dc2626" : "#c4c9d4" }}>
                                                    {count > 0 ? count : ""}
                                                </span>
                                                <div style={{
                                                    width: "100%", maxWidth: 36,
                                                    height: `${Math.max(pct, 4)}%`,
                                                    minHeight: 4,
                                                    background: count > 0
                                                        ? `linear-gradient(180deg, #dc2626, #ef4444)`
                                                        : "rgba(0,0,0,0.08)",
                                                    borderRadius: "4px 4px 0 0",
                                                    transition: "height 0.5s ease",
                                                }} />
                                                <span style={{
                                                    fontSize: 9, color: "#9ca3af", textAlign: "center",
                                                    whiteSpace: "nowrap", fontWeight: 500,
                                                }}>
                                                    {day}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Summary */}
                            <div style={{
                                display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10,
                            }}>
                                {[
                                    { label: "Tổng 7 ngày", value: analytics.trend.reduce((s,[,v]) => s+v, 0), color: "#2563eb" },
                                    { label: "Cao nhất/ngày", value: analytics.maxTrend, color: "#dc2626" },
                                    { label: "TB/ngày", value: (analytics.trend.reduce((s,[,v]) => s+v,0) / 7).toFixed(1), color: "#16a34a" },
                                ].map((s, i) => (
                                    <div key={i} style={{
                                        background: "#f8fafc", border: "1px solid rgba(0,0,0,0.07)",
                                        borderRadius: 12, padding: "12px", textAlign: "center",
                                    }}>
                                        <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
                                        <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, fontWeight: 600 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── FOOTER ── */}
                <div style={{
                    padding: "12px 24px", borderTop: "1px solid rgba(0,0,0,0.07)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexShrink: 0, background: "#fafafa",
                }}>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>
                        Cập nhật realtime · {analytics.total} bản ghi
                    </span>
                    <button onClick={onClose} style={{
                        height: 34, padding: "0 18px", borderRadius: 10,
                        border: "1px solid rgba(0,0,0,0.1)", background: "#ffffff",
                        color: "#4b5563", fontSize: 12, fontWeight: 600,
                        cursor: "pointer", fontFamily: "inherit",
                    }}>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   AI PANEL MAIN
───────────────────────────────────────── */
export default function AIPanel() {
    const { setIsFormOpen, setIsDonationOpen, setIsVolunteerOpen, sosRequests } = useSOS();
    const [showAnalysis, setShowAnalysis] = useState(false);

    const suggestions = useMemo(() => {
        const result = [];

        const urgentByProv = {};
        sosRequests.filter(r => r.status === "urgent").forEach(r => {
            const p = r.province || "Không rõ";
            urgentByProv[p] = (urgentByProv[p] || 0) + 1;
        });
        const topUrgent = Object.entries(urgentByProv).sort((a, b) => b[1] - a[1]);

        if (topUrgent.length > 0) {
            const [prov, count] = topUrgent[0];
            result.push({
                icon: <AlertTriangle size={15} color="#dc2626" />,
                title: `${prov} đang quá tải`,
                desc: `${count} ca khẩn cấp chưa được xử lý.`,
                type: "danger",
            });
        }

        const allByProv = {};
        sosRequests.filter(r => r.status !== "done").forEach(r => {
            const p = r.province || "Không rõ";
            allByProv[p] = (allByProv[p] || 0) + 1;
        });
        const topProv = Object.entries(allByProv).sort((a, b) => b[1] - a[1]);

        if (topProv.length > 0) {
            const needed = Math.ceil(topProv[0][1] / 5);
            result.push({
                icon: <Bot size={15} color="#2563eb" />,
                title: `Cần thêm ${needed} TNV tại ${topProv[0][0]}`,
                desc: "AI đề xuất điều phối từ khu vực lân cận.",
                type: "info",
            });
        }

        if (result.length === 0) {
            result.push(
                { icon: <ShieldCheck size={15} color="#16a34a" />, title: "Hệ thống ổn định", desc: "Chưa phát hiện điểm bất thường.", type: "info" },
            );
        }
        return result;
    }, [sosRequests]);

    const handleLocateMe = () => {
        window.dispatchEvent(new Event('trigger-locate-me'));
    };

    const floatBtns = [
        { label: "GỬI SOS",          Icon: Siren,       color: "#dc2626", onClick: () => setIsFormOpen(true)     },
        { label: "QUYÊN GÓP",        Icon: Gift,        color: "#7c3aed", onClick: () => setIsDonationOpen(true)  },
        { label: "TÌNH NGUYỆN VIÊN", Icon: Users,       color: "#d97706", onClick: () => setIsVolunteerOpen(true) },
        { label: "ĐỊNH VỊ TÔI",      Icon: LocateFixed, color: "#16a34a", onClick: handleLocateMe                },
    ];

    return (
        <>
            <div style={{
                display: "flex", flexDirection: "column",
                gap: 12, padding: "14px 12px", height: "100%",
            }}>
                {/* ── Header ── */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingBottom: 10, borderBottom: "1px solid rgba(0,0,0,0.07)",
                }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: 0.5 }}>
                        AI SUGGESTION
                    </span>
                    <span style={{
                        background: "linear-gradient(135deg,#16a34a,#15803d)",
                        fontSize: 10, fontWeight: 700, padding: "2px 8px",
                        borderRadius: 6, color: "white",
                    }}>AI</span>
                </div>

                {/* ── Suggestion cards ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {suggestions.map((s, i) => (
                        <div key={i} style={{
                            padding: "10px 12px", borderRadius: 12, border: "1px solid",
                            background: s.type === "danger" ? "rgba(220,38,38,0.05)" : "rgba(22,163,74,0.05)",
                            borderColor: s.type === "danger" ? "rgba(220,38,38,0.2)" : "rgba(22,163,74,0.2)",
                        }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 5 }}>
                                {s.icon}
                                <strong style={{ fontSize: 12, color: "#0f1923", lineHeight: 1.4 }}>{s.title}</strong>
                            </div>
                            {s.desc && <p style={{ fontSize: 11, color: "#6b7280", paddingLeft: 23, lineHeight: 1.5, margin: 0 }}>{s.desc}</p>}
                        </div>
                    ))}

                    {/* ── Phân tích chi tiết button ── */}
                    <button
                        onClick={() => setShowAnalysis(true)}
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            width: "100%", padding: "10px 14px", borderRadius: 10,
                            border: "1px solid rgba(22,163,74,0.25)",
                            background: "rgba(22,163,74,0.06)", color: "#16a34a",
                            fontSize: 12, fontWeight: 600, cursor: "pointer",
                            fontFamily: "inherit", transition: "0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(22,163,74,0.12)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(22,163,74,0.06)"}
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <BarChart2 size={13} />
                            Xem phân tích chi tiết
                        </span>
                        <ArrowRight size={13} />
                    </button>
                </div>

                {/* ── Float action buttons ── */}
                <div style={{
                    marginTop: "auto", display: "flex", flexDirection: "column", gap: 8,
                    paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.07)",
                }}>
                    {floatBtns.map((btn, i) => (
                        <button key={i} onClick={btn.onClick} style={{
                            display: "flex", alignItems: "center", gap: 12,
                            width: "100%", height: 46, padding: "0 14px",
                            borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)",
                            background: "#ffffff", cursor: "pointer",
                            fontFamily: "inherit", transition: "0.18s",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                        }}
                                onMouseEnter={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.borderColor = "rgba(22,163,74,0.25)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
                        >
                            <div style={{
                                width: 32, height: 32, borderRadius: 9,
                                background: btn.color,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                                boxShadow: `0 3px 10px ${btn.color}50`,
                            }}>
                                <btn.Icon size={15} color="white" strokeWidth={2.2} />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: 0.3 }}>
                                {btn.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Analysis Modal ── */}
            {showAnalysis && (
                <AnalysisModal
                    onClose={() => setShowAnalysis(false)}
                    sosRequests={sosRequests}
                />
            )}
        </>
    );
}