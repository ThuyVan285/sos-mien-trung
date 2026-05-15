
import { Link, useLocation } from "react-router-dom";
import { Search, AlertTriangle, Home, Map, Mail } from "lucide-react";
import { useSOS } from "../store/SOSContext";
import MiniMap from "../components/map/MiniMap";
import SOSForm from "../features/sos/SOSForm";

export default function Homepage() {
    const { isFormOpen, setIsFormOpen } = useSOS();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#020817] text-[#f8fafc] font-sans w-full flex flex-col items-center overflow-x-hidden">

            {/* HEADER */}
            <header className="w-full flex justify-center bg-[#020817]/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
                <div className="w-full max-w-[1400px] px-8 lg:px-16 h-24 flex items-center justify-between">

                    <div className="flex items-center gap-14">
                        <Link to="/" className="flex items-center gap-4 no-underline group">
                            <div className="text-3xl drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] group-hover:scale-110 transition-transform">
                                🚨
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-xl font-black tracking-tight leading-none text-white">
                                    <span className="text-blue-500">SOS</span> MIỀN TRUNG
                                </h2>

                                <p className="text-[11px] text-gray-400 font-medium tracking-[0.2em] uppercase">
                                    Cứu trợ kịp thời
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center gap-12 text-sm font-bold">
                            <Link
                                to="/"
                                className={`flex items-center gap-2 transition-colors ${
                                    location.pathname === "/"
                                        ? "text-cyan-400"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                <Home size={17} />
                                Trang chủ
                            </Link>

                            <Link
                                to="/map"
                                className={`flex items-center gap-2 transition-colors ${
                                    location.pathname === "/map"
                                        ? "text-cyan-400"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                <Map size={17} />
                                Bản đồ
                            </Link>

                            <a
                                href="#lien-he"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <Mail size={17} />
                                Liên hệ
                            </a>
                        </nav>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="hidden lg:flex items-center gap-3 bg-[#0f172a] border border-white/10 rounded-full px-5 py-3 transition-all">
                            <Search size={16} className="text-gray-500" />

                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="bg-transparent border-none text-sm text-white focus:outline-none w-36 focus:w-52 transition-all"
                            />
                        </div>

                        <button
                            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-7 py-3 rounded-full font-bold text-sm transition-all"
                            onClick={() => setIsFormOpen(true)}
                        >
                            <AlertTriangle size={16} />
                            SOS
                        </button>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="w-full flex justify-center pt-36 pb-36">
                <div className="w-full max-w-[1400px] px-8 lg:px-16">

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-32 items-center">

                        {/* LEFT */}
                        <div className="pr-0 lg:pr-12">

                            <span className="inline-flex items-center gap-3 bg-cyan-950/30 px-5 py-3 rounded-full text-xs font-bold text-cyan-400 border border-cyan-800/50 uppercase tracking-[0.2em] mb-10">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                                Hệ thống hỗ trợ thiên tai
                            </span>

                            <div className="space-y-6">
                                <h1 className="text-5xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.1]">
                                    <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                                        SOS
                                    </span>{" "}
                                    MIỀN TRUNG
                                </h1>

                                <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1.35]">
                                    Bản đồ cứu trợ
                                    <br />

                                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        thời gian thực
                                    </span>
                                </h2>
                            </div>

                            <p className="text-gray-400 mt-10 text-[15px] leading-[2.1] max-w-[620px]">
                                Nền tảng hỗ trợ kết nối người dân, tình nguyện viên và lực lượng cứu trợ trong các tình huống thiên tai tại miền Trung Việt Nam.
                            </p>

                            {/* BUTTONS */}
                            <div className="flex flex-wrap items-center gap-6 mt-14">

                                <button
                                    className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white px-10 py-5 rounded-2xl font-bold text-base transition-all"
                                    onClick={() => setIsFormOpen(true)}
                                >
                                    🔴 Gửi yêu cầu SOS
                                </button>

                                <Link
                                    to="/map"
                                    className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-base transition-all"
                                >
                                    🗺️ Mở bản đồ cứu trợ
                                </Link>
                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-4 gap-16 mt-28 border-t border-white/5 pt-14">

                                {[
                                    ["11", "Khu vực"],
                                    ["120+", "Yêu cầu"],
                                    ["50+", "TNV"],
                                    ["30", "Điểm hỗ trợ"],
                                ].map(([val, label], i) => (

                                    <div key={i} className="space-y-4">

                                        <div className="text-3xl font-black text-cyan-400">
                                            {val}
                                        </div>

                                        <div className="text-[11px] text-gray-500 uppercase tracking-[0.28em] font-semibold leading-loose">
                                            {label}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="relative group h-[620px]">

                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

                            <div className="relative h-full bg-[#071122] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                                <MiniMap interactive={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LIVE STATS */}
            <section className="w-full flex justify-center py-36">

                <div className="w-full max-w-[1400px] px-8 lg:px-16">

                    <div className="grid grid-cols-2 md:grid-cols-4 bg-[#0f172a]/60 rounded-[2.5rem] border border-white/5 shadow-lg divide-y md:divide-y-0 md:divide-x divide-white/5">

                        {[
                            {
                                label: "CẦN GIÚP",
                                count: "128",
                                color: "text-red-500",
                                sub: "+12 hôm nay",
                                icon: "👥",
                            },
                            {
                                label: "ĐANG XỬ LÝ",
                                count: "56",
                                color: "text-orange-400",
                                sub: "+5 hôm nay",
                                icon: "🕒",
                            },
                            {
                                label: "ĐÃ HỖ TRỢ",
                                count: "320",
                                color: "text-green-400",
                                sub: "+25 hôm nay",
                                icon: "🛡️",
                            },
                            {
                                label: "ĐIỂM CỨU TRỢ",
                                count: "24",
                                color: "text-blue-400",
                                sub: "+2 hôm nay",
                                icon: "📍",
                            },
                        ].map((s, i) => (

                            <div key={i} className="text-center py-20 px-12">

                                <p className="text-xs font-bold text-gray-500 tracking-[0.3em] mb-6 flex items-center justify-center gap-2">
                                    <span>{s.icon}</span>
                                    {s.label}
                                </p>

                                <p className={`text-5xl font-black ${s.color}`}>
                                    {s.count}
                                </p>

                                <p className="text-[11px] text-gray-500 mt-6 uppercase font-bold tracking-[0.25em]">
                                    {s.sub}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MAP SECTION */}
            <section className="w-full flex justify-center py-44 bg-[#020817] border-y border-white/5 my-20">

                <div className="w-full max-w-[1400px] px-8 lg:px-16">

                    <div className="grid lg:grid-cols-2 gap-36 items-center">

                        {/* LEFT */}
                        <div className="space-y-14 pr-0 lg:pr-14">

                            <h2 className="text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[1.3] text-white">
                                HỆ THỐNG BẢN ĐỒ
                                <br />

                                <span className="text-blue-500">
                                    TRỰC QUAN
                                </span>
                            </h2>

                            <p className="text-gray-400 text-lg leading-[2]">
                                Theo dõi tình hình cứu trợ theo thời gian thực trên bản đồ tương tác. Dễ dàng lọc theo khu vực, trạng thái, loại hỗ trợ và mức độ khẩn cấp.
                            </p>

                            <ul className="space-y-6 pt-4">
                                {[
                                    "Cập nhật realtime 24/7",
                                    "Định vị chính xác",
                                    "Hiển thị heatmap",
                                    "Tuyến đường cứu trợ",
                                    "Cảnh báo quá tải",
                                ].map((item, i) => (

                                    <li key={i} className="flex items-center gap-5 text-gray-300 font-semibold text-base">

                                        <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-[10px] text-blue-400 flex-shrink-0">
                                            ✔
                                        </div>

                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-10">
                                <button className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-base transition-all group shadow-lg">
                                    Trải nghiệm bản đồ
                                    <span className="group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="relative bg-[#020817] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group h-[620px]">

                            <div className="absolute inset-0 z-0 grayscale-[0.6] brightness-[0.4]">
                                <MiniMap interactive={false} />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent z-10"></div>

                            <div className="relative z-20 h-full p-10 flex flex-col justify-end">

                                <div className="bg-[#071122]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 shadow-2xl w-full max-w-[360px]">

                                    <h4 className="text-xs font-black text-cyan-400 tracking-[0.25em] uppercase mb-6 flex items-center gap-3">
                                        <div className="w-1 h-4 bg-cyan-500 rounded-full"></div>
                                        Yêu cầu gần đây
                                    </h4>

                                    <div className="space-y-5">

                                        {[
                                            {
                                                loc: "Quảng Ngãi",
                                                status: "KHẨN CẤP",
                                                col: "text-red-500",
                                            },
                                            {
                                                loc: "Đà Nẵng",
                                                status: "ĐANG XỬ LÝ",
                                                col: "text-orange-500",
                                            },
                                            {
                                                loc: "Huế",
                                                status: "ĐANG XỬ LÝ",
                                                col: "text-orange-500",
                                            },
                                        ].map((item, i) => (

                                            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">

                                                <span className="text-sm font-bold text-white">
                                                    {item.loc}
                                                </span>

                                                <span className={`text-[10px] font-black ${item.col} px-3 py-2 rounded-lg bg-white/5`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GOALS */}
            <section className="w-full flex justify-center py-40 mb-20">

                <div className="w-full max-w-[1400px] px-8 lg:px-16">

                    <h2 className="text-3xl font-black text-center mb-24 tracking-[0.2em] uppercase text-white/90">
                        Mục tiêu của chúng tôi
                    </h2>

                    <div className="grid md:grid-cols-3 gap-16">

                        {[
                            {
                                title: "Kết nối nhanh chóng",
                                desc: "Kết nối người dân, tình nguyện viên và lực lượng cứu trợ một cách nhanh nhất trong mọi tình huống.",
                                icon: "🚀",
                            },
                            {
                                title: "Điều phối hiệu quả",
                                desc: "Điều phối nguồn lực cứu trợ thông minh, đúng nơi - đúng thời điểm - đúng nhu cầu.",
                                icon: "🎯",
                            },
                            {
                                title: "Minh bạch & chính xác",
                                desc: "Cung cấp dữ liệu thời gian thực, minh bạch, giúp ra quyết định nhanh chóng và chính xác.",
                                icon: "💎",
                            },
                        ].map((goal, i) => (

                            <div
                                key={i}
                                className="bg-[#0f172a]/50 p-16 rounded-[2.8rem] border border-white/5 hover:border-cyan-500/30 transition-all"
                            >

                                <div className="text-4xl mb-10 bg-blue-500/10 w-24 h-24 flex items-center justify-center rounded-[2rem] border border-blue-500/20">
                                    {goal.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-7 leading-relaxed">
                                    {goal.title}
                                </h3>

                                <p className="text-gray-400 leading-[2.1] text-[15px]">
                                    {goal.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section
                id="lien-he"
                className="w-full flex justify-center py-48 bg-[#010409] border-t border-white/5"
            >

                <div className="w-full max-w-[900px] px-8 text-center">

                    <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white uppercase tracking-[0.15em]">
                        Hỗ trợ thông tin
                    </h2>

                    <p className="text-gray-400 mb-16 text-base leading-loose">
                        Bạn có câu hỏi hoặc cần hỗ trợ? Hãy để lại lời nhắn.
                    </p>

                    <div className="space-y-10 text-left">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <input
                                placeholder="Họ và tên..."
                                className="w-full bg-[#071122] border border-white/10 rounded-2xl px-6 py-5 text-base text-white focus:border-cyan-500/50 outline-none"
                            />

                            <input
                                placeholder="Số điện thoại..."
                                className="w-full bg-[#071122] border border-white/10 rounded-2xl px-6 py-5 text-base text-white focus:border-cyan-500/50 outline-none"
                            />
                        </div>

                        <input
                            placeholder="Email liên hệ..."
                            className="w-full bg-[#071122] border border-white/10 rounded-2xl px-6 py-5 text-base text-white focus:border-cyan-500/50 outline-none"
                        />

                        <textarea
                            rows="5"
                            placeholder="Nội dung cần hỗ trợ..."
                            className="w-full bg-[#071122] border border-white/10 rounded-2xl px-6 py-5 text-base text-white focus:border-cyan-500/50 outline-none resize-none"
                        ></textarea>

                        <div className="text-center pt-6">
                            <button className="inline-flex items-center justify-center bg-white text-[#020817] hover:bg-gray-200 px-12 py-5 rounded-2xl text-base font-bold transition-all shadow-lg">
                                Gửi lời nhắn ngay
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="w-full flex justify-center bg-[#020817] border-t border-white/5 py-28 mt-8">

                <div className="w-full max-w-[1400px] px-8 lg:px-16">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-24">

                        <div className="space-y-8">

                            <div className="flex items-center gap-3">
                                <span className="bg-red-600 px-3 py-1 rounded font-black text-xs text-white">
                                    SOS
                                </span>

                                <h2 className="text-lg font-black text-white">
                                    MIỀN TRUNG
                                </h2>
                            </div>

                            <p className="text-gray-500 text-sm leading-[2.1] pr-8">
                                Giải pháp công nghệ kết nối cứu trợ thiên tai vì cộng đồng.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">
                                Khu vực
                            </h4>

                            <ul className="text-gray-500 text-sm space-y-5">
                                <li>Đà Nẵng</li>
                                <li>Huế</li>
                                <li>Quảng Ngãi</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">
                                Liên hệ
                            </h4>

                            <ul className="text-gray-500 text-sm space-y-5">
                                <li>📞 1900 1234</li>
                                <li>✉ contact@sos.vn</li>
                            </ul>
                        </div>

                        <div className="text-left md:text-right flex flex-col justify-end">
                            <p className="text-gray-600 text-xs leading-loose">
                                © 2026 SOS Miền Trung.
                                <br />
                                All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* MODAL */}
            {isFormOpen && <SOSForm />}
        </div>
    );
}