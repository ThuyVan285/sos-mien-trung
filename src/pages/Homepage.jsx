import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header.jsx";
import { useSOS } from "../store/SOSContext";
import MiniMap from "../components/map/MiniMap";
import {
    TriangleAlert,
    Clock3,
    ShieldCheck,
    MapPinned,
    HeartHandshake,
    ClipboardList,
    HandHelping,
    House,
    Users,
    Building2,
    Target,
    ChartNoAxesColumnIncreasing,
    BookOpen,
    MapPin,
    MessageCircle,
    Phone,
    Mail,
    ChevronRight,
    CheckCircle2,
    Siren,
    Gift,
    ArrowRight
} from "lucide-react";

// Plus Jakarta Sans: hỗ trợ tiếng Việt, hiện đại, chuyên nghiệp
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


const MAP_MARKERS = [
    { top: "18%", left: "55%", color: "#3b82f6", size: 13 },
    { top: "30%", left: "62%", color: "#ef4444", size: 17, pulse: true },
    { top: "38%", left: "52%", color: "#f97316", size: 12 },
    { top: "48%", left: "64%", color: "#ef4444", size: 15, pulse: true },
    { top: "60%", left: "66%", color: "#22c55e", size: 13 },
    { top: "72%", left: "68%", color: "#f97316", size: 12 },
    { top: "82%", left: "66%", color: "#22c55e", size: 11 },
];

