import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header.jsx";
import { useSOS } from "../store/SOSContext";
import MiniMap from "../components/map/MiniMap";
import { addContact } from "../services/firestoreService";
import { useLiveStats } from "../hooks/useLiveStats";
import {
    TriangleAlert, Clock3, ShieldCheck, MapPinned,
    HeartHandshake, ClipboardList, HandHelping, House,
    Users, Building2, Target, ChartNoAxesColumnIncreasing,
    BookOpen, MapPin, MessageCircle, Phone, Mail, ChevronRight,
    CheckCircle2, Siren, Gift, ArrowRight, Loader2, CheckCircle, AlertCircle,
} from "lucide-react";

function usePlusJakartaSans() {
    useEffect(() => {
        const id = "plus-jakarta-font";
        if (!document.getElementById(id)) {
            const link = document.createElement("link");
            link.id = id;
            link.rel = "stylesheet";
            link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,600;0,700;0,800;0,900;1,700&display=swap";
            document.head.appendChild(link);
        }
    }, []);
}

const H = "'Plus Jakarta Sans', 'Be Vietnam Pro', sans-serif";

// ── MapSOSPanel: KHÔNG có position absolute, parent xử lý ──
function MapSOSPanel({ sosRequests = [] }) {
    const byProvince = {};
    sosRequests.forEach(r => {
        if (!r.province) return;
        if (!byProvince[r.province]) byProvince[r.province] = { urgent: 0, helping: 0, done: 0, pending: 0 };
        byProvince[r.province][r.status] = (byProvince[r.province][r.status] || 0) + 1;
    });

    const top4 = Object.entries(byProvince)
        .map(([province, counts]) => ({
            province,
            active: (counts.urgent || 0) + (counts.helping || 0) + (counts.pending || 0),
            done: counts.done || 0,
            urgent: counts.urgent || 0,
        }))
        .sort((a, b) => b.active - a.active)
        .slice(0, 4);

    const items = top4.length > 0 ? top4 : [
        { province: "Quảng Ngãi",  active: 15, done: 0, urgent: 15 },
        { province: "TP. Đà Nẵng", active: 8,  done: 0, urgent: 5  },
        { province: "TP. Huế",     active: 12, done: 0, urgent: 8  },
        { province: "Nghệ An",     active: 0,  done: 5, urgent: 0  },
    ];

    const getColor = (item) => {
        if (item.done > 0 && item.active === 0) return "#22c55e";
        if (item.urgent > 5) return "#ef4444";
        return "#f59e0b";
    };

    return (
        <div>
            <div style={{ color: "#22c55e", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, marginBottom: 14, textTransform: "uppercase" }}>
                YÊU CẦU GẦN ĐÂY
            </div>
            {items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: i < items.length - 1 ? 12 : 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: getColor(item), flexShrink: 0 }} />
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{item.province}</div>
                        <div style={{ fontSize: 11, color: "#6b7280" }}>
                            {item.done > 0 && item.active === 0 ? "Đã hỗ trợ" : `${item.active} người cần hỗ trợ`}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Homepage() {
    const { setIsFormOpen, setIsDonationOpen, setIsVolunteerOpen, sosRequests } = useSOS();
    const navigate = useNavigate();
    usePlusJakartaSans();

    // ── Hooks ở top level ──
    const { heroStats, statCards, aiSuggestions } = useLiveStats();

    // ── Tính stats từ sosRequests ──
    const urgent  = sosRequests.filter(r => r.status === "urgent").length;
    const helping = sosRequests.filter(r => r.status === "helping" || r.status === "pending").length;
    const done    = sosRequests.filter(r => r.status === "done").length;

    const todayCount = (fn) => sosRequests.filter(r => {
        const h = (Date.now() - new Date(r.createdAt)) / 3_600_000;
        return h < 24 && fn(r);
    }).length;

    const liveStats = {
        urgent, helping, done,
        total: urgent + helping + done,
        provinces: new Set(sosRequests.filter(r => r.status !== "done").map(r => r.province).filter(Boolean)).size,
        todayUrgent:  todayCount(r => r.status === "urgent"),
        todayHelping: todayCount(r => r.status === "helping" || r.status === "pending"),
        todayDone:    todayCount(r => r.status === "done"),
    };

    // ── Contact form ──
    const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", message: "" });
    const [contactState, setContactState] = useState("idle");
    const formRef = useRef(null);

    const handleContactChange = (field, val) => setContactForm(prev => ({ ...prev, [field]: val }));

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.message) return;
        setContactState("loading");
        try {
            await addContact(contactForm);
            setContactState("success");
            setContactForm({ name: "", phone: "", email: "", message: "" });
            setTimeout(() => setContactState("idle"), 4000);
        } catch (err) {
            console.error(err);
            setContactState("error");
            setTimeout(() => setContactState("idle"), 3000);
        }
    };

    // ── Footer nav ──
    const scrollTo = (id) => {
        if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const footerNavItems = [
        { label: "Trang chủ",      action: () => scrollTo("home") },
        { label: "Bản đồ cứu trợ", action: () => navigate("/map") },
        { label: "Quy trình",      action: () => scrollTo("quy-trinh") },
        { label: "Thống kê",       action: () => scrollTo("thong-ke") },
        { label: "Liên hệ",        action: () => scrollTo("lien-he") },
    ];

    return (
        <div className="Homepage min-h-screen bg-[#f0f4f8] text-[#0f1923] font-sans">
            <Header />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>

                {/* ══ HERO ══ */}
                <section id="home" style={{ width: "100%", maxWidth: 1500, padding: "48px 32px 24px", margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, alignItems: "center" }}>
                        {/* LEFT */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 10 }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "white", border: "1px solid #e5e7eb", borderRadius: 99, padding: "6px 14px", fontSize: 11, fontWeight: 600, color: "#4b5563", width: "fit-content", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                                <MapPin size={14} color="#16a34a" /> Hệ thống hỗ trợ thiên tai Miền Trung
                            </div>
                            <div style={{ lineHeight: 1.05 }}>
                                <div style={{ fontFamily: H, fontSize: 88, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1 }}>
                                    <span style={{ color: "#16a34a" }}>SOS </span>
                                    <span style={{ color: "#0f1923" }}>MIỀN</span>
                                </div>
                                <div style={{ fontFamily: H, fontSize: 88, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "#0f1923" }}>TRUNG</div>
                                <div style={{ fontFamily: H, fontSize: 36, fontWeight: 700, color: "#1f2937", marginTop: 8 }}>Bản đồ cứu trợ</div>
                                <div style={{ fontFamily: H, fontSize: 36, fontWeight: 700, color: "#16a34a" }}>thời gian thực</div>
                            </div>
                            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, maxWidth: 400, margin: 0 }}>
                                Nền tảng hỗ trợ kết nối người dân, tình nguyện viên và lực lượng cứu trợ trong các tình huống thiên tai tại miền Trung Việt Nam.
                            </p>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                <button onClick={() => setIsFormOpen(true)} style={{ display: "flex", alignItems: "center", gap: 8, background: "#16a34a", color: "white", border: "none", borderRadius: 12, padding: "13px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(22,163,74,0.3)", fontFamily: "inherit" }}>
                                    <Users size={16} strokeWidth={2} /> Gửi yêu cầu SOS
                                </button>
                                <Link to="/map" style={{ display: "flex", alignItems: "center", gap: 8, background: "white", color: "#374151", border: "2px solid #e5e7eb", borderRadius: 12, padding: "13px 24px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                                    <BookOpen size={16} strokeWidth={2} /> Mở bản đồ cứu trợ
                                </Link>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                                {[
                                    { value: heroStats[0]?.value ?? "11",   label: "Khu vực hỗ trợ",  icon: <HeartHandshake size={18} />, bg: "#ecfdf5", color: "#16a34a" },
                                    { value: heroStats[1]?.value ?? "120+", label: "Yêu cầu cứu trợ", icon: <ClipboardList size={18} />,  bg: "#eff6ff", color: "#2563eb" },
                                    { value: heroStats[2]?.value ?? "50+",  label: "Tình nguyện viên",icon: <Users size={18} />,          bg: "#ecfdf5", color: "#16a34a" },
                                    { value: heroStats[3]?.value ?? "30",   label: "Điểm hỗ trợ",     icon: <Building2 size={18} />,      bg: "#eff6ff", color: "#2563eb" },
                                ].map((s, i) => (
                                    <div key={i} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                                        <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>{s.icon}</div>
                                        <div>
                                            <div style={{ fontSize: 18, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{s.value}</div>
                                            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3, lineHeight: 1.3 }}>{s.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* RIGHT */}
                        <div style={{ position: "relative", height: 580, marginRight: -32 }}>
                            <img src="/hero-bg.png" alt="Cứu hộ miền Trung" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: "0 24px 24px 0" }} />
                        </div>
                    </div>
                </section>

                {/* ══ LIVE STATS BAR ══ */}
                <section style={{ width: "100%", maxWidth: 1500, padding: "0 32px 40px", margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
                        {[
                            { label: "CẦN GIÚP",    count: liveStats.urgent,  color: "#dc2626", iconBg: "#fee2e2", change: `+${liveStats.todayUrgent}`,  icon: <TriangleAlert size={34} />, watermark: <HeartHandshake size={40} /> },
                            { label: "ĐANG XỬ LÝ", count: liveStats.helping, color: "#ea580c", iconBg: "#ffedd5", change: `+${liveStats.todayHelping}`, icon: <Clock3 size={34} />,        watermark: <ClipboardList size={90} /> },
                            { label: "ĐÃ HỖ TRỢ",  count: liveStats.done,    color: "#16a34a", iconBg: "#dcfce7", change: `+${liveStats.todayDone}`,    icon: <ShieldCheck size={34} />,   watermark: <HandHelping size={90} /> },
                            { label: "TỔNG SOS",    count: liveStats.total,   color: "#2563eb", iconBg: "#dbeafe", change: `${liveStats.provinces} tỉnh`, icon: <MapPinned size={34} />,    watermark: <House size={90} /> },
                        ].map((s, i) => (
                            <div key={i} style={{ position: "relative", overflow: "hidden", background: "#ffffff", borderRadius: 24, padding: 28, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,0.05)" }}>
                                <div style={{ position: "absolute", right: 24, top: 70, color: s.color, opacity: 0.06 }}>{s.watermark}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: s.iconBg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: 1, color: s.color, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
                                        <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1, color: "#111827" }}>{s.count}</div>
                                        <div style={{ marginTop: 4, fontSize: 13, fontWeight: 600 }}>
                                            <span style={{ color: s.color }}>↑ {s.change}</span>
                                            <span style={{ color: "#374151" }}> hôm nay</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: s.color, opacity: 0.8 }} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══ MỤC TIÊU ══ */}
                <section style={{ width: "100%", maxWidth: 1500, padding: "40px 32px", margin: "0 auto", borderTop: "1px solid #f1f5f9" }}>
                    <h2 style={{ fontFamily: H, fontSize: 40, fontWeight: 800, textAlign: "center", marginBottom: 40, color: "#111827" }}>Mục tiêu của chúng tôi</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                        {[
                            { title: "Kết nối nhanh chóng", desc: "Kết nối người dân, tình nguyện viên và lực lượng cứu trợ một cách nhanh nhất trong mọi tình huống.", icon: <Users size={34} /> },
                            { title: "Điều phối hiệu quả",  desc: "Điều phối nguồn lực cứu trợ thông minh, đúng nơi - đúng thời điểm - đúng nhu cầu.", icon: <Target size={34} /> },
                            { title: "Minh bạch & chính xác", desc: "Cung cấp dữ liệu thời gian thực, minh bạch, giúp ra quyết định nhanh chóng và chính xác.", icon: <ChartNoAxesColumnIncreasing size={34} /> },
                        ].map((g, i) => (
                            <div key={i} style={{ background: "#ffffff", borderRadius: 24, border: "1px solid #e5e7eb", padding: "36px 28px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                                <div style={{ width: 84, height: 84, margin: "0 auto 24px", borderRadius: "50%", background: "#f0fdf4", border: "1px solid #dcfce7", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a" }}>{g.icon}</div>
                                <h3 style={{ fontSize: 28, fontWeight: 700, color: "#111827", marginBottom: 16 }}>{g.title}</h3>
                                <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, margin: 0 }}>{g.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══ MAP SECTION ══ */}
                <section id="ban-do" style={{ width: "100%", background: "#f8fafc", padding: "80px 0", scrollMarginTop: "80px" }}>
                    <div style={{ maxWidth: 1500, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 60, alignItems: "center" }}>
                        {/* LEFT text */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            <div>
                                <div style={{ fontFamily: H, fontSize: 44, fontWeight: 800, lineHeight: 1.1, color: "#111827" }}>Hệ thống bản đồ</div>
                                <div style={{ fontFamily: H, fontSize: 72, fontWeight: 900, color: "#22c55e", lineHeight: 1 }}>TRỰC QUAN</div>
                            </div>
                            <p style={{ fontSize: 16, lineHeight: 1.9, color: "#6b7280", maxWidth: 500, margin: 0 }}>
                                Theo dõi tình hình cứu trợ theo thời gian thực trên nền tảng VietMap. Dễ dàng xác định điểm SOS, khu vực nguy hiểm, tuyến cứu trợ và các điểm hỗ trợ gần nhất.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {["Cập nhật thời gian thực 24/7","Định vị chính xác bằng VietMap","Cảnh báo ngập lụt & sạt lở","Tuyến đường cứu trợ tối ưu","Theo dõi trạng thái hỗ trợ"].map((item, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, color: "#374151", fontWeight: 500 }}>
                                        <CheckCircle2 size={20} color="#22c55e" /> {item}
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => navigate("/map")} style={{ width: "fit-content", display: "flex", alignItems: "center", gap: 10, padding: "15px 24px", border: "none", borderRadius: 14, background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 10px 30px rgba(34,197,94,0.25)" }}>
                                Trải nghiệm bản đồ ngay <ArrowRight size={18} />
                            </button>
                        </div>

                        {/* RIGHT — Map container, isolation để fix z-index Leaflet */}
                        <div style={{ position: "relative", height: 560, borderRadius: 30, overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.15)", border: "1px solid #e5e7eb", isolation: "isolate" }}>

                            {/* Bản đồ — z-index 0 */}
                            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                                <MiniMap interactive={false} />
                            </div>

                            {/* LIVE badge — z-index 10 */}
                            <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", padding: "8px 14px", borderRadius: 999, display: "flex", alignItems: "center", gap: 8, zIndex: 10, border: "1px solid #e5e7eb", pointerEvents: "none" }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", animation: "livePulse 1.5s infinite" }} />
                                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "#111827" }}>LIVE</span>
                            </div>

                            {/* SOS Panel — z-index 10 */}
                            <div style={{ position: "absolute", left: 20, top: 20, width: 220, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(18px)", borderRadius: 20, padding: 18, zIndex: 10, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.12)", pointerEvents: "none" }}>
                                <MapSOSPanel sosRequests={sosRequests} />
                            </div>

                            {/* Action buttons — z-index 10 */}
                            <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 12, zIndex: 10 }}>
                                {[
                                    { label: "SOS",       icon: <Siren size={18} />,    bg: "#ef4444", shadow: "rgba(239,68,68,0.4)",    onClick: () => setIsFormOpen(true) },
                                    { label: "Quyên góp", icon: <Gift size={18} />,     bg: "#22c55e", shadow: "rgba(34,197,94,0.4)",   onClick: () => setIsDonationOpen(true) },
                                    { label: "T.N.V",     icon: <Users size={18} />,    bg: "#2563eb", shadow: "rgba(37,99,235,0.4)",   onClick: () => setIsVolunteerOpen(true) },
                                    { label: "Định vị",   icon: <MapPinned size={18} />,bg: "#7c3aed", shadow: "rgba(124,58,237,0.4)",  onClick: () => navigate("/map") },
                                ].map((btn, i) => (
                                    <button key={i} onClick={btn.onClick} style={{ width: 140, height: 56, background: btn.bg, color: "white", border: "none", borderRadius: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: `0 4px 14px ${btn.shadow}` }}>
                                        {btn.icon} {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* ← đóng grid div */}
                    </div>
                </section>

                {/* ══ QUY TRÌNH ══ */}
                <section id="quy-trinh" style={{ width: "100%", borderTop: "1px solid #f1f5f9", background: "white", padding: "64px 0", scrollMarginTop: "80px" }}>
                    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
                        <h2 style={{ fontFamily: H, fontSize: 40, fontWeight: 800, textAlign: "center", marginBottom: 40, color: "#111827" }}>Quy trình hoạt động</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 1fr 48px 1fr 48px 1fr 48px 1fr", alignItems: "start", gap: 0 }}>
                            {[
                                { title: "Người dân gửi SOS",    desc: "Người dân gửi yêu cầu cứu trợ bằng form SOS. Thông tin được ghi nhận ngay và chuyển đến trung tâm điều phối.", color: "#dc2626", bg: "linear-gradient(145deg,#fecaca,#fca5a5)" },
                                null,
                                { title: "Hệ thống định vị",     desc: "Hệ thống xác định vị trí chính xác và phân loại mức độ khẩn cấp. GPS được xử lý tự động trong vài giây.", color: "#16a34a", bg: "linear-gradient(145deg,#dcfce7,#bbf7d0)" },
                                null,
                                { title: "TNV nhanh hỗ trợ",     desc: "Tình nguyện viên gần nhất nhận thông báo và xác nhận. Thời gian phản hồi tối ưu theo khoảng cách địa lý.", color: "#16a34a", bg: "linear-gradient(145deg,#dcfce7,#bbf7d0)" },
                                null,
                                { title: "Điều phối cứu trợ",    desc: "Lực lượng được điều phối đến đúng vị trí. Nguồn lực phân bổ hợp lý, tránh chồng chéo và lãng phí.", color: "#16a34a", bg: "linear-gradient(145deg,#dcfce7,#bbf7d0)" },
                                null,
                                { title: "Hoàn thành & cập nhật",desc: "Cập nhật trạng thái và báo cáo minh bạch. Dữ liệu lưu trữ để phân tích và cải thiện quy trình về sau.", color: "#16a34a", bg: "linear-gradient(145deg,#dcfce7,#bbf7d0)" },
                            ].map((item, i) => {
                                if (item === null) return (
                                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 28 }}>
                                        <svg width="48" height="20" viewBox="0 0 48 20">
                                            <line x1="0" y1="10" x2="36" y2="10" stroke="#16a34a" strokeWidth="2.2" strokeDasharray="6,4"/>
                                            <polygon points="34,4 46,10 34,16" fill="#16a34a"/>
                                        </svg>
                                    </div>
                                );
                                const stepNum = [0,2,4,6,8].indexOf(i) + 1;
                                return (
                                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 4px" }}>
                                        <div style={{ width: 76, height: 76, borderRadius: "50%", background: item.bg, border: `2px solid ${item.color}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                                            <span style={{ fontSize: 24, fontWeight: 900, color: item.color }}>{stepNum}</span>
                                            <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: 22, height: 22, borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{stepNum}</div>
                                        </div>
                                        <h3 style={{ marginTop: 22, marginBottom: 6, fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{item.title}</h3>
                                        <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ══ THỐNG KÊ NỔI BẬT ══ */}
                <section id="thong-ke" style={{ width: "100%", borderTop: "1px solid #f1f5f9", padding: "64px 0", scrollMarginTop: "80px" }}>
                    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
                        <h2 style={{ fontFamily: H, fontSize: 40, fontWeight: 800, textAlign: "center", color: "#111827", marginBottom: 16 }}>Thống kê nổi bật</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, background: "white", border: "1px solid #f1f5f9", borderRadius: 20, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                                {[
                                    { label: statCards[0]?.label ?? "Tổng SOS",     count: statCards[0]?.count ?? "0",   sub: statCards[0]?.sub ?? "+0 hôm nay", color: "#2563eb", bg: "#eff6ff" },
                                    { label: statCards[1]?.label ?? "Đang xử lý",   count: statCards[1]?.count ?? "0",   sub: statCards[1]?.sub ?? "+0 hôm nay", color: "#ea580c", bg: "#fff7ed" },
                                    { label: statCards[2]?.label ?? "Đã hỗ trợ",    count: statCards[2]?.count ?? "0",   sub: statCards[2]?.sub ?? "+0 hôm nay", color: "#16a34a", bg: "#f0fdf4" },
                                    { label: statCards[3]?.label ?? "Điểm cứu trợ", count: statCards[3]?.count ?? "30+", sub: statCards[3]?.sub ?? "+4 hôm nay", color: "#0891b2", bg: "#ecfeff" },
                                ].map((item, i) => (
                                    <div key={i} style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 14, padding: "16px 12px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <MapPin size={14} color={item.color} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: item.color }}>{item.label}</span>
                                        </div>
                                        <div style={{ fontSize: 28, fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.count}</div>
                                        <div style={{ fontSize: 11, color: item.color, marginTop: 6, fontWeight: 600 }}>▲ {item.sub}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: "white", border: "1.5px solid #bbf7d0", borderRadius: 20, padding: 20 }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: "#16a34a", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>AI-LITE GỢI Ý</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12 }}>
                                        <TriangleAlert size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: 1 }} />
                                        <p style={{ fontSize: 12, color: "#4b5563", margin: 0, lineHeight: 1.5 }}>
                                            <b style={{ color: "#111827" }}>{aiSuggestions?.overloadProv ?? "Quảng Ngãi"}</b> có {aiSuggestions?.overloadCount ?? 15} yêu cầu chưa được xử lý
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 12 }}>
                                        <Users size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: 1 }} />
                                        <p style={{ fontSize: 12, color: "#4b5563", margin: 0, lineHeight: 1.5 }}>
                                            Đề xuất điều thêm <b style={{ color: "#111827" }}>{aiSuggestions?.suggestTNV ?? 2} TNV</b> từ {aiSuggestions?.nearbyProv ?? "TP. Đà Nẵng"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ CTA ══ */}
                <section style={{ width: "100%", position: "relative", overflow: "hidden", background: "#f0fdf4", borderTop: "1px solid #dcfce7", padding: "56px 32px", textAlign: "center", minHeight: 200 }}>
                    <img src="/cta-bg.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", userSelect: "none" }} />
                    <div style={{ position: "relative", zIndex: 10 }}>
                        <h2 style={{ fontFamily: H, fontSize: 40, fontWeight: 900, color: "#15803d", marginBottom: 12, textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>Sẵn sàng hỗ trợ cộng đồng?</h2>
                        <p style={{ color: "#374151", fontSize: 15, marginBottom: 28, lineHeight: 1.6, textShadow: "0 1px 2px rgba(255,255,255,0.9)" }}>Hãy cùng chung tay xây dựng hệ thống cứu trợ hiệu quả cho miền Trung.</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
                            <button onClick={() => setIsFormOpen(true)} style={{ display: "flex", alignItems: "center", gap: 10, background: "#16a34a", color: "white", border: "none", borderRadius: 99, padding: "14px 30px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(22,163,74,0.35)" }}>
                                <Users size={18} strokeWidth={2} /> Gửi SOS ngay
                            </button>
                            <Link to="/map" style={{ display: "flex", alignItems: "center", gap: 10, background: "white", color: "#374151", border: "2px solid #e5e7eb", borderRadius: 99, padding: "14px 30px", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                                <BookOpen size={18} strokeWidth={2} /> Truy cập bản đồ
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══ CONTACT ══ */}
                <section id="lien-he" style={{ width: "100%", background: "white", borderTop: "1px solid #f1f5f9", padding: "56px 32px", display: "flex", justifyContent: "center", scrollMarginTop: 80 }}>
                    <div style={{ width: "100%", maxWidth: 640, background: "white", borderRadius: 28, padding: "48px 40px", border: "1px solid #f1f5f9", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
                        <div style={{ textAlign: "center", marginBottom: 32 }}>
                            <h2 style={{ fontFamily: H, fontSize: 36, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Hỗ trợ thêm thông tin</h2>
                            <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>Chúng tôi luôn sẵn sàng lắng nghe mọi ý kiến đóng góp, phản ánh hoặc yêu cầu hỗ trợ từ cộng đồng.</p>
                        </div>
                        <div style={{ height: 1, background: "#f1f5f9", marginBottom: 28 }} />
                        {contactState === "success" && (
                            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
                                <CheckCircle size={18} color="#16a34a" />
                                <div><div style={{ fontSize: 13, fontWeight: 700, color: "#15803d" }}>Gửi thành công!</div><div style={{ fontSize: 12, color: "#6b7280" }}>Phản hồi đã được lưu vào Firebase.</div></div>
                            </div>
                        )}
                        {contactState === "error" && (
                            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(220,38,38,0.07)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
                                <AlertCircle size={18} color="#dc2626" />
                                <div style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>Có lỗi xảy ra. Vui lòng thử lại.</div>
                            </div>
                        )}
                        <form ref={formRef} style={{ display: "flex", flexDirection: "column", gap: 18 }} onSubmit={handleContactSubmit}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                {[
                                    { label: "Họ và tên *", field: "name", type: "text", placeholder: "Nhập họ và tên", required: true },
                                    { label: "Số điện thoại", field: "phone", type: "tel", placeholder: "Nhập số điện thoại", required: false },
                                ].map(inp => (
                                    <div key={inp.field} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{inp.label}</label>
                                        <input type={inp.type} placeholder={inp.placeholder} value={contactForm[inp.field]} onChange={e => handleContactChange(inp.field, e.target.value)} required={inp.required}
                                               style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", color: "#111827" }} />
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Email</label>
                                <input type="email" placeholder="Nhập địa chỉ email" value={contactForm.email} onChange={e => handleContactChange("email", e.target.value)}
                                       style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", color: "#111827" }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Nội dung *</label>
                                <textarea rows={4} placeholder="Nhập nội dung tin nhắn" value={contactForm.message} onChange={e => handleContactChange("message", e.target.value)} required
                                          style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit", color: "#111827" }} />
                            </div>
                            <div style={{ textAlign: "center", paddingTop: 8 }}>
                                <button type="submit" disabled={contactState === "loading" || contactState === "success"}
                                        style={{ background: "#16a34a", color: "white", border: "none", borderRadius: 12, padding: "13px 36px", fontWeight: 700, fontSize: 14, cursor: contactState === "loading" ? "not-allowed" : "pointer", boxShadow: "0 4px 14px rgba(22,163,74,0.25)", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "inherit", opacity: contactState === "loading" ? 0.8 : 1 }}>
                                    {contactState === "loading" ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Đang gửi...</>
                                        : contactState === "success" ? <><CheckCircle size={18} /> Đã gửi thành công</>
                                            : <><MessageCircle size={18} /> Gửi phản hồi</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* ══ FOOTER ══ */}
                <footer style={{ width: "100%", background: "#1f2937", color: "white", borderTop: "1px solid #374151", padding: "48px 0 24px" }}>
                    <div style={{ maxWidth: 1500, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 50 }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <HeartHandshake size={28} color="#4ade80" />
                                </div>
                                <div>
                                    <h2 style={{ fontFamily: H, fontSize: 20, fontWeight: 900, color: "#4ade80", margin: 0 }}>SOS MIỀN TRUNG</h2>
                                    <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 2 }}>Kết nối nhanh – Cứu trợ kịp thời</div>
                                </div>
                            </div>
                            <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.9, maxWidth: 350, margin: 0 }}>Nền tảng hỗ trợ cứu trợ thiên tai thời gian thực, kết nối người dân, tình nguyện viên và lực lượng cứu hộ trên khắp miền Trung Việt Nam.</p>
                        </div>
                        <div>
                            <h4 style={{ color: "white", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>Điều hướng</h4>
                            {footerNavItems.map((item, i) => (
                                <button key={i} onClick={item.action}
                                        style={{ display: "flex", alignItems: "center", gap: 8, color: "#9ca3af", marginBottom: 14, cursor: "pointer", fontSize: 14, background: "none", border: "none", padding: 0, fontFamily: "inherit", textAlign: "left", width: "100%", transition: "color 0.18s" }}
                                        onMouseEnter={e => e.currentTarget.style.color = "#4ade80"}
                                        onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}>
                                    <ChevronRight size={14} /> {item.label}
                                </button>
                            ))}
                        </div>
                        <div>
                            <h4 style={{ color: "white", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>Khu vực hỗ trợ</h4>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(120px, 1fr))", gap: "10px 20px" }}>
                                {["TP. Đà Nẵng","TP. Huế","Thanh Hóa","Nghệ An","Hà Tĩnh","Quảng Trị","Quảng Ngãi","Gia Lai","Đắk Lắk","Khánh Hòa","Lâm Đồng"].map((p, i) => (
                                    <div key={i} style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{p}</div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: "white", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>Trung tâm hỗ trợ</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                {[
                                    { icon: <Phone size={16} color="#4ade80" />, text: <>Hotline: <strong style={{ color: "#4ade80", marginLeft: 6 }}>1900 1234</strong></> },
                                    { icon: <Mail size={16} color="#60a5fa" />,  text: "contact@sosmientrung.vn" },
                                    { icon: <MapPin size={16} color="#f97316" />,text: "TP. Đà Nẵng, Việt Nam" },
                                    { icon: <Clock3 size={16} color="#a78bfa" />,text: "Hỗ trợ 24/7" },
                                ].map((row, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "#9ca3af", fontSize: 14 }}>
                                        {row.icon} <span>{row.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid #374151", textAlign: "center", color: "#6b7280", fontSize: 13 }}>
                        © 2026 SOS Miền Trung. All rights reserved.
                        <style>{`
                            @keyframes spin { to { transform: rotate(360deg); } }
                            @keyframes livePulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
                        `}</style>
                    </div>
                </footer>

            </div>
        </div>
    );
}