export default function Homepage() {
    const { setIsFormOpen, setIsDonationOpen, setIsVolunteerOpen } = useSOS();
    const navigate = useNavigate();
    usePlusJakartaSans();

    return (
        <div className="Homepage min-h-screen bg-[#f0f4f8] text-[#0f1923] font-sans">
            <Header />

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>

                {/* ══════ HERO ══════ */}
                <section id="home" style={{ width: "100%", maxWidth: 1500, padding: "48px 32px 24px", margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, alignItems: "center", position: "relative" }}>

                        {/* LEFT */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 10 }}>

                            {/* Badge */}
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", border: "1px solid #e5e7eb", borderRadius: 99, padding: "6px 14px", fontSize: 11, fontWeight: 600, color: "#4b5563", width: "fit-content", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                                <MapPin size={12} color="#16a34a" /> HỆ THỐNG HỖ TRỢ THIÊN TAI MIỀN TRUNG
                            </div>

                            {/* Title */}
                            <div style={{ lineHeight: 1.05 }}>
                                <div style={{ fontFamily: H, fontSize: 88, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1 }}>
                                    <span style={{ color: "#16a34a" }}>SOS </span>
                                    <span style={{ color: "#0f1923" }}>MIỀN</span>
                                </div>
                                <div style={{ fontFamily: H, fontSize: 88, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: "#0f1923" }}>
                                    TRUNG
                                </div>
                                <div style={{ fontFamily: H, fontSize: 36, fontWeight: 700, color: "#1f2937", marginTop: 8 }}>
                                    Bản đồ cứu trợ
                                </div>
                                <div style={{ fontFamily: H, fontSize: 36, fontWeight: 700, color: "#16a34a", marginTop: 0 }}>
                                    thời gian thực
                                </div>
                            </div>

                            {/* Subtitle */}
                            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, maxWidth: 400, margin: 0 }}>
                                Nền tảng hỗ trợ kết nối người dân, tình nguyện viên và lực lượng cứu trợ trong các tình huống thiên tai tại miền Trung Việt Nam.
                            </p>

                            {/* Buttons */}
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    style={{ display: "flex", alignItems: "center", gap: 8, background: "#16a34a", color: "white", border: "none", borderRadius: 12, padding: "13px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(22,163,74,0.3)", fontFamily: "inherit" }}
                                >
                                    <Users size={16} strokeWidth={2} /> Gửi yêu cầu SOS
                                </button>
                                <Link
                                    to="/map"
                                    style={{ display: "flex", alignItems: "center", gap: 8, background: "white", color: "#374151", border: "2px solid #e5e7eb", borderRadius: 12, padding: "13px 24px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
                                >
                                    <BookOpen size={16} strokeWidth={2} /> Mở bản đồ cứu trợ
                                </Link>
                            </div>

                            {/* Mini stats */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                                {[
                                    { value: "11",   label: "Khu vực hỗ trợ",   icon: <HeartHandshake size={18} />, bg: "#ecfdf5", color: "#16a34a" },
                                    { value: "120+", label: "Yêu cầu cứu trợ",  icon: <ClipboardList size={18} />,  bg: "#eff6ff", color: "#2563eb" },
                                    { value: "50+",  label: "Tình nguyện viên",  icon: <Users size={18} />,          bg: "#ecfdf5", color: "#16a34a" },
                                    { value: "30",   label: "Điểm hỗ trợ",       icon: <Building2 size={18} />,      bg: "#eff6ff", color: "#2563eb" },
                                ].map((s, i) => (
                                    <div key={i} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                                        <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
                                            {s.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 18, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{s.value}</div>
                                            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3, lineHeight: 1.3 }}>{s.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT — Rescue image với fade trái */}
                        <div style={{ position: "relative", height: 580, marginRight: -32 }}>

                            {/* Ảnh nền cứu hộ */}
                            <img
                                src="/hero-bg.png"
                                alt="Cứu hộ miền Trung"
                                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: "0 24px 24px 0" }}
                            />


                        </div>
                    </div>
                </section>
                {/* ══════ LIVE STATS BAR ══════ */}
                <section
                    style={{
                        width: "100%",
                        maxWidth: 1500,
                        padding: "0 32px 40px",
                        margin: "0 auto"
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 24
                        }}
                    >
                        {[
                            {
                                label: "CẦN GIÚP",
                                count: "128",
                                color: "#dc2626",
                                iconBg: "#fee2e2",
                                change: "+12",
                                icon: <TriangleAlert size={34} />,
                                watermark: <HeartHandshake size={40} />
                            },
                            {
                                label: "ĐANG XỬ LÝ",
                                count: "56",
                                color: "#ea580c",
                                iconBg: "#ffedd5",
                                change: "+5",
                                icon: <Clock3 size={34} />,
                                watermark: <ClipboardList size={90} />
                            },
                            {
                                label: "ĐÃ HỖ TRỢ",
                                count: "320",
                                color: "#16a34a",
                                iconBg: "#dcfce7",
                                change: "+25",
                                icon: <ShieldCheck size={34} />,
                                watermark: <HandHelping size={90} />
                            },
                            {
                                label: "ĐIỂM CỨU TRỢ",
                                count: "24",
                                color: "#2563eb",
                                iconBg: "#dbeafe",
                                change: "+2",
                                icon: <MapPinned size={34} />,
                                watermark: <House size={90} />
                            }
                        ].map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    background: "#ffffff",
                                    borderRadius: 24,
                                    padding: 28,
                                    minHeight: 100,
                                    border: "1px solid #e2e8f0",
                                    boxShadow:
                                        "0 10px 30px rgba(15,23,42,0.05), 0 2px 6px rgba(15,23,42,0.04)",
                                    transition: "all 0.25s ease"
                                }}
                            >
                                {/* Watermark */}
                                <div
                                    style={{
                                        position: "absolute",
                                        right: 24,
                                        top: 70,
                                        color: s.color,
                                        opacity: 0.06
                                    }}
                                >
                                    {s.watermark}
                                </div>

                                {/* Header */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 18
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 52,
                                            height: 52,
                                            borderRadius: "50%",
                                            background: s.iconBg,
                                            color: s.color,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0
                                        }}
                                    >
                                        {s.icon}
                                    </div>

                                    <div>
                                        <div
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                letterSpacing: 1,
                                                color: s.color,
                                                textTransform: "uppercase",
                                                marginBottom: 6
                                            }}
                                        >
                                            {s.label}
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 36,
                                                fontWeight: 900,
                                                lineHeight: 1,
                                                color: "#111827"
                                            }}
                                        >
                                            {s.count}
                                        </div>

                                        <div
                                            style={{
                                                marginTop: 4,
                                                fontSize: 13,
                                                fontWeight: 600
                                            }}
                                        >
                                        <span style={{ color: s.color }}>
                                            ↑ {s.change}
                                        </span>

                                            <span style={{ color: "#374151" }}>
                                                {" "}hôm nay
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                {/* Accent border */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        height: 4,
                                        background: s.color,
                                        opacity: 0.8
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
                {/* ══════ MỤC TIÊU CỦA CHÚNG TÔI ══════ */}
                <section
                    style={{
                        width: "100%",
                        maxWidth: 1500,
                        padding: "40px 32px",
                        margin: "0 auto",
                        borderTop: "1px solid #f1f5f9"
                    }}
                >
                    <h2
                        style={{
                            fontFamily: H,
                            fontSize: 40,
                            fontWeight: 800,
                            textAlign: "center",
                            marginBottom: 40,
                            color: "#111827"
                        }}
                    >
                        Mục tiêu của chúng tôi
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 24
                        }}
                    >
                        {[
                            {
                                title: "Kết nối nhanh chóng",
                                desc: "Kết nối người dân, tình nguyện viên và lực lượng cứu trợ một cách nhanh nhất trong mọi tình huống.",
                                icon: <Users size={34} />
                            },
                            {
                                title: "Điều phối hiệu quả",
                                desc: "Điều phối nguồn lực cứu trợ thông minh, đúng nơi - đúng thời điểm - đúng nhu cầu.",
                                icon: <Target size={34} />
                            },
                            {
                                title: "Minh bạch & chính xác",
                                desc: "Cung cấp dữ liệu thời gian thực, minh bạch, giúp ra quyết định nhanh chóng và chính xác.",
                                icon: <ChartNoAxesColumnIncreasing size={34} />
                            }
                        ].map((g, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "#ffffff",
                                    borderRadius: 24,
                                    border: "1px solid #e5e7eb",
                                    padding: "36px 28px",
                                    textAlign: "center",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {/* Icon */}
                                <div
                                    style={{
                                        width: 84,
                                        height: 84,
                                        margin: "0 auto 24px",
                                        borderRadius: "50%",
                                        background: "#f0fdf4",
                                        border: "1px solid #dcfce7",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#16a34a"
                                    }}
                                >
                                    {g.icon}
                                </div>

                                {/* Title */}
                                <h3
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 700,
                                        color: "#111827",
                                        marginBottom: 16
                                    }}
                                >
                                    {g.title}
                                </h3>

                                {/* Description */}
                                <p
                                    style={{
                                        fontSize: 16,
                                        color: "#6b7280",
                                        lineHeight: 1.8,
                                        margin: 0
                                    }}
                                >
                                    {g.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
                {/* ══════ MAP SECTION ══════ */}
                <section
                    id="ban-do"
                    style={{
                        width: "100%",
                        background: "#f8fafc",
                        padding: "80px 0"
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1500,
                            margin: "0 auto",
                            padding: "0 32px",
                            display: "grid",
                            gridTemplateColumns: "0.9fr 1.1fr",
                            gap: 60,
                            alignItems: "center"
                        }}
                    >
                        {/* LEFT */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 24
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontFamily: H,
                                        fontSize: 44,
                                        fontWeight: 800,
                                        lineHeight: 1.1,
                                        color: "#111827"
                                    }}
                                >
                                    HỆ THỐNG BẢN ĐỒ
                                </div>

                                <div
                                    style={{
                                        fontFamily: H,
                                        fontSize: 72,
                                        fontWeight: 900,
                                        color: "#22c55e",
                                        lineHeight: 1
                                    }}
                                >
                                    TRỰC QUAN
                                </div>
                            </div>

                            <p
                                style={{
                                    fontSize: 16,
                                    lineHeight: 1.9,
                                    color: "#6b7280",
                                    maxWidth: 500,
                                    margin: 0
                                }}
                            >
                                Theo dõi tình hình cứu trợ theo thời gian thực trên nền tảng
                                VietMap. Dễ dàng xác định điểm SOS, khu vực nguy hiểm,
                                tuyến cứu trợ và các điểm hỗ trợ gần nhất.
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 14
                                }}
                            >
                                {[
                                    "Cập nhật thời gian thực 24/7",
                                    "Định vị chính xác bằng VietMap",
                                    "Cảnh báo ngập lụt & sạt lở",
                                    "Tuyến đường cứu trợ tối ưu",
                                    "Theo dõi trạng thái hỗ trợ"
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            color: "#374151",
                                            fontWeight: 500
                                        }}
                                    >
                                        <CheckCircle2
                                            size={20}
                                            color="#22c55e"
                                        />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate("/map")}
                                style={{
                                    width: "fit-content",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "15px 24px",
                                    border: "none",
                                    borderRadius: 14,
                                    background:
                                        "linear-gradient(135deg,#22c55e,#16a34a)",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 15,
                                    cursor: "pointer",
                                    boxShadow:
                                        "0 10px 30px rgba(34,197,94,0.25)"
                                }}
                            >
                                Trải nghiệm bản đồ ngay
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        {/* RIGHT */}
                        <div
                            style={{
                                position: "relative",
                                height: 560,
                                borderRadius: 30,
                                overflow: "hidden",
                                boxShadow:
                                    "0 25px 60px rgba(0,0,0,0.15)",
                                border: "1px solid #e5e7eb"
                            }}
                        >
                            <MiniMap interactive={false} />

                            {/* LIVE */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 20,
                                    right: 20,
                                    background: "rgba(255,255,255,0.95)",
                                    backdropFilter: "blur(12px)",
                                    padding: "8px 14px",
                                    borderRadius: 999,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    zIndex: 100,
                                    border: "1px solid #e5e7eb"
                                }}
                            >
                                <div
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        background: "#ef4444",
                                        animation: "livePulse 1.5s infinite"
                                    }}
                                />

                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 800,
                                        letterSpacing: 1,
                                        color: "#111827"
                                    }}
                                >
        LIVE
    </span>
                            </div>
                            {/* SOS PANEL */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: 20,
                                    top: 20,
                                    width: 260,
                                    background: "rgba(255,255,255,0.92)",
                                    backdropFilter: "blur(18px)",
                                    borderRadius: 20,
                                    padding: 18,
                                    zIndex: 50,
                                    border: "1px solid rgba(255,255,255,0.4)"
                                }}
                            >
                                <div
                                    style={{
                                        color: "#22c55e",
                                        fontSize: 12,
                                        fontWeight: 800,
                                        letterSpacing: 1.5,
                                        marginBottom: 16
                                    }}
                                >
                                    YÊU CẦU GẦN ĐÂY
                                </div>

                                {[
                                    {
                                        city: "Quảng Ngãi",
                                        people: "15 người cần hỗ trợ",
                                        color: "#ef4444"
                                    },
                                    {
                                        city: "Đà Nẵng",
                                        people: "8 người cần hỗ trợ",
                                        color: "#f59e0b"
                                    },
                                    {
                                        city: "Huế",
                                        people: "12 người cần hỗ trợ",
                                        color: "#f59e0b"
                                    },
                                    {
                                        city: "Nghệ An",
                                        people: "Đã hỗ trợ",
                                        color: "#22c55e"
                                    }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            gap: 10,
                                            alignItems: "center",
                                            marginBottom: 14
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: "50%",
                                                background: item.color
                                            }}
                                        />

                                        <div>
                                            <div
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: "#111827"
                                                }}
                                            >
                                                {item.city}
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 11,
                                                    color: "#6b7280"
                                                }}
                                            >
                                                {item.people}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ACTION BUTTONS */}
                            <div
                                style={{
                                    position: "absolute",
                                    right: 20,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                    zIndex: 100
                                }}
                            >
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    style={{
                                        width: 140,
                                        height: 56,
                                        background: "#ef4444",
                                        color: "white",
                                        border: "none",
                                        borderRadius: 14,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 10
                                    }}
                                >
                                    <Siren size={18} />
                                    SOS
                                </button>

                                <button
                                    onClick={() => setIsDonationOpen(true)}
                                    style={{
                                        width: 140,
                                        height: 56,
                                        background: "#22c55e",
                                        color: "white",
                                        border: "none",
                                        borderRadius: 14,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 10
                                    }}
                                >
                                    <Gift size={18} />
                                    Quyên góp
                                </button>

                                <button
                                    onClick={() => setIsVolunteerOpen(true)}
                                    style={{
                                        width: 140,
                                        height: 56,
                                        background: "#2563eb",
                                        color: "white",
                                        border: "none",
                                        borderRadius: 14,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 10
                                    }}
                                >
                                    <Users size={18} />
                                    T.N.V
                                </button>

                                <button
                                    onClick={() => navigate("/map")}
                                    style={{
                                        width: 140,
                                        height: 56,
                                        background: "#7c3aed",
                                        color: "white",
                                        border: "none",
                                        borderRadius: 14,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 10
                                    }}
                                >
                                    <MapPinned size={18} />
                                    Định vị
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ══════ QUY TRÌNH ══════ */}
                <section id="quy-trinh" style={{ width: "100%", borderTop: "1px solid #f1f5f9", background: "white", padding: "64px 0" }}>
                    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
                        <h2
                            style={{
                                fontFamily: H,
                                fontSize: 40,
                                fontWeight: 800,
                                textAlign: "center",
                                marginBottom: 40,
                                color: "#111827"
                            }}
                        >
                            Quy trình hoạt động
                        </h2>

                        {/* Grid: step – arrow – step – arrow – step – arrow – step – arrow – step */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 1fr 48px 1fr 48px 1fr 48px 1fr", alignItems: "start", gap: 0 }}>

                            {/* ── STEP 1 ── */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 4px" }}>
                                <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(145deg,#fecaca,#fca5a5)", border: "2px solid #dc2626", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <circle cx="12" cy="10" r="4" fill="#dc2626"/>
                                        <path d="M4 26c0-4 3.6-7 8-7" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round"/>
                                        <circle cx="24" cy="10" r="4" fill="#dc2626"/>
                                        <path d="M24 19c4.4 0 8 3 8 7" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round"/>
                                        <path d="M12 19c1.8-.6 3.8-1 6-1s4.2.4 6 1" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round"/>
                                        <path d="M8 33c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round"/>
                                    </svg>
                                    <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: 22, height: 22, borderRadius: "50%", background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>1</div>
                                </div>
                                <h3 style={{ marginTop: 22, marginBottom: 6, fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>Người dân gửi SOS</h3>
                                <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>Người dân gửi yêu cầu cứu trợ bằng form SOS. Thông tin được ghi nhận ngay và chuyển đến trung tâm điều phối.</p>
                            </div>

                            {/* Arrow 1 */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 28 }}>
                                <svg width="48" height="20" viewBox="0 0 48 20">
                                    <line x1="0" y1="10" x2="36" y2="10" stroke="#16a34a" strokeWidth="2.2" strokeDasharray="6,4"/>
                                    <polygon points="34,4 46,10 34,16" fill="#16a34a"/>
                                </svg>
                            </div>

                            {/* ── STEP 2 ── */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 4px" }}>
                                <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(145deg,#dcfce7,#bbf7d0)", border: "2px solid #16a34a", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <circle cx="18" cy="10" r="5" fill="#16a34a"/>
                                        <path d="M8 32c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round"/>
                                        <circle cx="28" cy="14" r="4" fill="#16a34a" opacity=".7"/>
                                        <path d="M24 28c0-3.5 3.5-6 6-6" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" opacity=".7"/>
                                        <line x1="28" y1="6" x2="28" y2="9" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round"/>
                                        <line x1="33" y1="9" x2="31" y2="11" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round"/>
                                        <line x1="35" y1="14" x2="32" y2="14" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round"/>
                                    </svg>
                                    <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: 22, height: 22, borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>2</div>
                                </div>
                                <h3 style={{ marginTop: 22, marginBottom: 6, fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>Hệ thống định vị</h3>
                                <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>Hệ thống xác định vị trí chính xác và phân loại mức độ khẩn cấp. GPS được xử lý tự động trong vài giây.</p>
                            </div>

                            {/* Arrow 2 */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 28 }}>
                                <svg width="48" height="20" viewBox="0 0 48 20">
                                    <line x1="0" y1="10" x2="36" y2="10" stroke="#16a34a" strokeWidth="2.2" strokeDasharray="6,4"/>
                                    <polygon points="34,4 46,10 34,16" fill="#16a34a"/>
                                </svg>
                            </div>

                            {/* ── STEP 3 ── */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 4px" }}>
                                <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(145deg,#dcfce7,#bbf7d0)", border: "2px solid #16a34a", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <circle cx="18" cy="9" r="4" fill="#16a34a"/>
                                        <circle cx="9" cy="12" r="3.5" fill="#16a34a" opacity=".8"/>
                                        <circle cx="27" cy="12" r="3.5" fill="#16a34a" opacity=".8"/>
                                        <path d="M5 28c0-4.5 3.8-8 8-8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
                                        <path d="M23 20c4.2 0 8 3.5 8 8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
                                        <path d="M11 20c1.9-.7 4.2-1 7-1s5.1.3 7 1" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round"/>
                                        <path d="M9 33c0-5.5 4.5-9 9-9s9 3.5 9 9" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round"/>
                                    </svg>
                                    <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: 22, height: 22, borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>3</div>
                                </div>
                                <h3 style={{ marginTop: 22, marginBottom: 6, fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>TNV nhanh hỗ trợ</h3>
                                <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>Tình nguyện viên gần nhất nhận thông báo và xác nhận. Thời gian phản hồi tối ưu theo khoảng cách địa lý.</p>
                            </div>

                            {/* Arrow 3 */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 28 }}>
                                <svg width="48" height="20" viewBox="0 0 48 20">
                                    <line x1="0" y1="10" x2="36" y2="10" stroke="#16a34a" strokeWidth="2.2" strokeDasharray="6,4"/>
                                    <polygon points="34,4 46,10 34,16" fill="#16a34a"/>
                                </svg>
                            </div>

                            {/* ── STEP 4 ── */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 4px" }}>
                                <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(145deg,#dcfce7,#bbf7d0)", border: "2px solid #16a34a", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <circle cx="11" cy="10" r="3.5" fill="#16a34a"/>
                                        <circle cx="25" cy="10" r="3.5" fill="#16a34a"/>
                                        <path d="M4 28c0-5 4-8.5 7-8.5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M25 19.5c3 0 7 3.5 7 8.5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M10 19.5c2-.7 4-1 8-1s6 .3 8 1" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M8 33c0-5.5 4-9 10-9s10 3.5 10 9" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round"/>
                                        <path d="M18 20v-5M15 17l3-3 3 3" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: 22, height: 22, borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>4</div>
                                </div>
                                <h3 style={{ marginTop: 22, marginBottom: 6, fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>Điều phối cứu trợ</h3>
                                <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>Lực lượng được điều phối đến đúng vị trí. Nguồn lực phân bổ hợp lý, tránh chồng chéo và lãng phí.</p>
                            </div>

                            {/* Arrow 4 */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 28 }}>
                                <svg width="48" height="20" viewBox="0 0 48 20">
                                    <line x1="0" y1="10" x2="36" y2="10" stroke="#16a34a" strokeWidth="2.2" strokeDasharray="6,4"/>
                                    <polygon points="34,4 46,10 34,16" fill="#16a34a"/>
                                </svg>
                            </div>

                            {/* ── STEP 5 ── */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 4px" }}>
                                <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(145deg,#dcfce7,#bbf7d0)", border: "2px solid #16a34a", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path d="M18 4C10.3 4 4 10.3 4 18s6.3 14 14 14 14-6.3 14-14S25.7 4 18 4z" stroke="#16a34a" strokeWidth="2" fill="none"/>
                                        <path d="M11 18l5 5 9-10" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M18 2v4M18 30v4M2 18h4M30 18h4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
                                    </svg>
                                    <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: 22, height: 22, borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>5</div>
                                </div>
                                <h3 style={{ marginTop: 22, marginBottom: 6, fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>Hoàn thành & cập nhật</h3>
                                <p style={{ fontSize: 11.5, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>Cập nhật trạng thái và báo cáo minh bạch. Dữ liệu lưu trữ để phân tích và cải thiện quy trình về sau.</p>
                            </div>

                        </div>
                    </div>
                </section>
                {/* ══════ THỐNG KÊ NỔI BẬT ══════ */}
                <section id="thong-ke" style={{ width: "100%", borderTop: "1px solid #f1f5f9", padding: "64px 0" }}>
                    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
                        <h2 style={{ fontFamily: H, fontSize: 40, fontWeight: 800, textAlign: "center", color: "#111827", marginBottom: 16 }}>
                            Thống kê nổi bật
                        </h2>

                        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>

                            {/* 4 STAT CARDS */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, background: "white", border: "1px solid #f1f5f9", borderRadius: 20, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                                {[
                                    {
                                        label: "Tổng SOS", count: "120+", sub: "+18 hôm nay",
                                        color: "#2563eb", bg: "#eff6ff",
                                        icon: (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <circle cx="6" cy="5" r="2.2" fill="#2563eb"/>
                                                <path d="M1 13c0-2.5 2.2-4 5-4" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round"/>
                                                <circle cx="11" cy="5" r="2.2" fill="#2563eb" opacity=".6"/>
                                                <path d="M8.5 9.2c.8-.2 1.6-.2 2.5-.2 2.8 0 5 1.5 5 4" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" opacity=".6"/>
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Đang xử lý", count: "50+", sub: "+6 hôm nay",
                                        color: "#ea580c", bg: "#fff7ed",
                                        icon: (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <circle cx="8" cy="8" r="6.5" stroke="#ea580c" strokeWidth="1.4"/>
                                                <path d="M8 4.5v3.8l2.5 1.5" stroke="#ea580c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Đã hỗ trợ", count: "500+", sub: "+35 hôm nay",
                                        color: "#16a34a", bg: "#f0fdf4",
                                        icon: (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M14 7.5A6.5 6.5 0 1 1 7.5 1" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round"/>
                                                <path d="M5 7.5l3 3 6-6" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Điểm cứu trợ", count: "30+", sub: "+4 hôm nay",
                                        color: "#0891b2", bg: "#ecfeff",
                                        icon: (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" stroke="#0891b2" strokeWidth="1.4" fill="none"/>
                                                <circle cx="8" cy="6" r="1.6" fill="#0891b2"/>
                                            </svg>
                                        ),
                                    },
                                ].map((item, i) => (
                                    <div key={i} style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 14, padding: "16px 12px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                {item.icon}
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: item.color }}>{item.label}</span>
                                        </div>
                                        <div style={{ fontSize: 28, fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.count}</div>
                                        <div style={{ fontSize: 11, color: item.color, marginTop: 6, fontWeight: 600 }}>▲ {item.sub}</div>
                                    </div>
                                ))}
                            </div>

                            {/* AI-LITE */}
                            <div style={{ background: "white", border: "1.5px solid #bbf7d0", borderRadius: 20, padding: 20 }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: "#16a34a", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>AI-LITE GỢI Ý</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 12 }}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                                            <path d="M9 2L1.5 15h15L9 2z" stroke="#dc2626" strokeWidth="1.5" strokeLinejoin="round" fill="#fef2f2"/>
                                            <line x1="9" y1="7" x2="9" y2="11" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
                                            <circle cx="9" cy="13" r="0.8" fill="#dc2626"/>
                                        </svg>
                                        <p style={{ fontSize: 12, color: "#4b5563", margin: 0, lineHeight: 1.5 }}>
                                            <b style={{ color: "#111827" }}>Quảng Ngãi</b> có 15 yêu cầu chưa được xử lý
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: 12 }}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                                            <circle cx="9" cy="9" r="7" stroke="#2563eb" strokeWidth="1.5" fill="#eff6ff"/>
                                            <path d="M6 9a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" stroke="#2563eb" strokeWidth="1.2" fill="none"/>
                                            <line x1="9" y1="2" x2="9" y2="4" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round"/>
                                            <line x1="9" y1="14" x2="9" y2="16" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round"/>
                                            <line x1="2" y1="9" x2="4" y2="9" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round"/>
                                            <line x1="14" y1="9" x2="16" y2="9" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round"/>
                                        </svg>
                                        <p style={{ fontSize: 12, color: "#4b5563", margin: 0, lineHeight: 1.5 }}>
                                            Đề xuất điều thêm <b style={{ color: "#111827" }}>2 TNV</b> từ Đà Nẵng
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                {/* ══════ CTA ══════ */}
                <section style={{
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    background: "#f0fdf4",
                    borderTop: "1px solid #dcfce7",
                    padding: "56px 32px",
                    textAlign: "center",
                    minHeight: 200,
                }}>
                    {/* Ảnh nền thuyền cứu trợ */}
                    <img
                        src="/cta-bg.png"
                        alt=""
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            pointerEvents: "none",
                            userSelect: "none",
                        }}
                    />

                    {/* Nội dung đè lên ảnh */}
                    <div style={{ position: "relative", zIndex: 10 }}>
                        <h2 style={{
                            fontFamily: H,
                            fontSize: 40,
                            fontWeight: 900,
                            color: "#15803d",
                            marginBottom: 12,
                            letterSpacing: "-0.5px",
                            textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                        }}>
                            Sẵn sàng hỗ trợ cộng đồng?
                        </h2>
                        <p style={{
                            color: "#374151",
                            fontSize: 15,
                            marginBottom: 28,
                            lineHeight: 1.6,
                            textShadow: "0 1px 2px rgba(255,255,255,0.9)",
                        }}>
                            Hãy cùng chung tay xây dựng hệ thống cứu trợ hiệu quả cho miền Trung.
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
                            <button
                                onClick={() => setIsFormOpen(true)}
                                style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    background: "#16a34a", color: "white",
                                    border: "none", borderRadius: 99,
                                    padding: "14px 30px", fontWeight: 700, fontSize: 15,
                                    cursor: "pointer", fontFamily: "inherit",
                                    boxShadow: "0 4px 14px rgba(22,163,74,0.35)",
                                }}
                            >
                                <Users size={18} strokeWidth={2} />
                                Gửi SOS ngay
                            </button>
                            <Link
                                to="/map"
                                style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    background: "white", color: "#374151",
                                    border: "2px solid #e5e7eb", borderRadius: 99,
                                    padding: "14px 30px", fontWeight: 700, fontSize: 15,
                                    textDecoration: "none",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                }}
                            >
                                <BookOpen size={18} strokeWidth={2} />
                                Truy cập bản đồ
                            </Link>
                        </div>
                    </div>
                </section>
                {/* ══════ CONTACT ══════ */}
                <section id="lien-he" style={{ width: "100%", background: "white", borderTop: "1px solid #f1f5f9", padding: "56px 32px", display: "flex", justifyContent: "center", scrollMarginTop: 80 }}>
                    <div style={{ width: "100%", maxWidth: 640, background: "white", borderRadius: 28, padding: "48px 40px", border: "1px solid #f1f5f9", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
                        <div style={{ textAlign: "center", marginBottom: 32 }}>
                            <h2 style={{ fontFamily: H, fontSize: 36, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Hỗ trợ thêm thông tin</h2>
                            <p
                                style={{
                                    color: "#6b7280",
                                    fontSize: 15,
                                    lineHeight: 1.8,
                                    maxWidth: 500,
                                    margin: "0 auto"
                                }}
                            >
                                Chúng tôi luôn sẵn sàng lắng nghe mọi ý kiến đóng góp,
                                phản ánh hoặc yêu cầu hỗ trợ từ cộng đồng.
                                Mỗi thông tin bạn gửi đều góp phần giúp hệ thống cứu trợ
                                hoạt động hiệu quả hơn và đến đúng nơi cần giúp đỡ.
                            </p>
                        </div>
                        <div style={{ height: 1, background: "#f1f5f9", marginBottom: 28 }} />
                        <form style={{ display: "flex", flexDirection: "column", gap: 18 }} onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã liên hệ!'); e.target.reset(); }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Họ và tên</label>
                                    <input type="text" placeholder="Nhập họ và tên" style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", color: "#111827" }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Số điện thoại</label>
                                    <input type="tel" placeholder="Nhập số điện thoại" style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", color: "#111827" }} />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Email</label>
                                <input type="email" placeholder="Nhập địa chỉ email" style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", color: "#111827" }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Nội dung</label>
                                <textarea rows={4} placeholder="Nhập nội dung tin nhắn" style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit", color: "#111827" }} />
                            </div>
                            <div style={{ textAlign: "center", paddingTop: 8 }}>
                                <button
                                    type="submit"
                                    style={{
                                        background: "#16a34a",
                                        color: "white",
                                        border: "none",
                                        borderRadius: 12,
                                        padding: "13px 36px",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        cursor: "pointer",
                                        boxShadow: "0 4px 14px rgba(22,163,74,0.25)",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        fontFamily: "inherit"
                                    }}
                                >
                                    <MessageCircle size={18} />
                                    Gửi phản hồi
                                </button>
                            </div>
                        </form>
                        <div
                            style={{
                                marginTop: 28,
                                textAlign: "center",
                                color: "#6b7280",
                                fontSize: 13,
                                lineHeight: 1.7
                            }}
                        >
                            SOS Miền Trung tin rằng công nghệ không chỉ để kết nối dữ liệu,
                            mà còn để kết nối những tấm lòng và mang sự hỗ trợ đến đúng người,
                            đúng thời điểm.
                        </div>
                    </div>
                </section>

                {/* ══════ FOOTER ══════ */}
                <footer
                    style={{
                        width: "100%",
                        background: "#1f2937",
                        color: "white",
                        borderTop: "1px solid #374151",
                        padding: "48px 0 24px"
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1500,
                            margin: "0 auto",
                            padding: "0 32px",
                            display: "grid",
                            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                            gap: 50
                        }}
                    >
                        {/* LOGO + GIỚI THIỆU */}
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                    marginBottom: 20
                                }}
                            >
                                <div
                                    style={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 14,
                                        background: "rgba(74,222,128,0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <HeartHandshake
                                        size={28}
                                        color="#4ade80"
                                    />
                                </div>

                                <div>
                                    <h2
                                        style={{
                                            fontFamily: H,
                                            fontSize: 20,
                                            fontWeight: 900,
                                            color: "#4ade80",
                                            margin: 0
                                        }}
                                    >
                                        SOS MIỀN TRUNG
                                    </h2>

                                    <div
                                        style={{
                                            color: "#9ca3af",
                                            fontSize: 12,
                                            marginTop: 2
                                        }}
                                    >
                                        Kết nối nhanh – Cứu trợ kịp thời
                                    </div>
                                </div>
                            </div>

                            <p
                                style={{
                                    color: "#9ca3af",
                                    fontSize: 14,
                                    lineHeight: 1.9,
                                    maxWidth: 350,
                                    margin: 0
                                }}
                            >
                                Nền tảng hỗ trợ cứu trợ thiên tai thời gian thực,
                                kết nối người dân, tình nguyện viên và lực lượng
                                cứu hộ trên khắp miền Trung Việt Nam.
                            </p>
                        </div>

                        {/* ĐIỀU HƯỚNG */}
                        <div>
                            <h4
                                style={{
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    textTransform: "uppercase",
                                    letterSpacing: 2,
                                    marginBottom: 20
                                }}
                            >
                                Điều hướng
                            </h4>

                            {[
                                "Trang chủ",
                                "Bản đồ cứu trợ",
                                "Quy trình",
                                "Thống kê",
                                "Liên hệ"
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        color: "#9ca3af",
                                        marginBottom: 14,
                                        cursor: "pointer",
                                        fontSize: 14
                                    }}
                                >
                                    <ChevronRight size={14} />
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* KHU VỰC HỖ TRỢ */}
                        <div>
                            <h4
                                style={{
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    textTransform: "uppercase",
                                    letterSpacing: 2,
                                    marginBottom: 20
                                }}
                            >
                                Khu vực hỗ trợ
                            </h4>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, minmax(120px, 1fr))",
                                    gap: "10px 20px"
                                }}
                            >
                                {[
                                    "TP. Đà Nẵng",
                                    "TP. Huế",
                                    "Thanh Hóa",
                                    "Nghệ An",
                                    "Hà Tĩnh",
                                    "Quảng Trị",
                                    "Quảng Ngãi",
                                    "Gia Lai",
                                    "Đắk Lắk",
                                    "Khánh Hòa",
                                    "Lâm Đồng"
                                ].map((p, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            color: "#9ca3af",
                                            fontSize: 14,
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* TRUNG TÂM HỖ TRỢ */}
                        <div>
                            <h4
                                style={{
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    textTransform: "uppercase",
                                    letterSpacing: 2,
                                    marginBottom: 20
                                }}
                            >
                                Trung tâm hỗ trợ
                            </h4>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 18
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        color: "#9ca3af",
                                        fontSize: 14
                                    }}
                                >
                                    <Phone size={16} color="#4ade80" />
                                    <span>
                        Hotline:
                        <strong
                            style={{
                                color: "#4ade80",
                                marginLeft: 6
                            }}
                        >
                            1900 1234
                        </strong>
                    </span>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        color: "#9ca3af",
                                        fontSize: 14
                                    }}
                                >
                                    <Mail size={16} color="#60a5fa" />
                                    contact@sosmientrung.vn
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        color: "#9ca3af",
                                        fontSize: 14
                                    }}
                                >
                                    <MapPin size={16} color="#f97316" />
                                    TP. Đà Nẵng, Việt Nam
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        color: "#9ca3af",
                                        fontSize: 14
                                    }}
                                >
                                    <Clock3 size={16} color="#a78bfa" />
                                    Hỗ trợ 24/7
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COPYRIGHT */}
                    <div
                        style={{
                            marginTop: 40,
                            paddingTop: 20,
                            borderTop: "1px solid #374151",
                            textAlign: "center",
                            color: "#6b7280",
                            fontSize: 13
                        }}
                    >
                        © 2026 SOS Miền Trung. All rights reserved.
                    </div>
                </footer>
            </div>
        </div>
    );
}